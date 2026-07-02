import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FeatherModule } from 'angular-feather';

@Component({
  selector: 'app-fill-form',
  imports: [CommonModule, ReactiveFormsModule, FeatherModule],
  templateUrl: './fill-form.html',
  styleUrl: './fill-form.scss',
})
export class FillForm {
  form!: FormGroup;
  wizard: any;
  constructor(private fb: FormBuilder) {}
  processAndGoToNextStep() {
    this.wizard.finish();
  }
  buildForm() {
    this.fb.group({
      name: ['', Validators.required],
      mobileNo: [, [Validators.required, Validators.min(0), Validators.max(9999999999)]],
      email: ['', [Validators.required, Validators.email]],
      description: [''],
    });
  }
}
