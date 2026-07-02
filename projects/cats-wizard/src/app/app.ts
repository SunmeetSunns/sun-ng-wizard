import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CommonWizardComponent, WizardInterface } from 'angular-wizard';
import { SelectRole } from './dynamic-step/select-role/select-role';
import { DummyComp1 } from './components/dummy-comp-1/dummy-comp-1';
import { NgbModal, NgbSlide } from '@ng-bootstrap/ng-bootstrap';
import { SelectDepartment } from './dynamic-step/select-department/select-department';
import { FillForm } from './dynamic-step/fill-form/fill-form';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, CommonWizardComponent, SelectDepartment],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class AppComponent {
  isEditMode = false;
  showWizard = false;

  constructor(private modalService: NgbModal) {}
  productSteps: WizardInterface[] = [
    {
      title: 'Create Support Ticket',
      component: DummyComp1,
      isSkippable: false,
    },
  ];
  dynamicSteps: WizardInterface[] = [
    {
      title: 'Select Category',
      component: SelectRole,
      isSkippable: false,
    },
    {
      title: 'Select Category',
      component: SelectDepartment,
      isSkippable: true,
    },
    {
      title: 'Fill Registration Form',
      component: FillForm,
      isSkippable: false,
    },
  ];
  openWizard(modal: any) {
    this.modalService.open(modal, {
      modalDialogClass: 'largeModel',
      backdrop: 'static',
    });
  }

  closeConnectionWizard() {
    this.modalService.dismissAll();
  }
}
