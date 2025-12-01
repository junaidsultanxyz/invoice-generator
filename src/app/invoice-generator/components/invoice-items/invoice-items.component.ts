import { Component, input, inject } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-invoice-items',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './invoice-items.component.html',
})
export class InvoiceItemsComponent {
  parentForm = input.required<FormGroup>();
  private fb = inject(FormBuilder);

  get items() {
    return this.parentForm().get('items') as FormArray;
  }

  get totalCost() {
    const items = this.items.value;
    return items.reduce((acc: number, item: any) => {
      return acc + 1 + (item.subItems ? item.subItems.length : 0);
    }, 0);
  }

  addItem() {
    if (this.totalCost >= 20) return;
    const itemGroup = this.fb.group({
      name: ['New Item', Validators.required],
      quantity: [1, [Validators.required, Validators.min(1)]],
      price: [100, [Validators.required, Validators.min(0)]],
      subItems: this.fb.array([]),
    });
    this.items.push(itemGroup);
  }

  removeItem(index: number) {
    this.items.removeAt(index);
  }

  getSubItems(itemIndex: number) {
    return this.items.at(itemIndex).get('subItems') as FormArray;
  }

  addSubItem(itemIndex: number) {
    if (this.totalCost >= 20) return;
    const subItemGroup = this.fb.group({
      name: ['Sub Item', Validators.required],
      quantity: [1, [Validators.required, Validators.min(1)]],
      price: [50, [Validators.required, Validators.min(0)]],
    });
    this.getSubItems(itemIndex).push(subItemGroup);
  }

  removeSubItem(itemIndex: number, subItemIndex: number) {
    this.getSubItems(itemIndex).removeAt(subItemIndex);
  }
}
