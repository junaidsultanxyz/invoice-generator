import { Component, input } from '@angular/core';
import { ReactiveFormsModule, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-invoice-settings',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './invoice-settings.component.html',
})
export class InvoiceSettingsComponent {
  parentForm = input.required<FormGroup>();
}
