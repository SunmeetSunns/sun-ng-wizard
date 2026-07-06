import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-select-department',
  imports: [CommonModule],
  templateUrl: './select-department.html',
  styleUrl: './select-department.scss',
})
export class SelectDepartment {
  selectedMethod: any;
  constructor() {}
  @Input() contextId: string | undefined;
  wizardId: any = 'configure-product';

  @Input() wizard!: any;

  methods = [
    {
      title: 'Computer Science',
      desc: 'Software development, programming and system design.',
      img: 'https://cdn-icons-png.flaticon.com/512/2103/2103633.png',
      disabled: false,
    },
    {
      title: 'Business Management',
      desc: 'Leadership, operations and business strategy.',
      img: 'https://cdn-icons-png.flaticon.com/512/3135/3135768.png',
      disabled: false,
    },
    {
      title: 'Design & Creative',
      desc: 'UI/UX design, branding and creative solutions.',
      img: 'https://cdn-icons-png.flaticon.com/512/2920/2920277.png',
      disabled: false,
    },
    {
      title: 'Human Resources',
      desc: 'People management, recruitment and employee engagement.',
      img: 'https://cdn-icons-png.flaticon.com/512/1077/1077114.png',
      disabled: false,
    },
    {
      title: 'Finance',
      desc: 'Accounting, budgeting and financial planning.',
      img: 'https://cdn-icons-png.flaticon.com/512/2331/2331941.png',
      disabled: false,
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
    this.wizard.setData('selectedDept', this.methods[this.selectedMethod]);

    this.wizard.next();
  }
}
