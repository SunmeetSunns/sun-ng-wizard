import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-select-role',
  imports: [CommonModule],
  templateUrl: './select-role.html',
  styleUrl: './select-role.scss',
})
export class SelectRole {
  selectedMethod: any;
  constructor() {}
  @Input() contextId: string | undefined;
  wizardId: any = 'configure-product';

  @Input() wizard!: any;

  methods = [
    {
      title: 'Student',
      desc: 'Continue as a student and complete your registration.',
      img: 'https://cdn-icons-png.flaticon.com/512/1995/1995574.png',
      disabled: false,
    },
    {
      title: 'Professional',
      desc: 'Continue as a professional and configure your profile.',
      img: 'https://cdn-icons-png.flaticon.com/512/4140/4140048.png',
      disabled: false,
    },
    {
      title: 'Staff',
      desc: 'Staff onboarding is currently unavailable.',
      img: 'https://cdn-icons-png.flaticon.com/512/921/921347.png',
      disabled: true,
    },
  ];
  goToPrevStep() {
    this.wizard.prev();
  }
  selectMethod(index: number) {
    if (!this.methods[index].disabled) {
      this.selectedMethod = index;
    }
  }
  processAndGoToNextStep() {
    this.wizard.setData('selectedRole', this.methods[this.selectedMethod]);

    if (this.selectedMethod === 0) {
      this.wizard.goToStep(3);
    }
    if (this.selectedMethod === 1) {
      this.wizard.next();
    }
  }
}
