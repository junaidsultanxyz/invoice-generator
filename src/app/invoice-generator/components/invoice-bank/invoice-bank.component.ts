import { Component, input } from '@angular/core';
import { ReactiveFormsModule, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-invoice-bank',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './invoice-bank.component.html',
})
export class InvoiceBankComponent {
  parentForm = input.required<FormGroup>();
}
