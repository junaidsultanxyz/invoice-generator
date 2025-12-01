import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormsModule,
  FormBuilder,
  FormGroup,
  FormArray,
  Validators,
} from '@angular/forms';

import { InvoiceMetaComponent } from './components/invoice-meta/invoice-meta.component';
import { InvoicePeopleComponent } from './components/invoice-people/invoice-people.component';
import { InvoiceBankComponent } from './components/invoice-bank/invoice-bank.component';
import { InvoiceItemsComponent } from './components/invoice-items/invoice-items.component';
import { InvoiceTaxComponent } from './components/invoice-tax/invoice-tax.component';
import { InvoicePreviewComponent } from './components/invoice-preview/invoice-preview.component';
import { InvoiceSettingsComponent } from './components/invoice-settings/invoice-settings.component';

@Component({
  selector: 'app-invoice-generator',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    InvoiceMetaComponent,
    InvoicePeopleComponent,
    InvoiceBankComponent,
    InvoiceItemsComponent,
    InvoiceTaxComponent,
    InvoicePreviewComponent,
    InvoiceSettingsComponent,
  ],
  templateUrl: './invoice-generator.html',
  styleUrl: './invoice-generator.css',
})
export class InvoiceGeneratorComponent {
  private fb = inject(FormBuilder);
  invoiceForm: FormGroup;
  isGenerating = signal(false);
  logoUrl = signal<string | null>(null);
  signatureUrl = signal<string | null>(null);

  onFileSelected(event: Event, type: 'logo' | 'signature') {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        if (type === 'logo') {
          this.logoUrl.set(result);
        } else {
          this.signatureUrl.set(result);
        }
      };
      reader.readAsDataURL(file);
    }
  }

  constructor() {
    this.invoiceForm = this.fb.group({
      senderName: ['Sender Name', Validators.required],
      senderMobile: ['+92 123 456789', Validators.required],
      senderAddress: ['123 Address Here', Validators.required],
      receiverName: ['Receiver Name', Validators.required],
      receiverMobile: ['+92 123 456789', Validators.required],
      receiverAddress: ['456 Address Here', Validators.required],
      invoiceDate: [new Date().toISOString().split('T')[0], Validators.required],
      dueDate: [new Date().toISOString().split('T')[0], Validators.required],
      invoiceNumber: ['INV-001', Validators.required],
      invoiceTitle: ['INVOICE', Validators.required],
      bankName: ['Bank Name'],
      bankInfo: ['Account Name: Person Name\nAccount No.: 123456789'],
      items: this.fb.array([]),
      taxRate: [0, [Validators.min(0), Validators.max(100)]],
      themeColor: ['#2563eb'],
    });

    // Add initial item
    this.addItem();
  }

  get items() {
    return this.invoiceForm.get('items') as FormArray;
  }

  // Helper to add initial item (internal use only now, or could be public if needed)
  private addItem() {
    const itemGroup = this.fb.group({
      name: ['New Item', Validators.required],
      quantity: [1, [Validators.required, Validators.min(1)]],
      price: [100, [Validators.required, Validators.min(0)]],
      subItems: this.fb.array([]),
    });
    this.items.push(itemGroup);
  }

  get subTotal(): number {
    let total = 0;
    this.items.controls.forEach((control) => {
      const val = control.value;
      total += val.quantity * val.price;
      if (val.subItems) {
        val.subItems.forEach((sub: any) => {
          total += sub.quantity * sub.price;
        });
      }
    });
    return total;
  }

  get taxAmount(): number {
    return (this.subTotal * (this.invoiceForm.get('taxRate')?.value || 0)) / 100;
  }

  get totalAmount(): number {
    return this.subTotal + this.taxAmount;
  }

  get pages() {
    const items = this.invoiceForm.get('items')?.value || [];
    const pages: any[] = [];

    const PAGE_1_LIMIT = 8;
    const PAGE_1_TRIGGER = 7;
    const OTHER_PAGE_LIMIT = 20 - PAGE_1_LIMIT;

    let currentPageItems: any[] = [];
    let currentCost = 0;
    let pageIndex = 0;

    items.forEach((item: any) => {
      // Count item itself (1) + number of sub-items
      const itemCost = 1 + (item.subItems ? item.subItems.length : 0);
      const limit = pageIndex === 0 ? PAGE_1_LIMIT : OTHER_PAGE_LIMIT;

      if (currentCost + itemCost > limit) {
        pages.push({
          items: currentPageItems,
          index: pageIndex,
          isLast: false,
          cost: currentCost,
        });
        currentPageItems = [];
        currentCost = 0;
        pageIndex++;
      }

      currentPageItems.push(item);
      currentCost += itemCost;
    });

    // Push the final page (containing whatever is left)
    pages.push({
      items: currentPageItems,
      index: pageIndex,
      isLast: true,
      cost: currentCost,
    });

    // Special rule: If we are still on Page 1 (length 1) but the cost exceeds the trigger (6),
    // we force a second page to appear (which will hold the footer).
    // Items will continue to fill Page 1 up to the LIMIT (10) before spilling over,
    // but the footer moves to Page 2 as soon as we hit 6.
    if (pages.length === 1 && pages[0].cost > PAGE_1_TRIGGER) {
      pages[0].isLast = false;
      pages.push({
        items: [],
        index: 1,
        isLast: true,
        cost: 0,
      });
    }

    return pages;
  }

  async downloadPDF() {
    this.isGenerating.set(true);

    // Dynamic imports for optimization
    const [jsPDFModule, html2canvasModule] = await Promise.all([
      import('jspdf'),
      import('html2canvas'),
    ]);

    const jsPDF = jsPDFModule.jsPDF;
    const html2canvas = html2canvasModule.default;

    setTimeout(async () => {
      try {
        const pageElements = document.querySelectorAll('.invoice-page');
        if (pageElements.length > 0) {
          const pdf = new jsPDF({
            orientation: 'p',
            unit: 'mm',
            format: 'a4',
            compress: true, // Enable internal PDF compression
          });
          const pdfWidth = 210;
          const pdfHeight = 297;

          for (let i = 0; i < pageElements.length; i++) {
            if (i > 0) pdf.addPage();

            // Use html2canvas for perfect visual fidelity (fonts, styles)
            const canvas = await html2canvas(pageElements[i] as HTMLElement, {
              scale: 2.5, // 2.5 is a sweet spot: sharp text, much smaller file than 4x
              useCORS: true,
              logging: false,
              backgroundColor: '#ffffff', // Ensure white background
            });

            const imgWidth = pdfWidth;
            const imgHeight = (canvas.height * imgWidth) / canvas.width;

            // Use JPEG with 0.75 quality
            pdf.addImage(canvas.toDataURL('image/jpeg', 0.75), 'JPEG', 0, 0, imgWidth, imgHeight);
          }

          pdf.save(`invoice-${this.invoiceForm.get('invoiceNumber')?.value}.pdf`);
        }
      } catch (error) {
        console.error('Error generating PDF:', error);
        alert('Failed to generate PDF. Please check the console for details.');
      } finally {
        this.isGenerating.set(false);
      }
    }, 100);
  }
}
