import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
// 🏆 1. Fixed Type name to WizardInterface
import { CommonWizardComponent, WizardInterface } from 'angular-wizard';
import { DummyComp1 } from './components/dummy-comp-1/dummy-comp-1';
import { DummyComp2 } from './components/dummy-comp-2/dummy-comp-2';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, CommonWizardComponent],
  templateUrl: './app.html',
})
export class AppComponent {
  isEditMode = false;
  showWizard = false;

  // Wizard steps configuration array
  productSteps: WizardInterface[] = [
    {
      title: 'Enter Basic Details',
      component: DummyComp1,
      isSkippable: false,
      data: { isEditMode: this.isEditMode },
    },
    {
      title: 'Define Protocol(s)',
      component: DummyComp2,
      isSkippable: true,
    },
  ];

  openWizard() {
    this.showWizard = true;
  }

  closeConnectionWizard(event: any) {
    this.showWizard = false;
    console.log('Wizard dismissed via action:', event);
  }

  handleWizardFinalSubmit() {
    this.showWizard = false;
    alert('Congratulations! Product Wizard Completed Successfully! 🚀');
  }
}
