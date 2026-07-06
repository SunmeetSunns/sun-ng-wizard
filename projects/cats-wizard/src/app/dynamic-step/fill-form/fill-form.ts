import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FeatherModule } from 'angular-feather';
import { DynamicStepService } from '../dynamic-step-service';

@Component({
  selector: 'app-fill-form',
  imports: [CommonModule, ReactiveFormsModule, FeatherModule],
  templateUrl: './fill-form.html',
  styleUrl: './fill-form.scss',
})
export class FillForm {
  form!: FormGroup;
  @Input() wizard!: any;
  @Input() contextId: string | undefined;
  constructor(
    private fb: FormBuilder,
    private dynamicService: DynamicStepService,
  ) {}
  ngOnInit() {
    this.buildForm();
  }
  processAndGoToNextStep() {
    this.wizard.setData('formData', this.form.value);
    const data = this.wizard.getAllData();
    this.dynamicService.storeProfileData(data);
    console.log(this.dynamicService.storedData());
  }
  buildForm() {
    this.form = this.fb.group({
      name: ['', Validators.required],
      mobileNo: ['', [Validators.required, Validators.min(0), Validators.max(9999999999)]],
      email: ['', [Validators.required, Validators.email]],
      description: [''],
    });
  }
  closeConnectionWizard() {
    const data = this.wizard.getAllData();
    if (data?.selectedRole.i === 0) {
      this.wizard.goToStep(1);
    } else this.wizard.prev();
  }
}
