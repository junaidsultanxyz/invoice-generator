import { Component, input } from '@angular/core';
import { ReactiveFormsModule, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-invoice-people',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './invoice-people.component.html',
})
export class InvoicePeopleComponent {
  parentForm = input.required<FormGroup>();
}
