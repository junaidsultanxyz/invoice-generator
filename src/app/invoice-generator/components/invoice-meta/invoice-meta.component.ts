import { Component, input } from '@angular/core';
import { ReactiveFormsModule, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-invoice-meta',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './invoice-meta.component.html',
})
export class InvoiceMetaComponent {
  parentForm = input.required<FormGroup>();
}
