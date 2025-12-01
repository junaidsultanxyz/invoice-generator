import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-invoice-preview',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './invoice-preview.component.html',
})
export class InvoicePreviewComponent {
  invoiceForm = input.required<FormGroup>();
  pages = input.required<any[]>();
  subTotal = input.required<number>();
  taxAmount = input.required<number>();
  totalAmount = input.required<number>();
}
