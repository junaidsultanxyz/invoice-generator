import { Component, input } from '@angular/core';
import { ReactiveFormsModule, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-invoice-tax',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './invoice-tax.component.html',
})
export class InvoiceTaxComponent {
  parentForm = input.required<FormGroup>();
}
