import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  Type,
  SimpleChanges,
  ViewEncapsulation,
  ChangeDetectorRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { WizardInterface } from '../../wizard-interface';
import { FeatherModule } from 'angular-feather';

export interface WizardState {
  title: string;
  state: 'active' | 'done' | 'normal' | 'skipped';
}

@Component({
  selector: 'ngx-stepper-wizard',
  standalone: true,
  imports: [CommonModule, FormsModule, FeatherModule],
  templateUrl: './common-wizard.html',
  styleUrl: './common-wizard.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class NgxStepperWizardComponent implements OnInit, OnChanges {
  @Input() wizardId: string = 'ngx-stepper-wizard';
  @Input() wizardTitle: string = 'Create New Configuration';
  @Input() dynamicSteps: WizardInterface[] = [];

  @Output() onStepChange = new EventEmitter<{
    currentStep: number;
    action: 'next' | 'prev' | 'skip' | 'goto';
  }>();

  @Output() onComplete = new EventEmitter<void>();
  @Output() closeWizardEmitter = new EventEmitter<string>();

  activeStepNumber = 1;
  stepsInternalConfig: WizardState[] = [];
  isFullScreen = false;

  private wizardData: Record<string, any> = {};

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.initWizard();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['dynamicSteps'] && !changes['dynamicSteps'].isFirstChange()) {
      this.initWizard();
    }
  }

  private initWizard(): void {
    if (!this.dynamicSteps?.length) return;

    this.activeStepNumber = 1;

    this.stepsInternalConfig = this.dynamicSteps.map((_, i) => ({
      title: this.dynamicSteps[i].title,
      state: i === 0 ? 'active' : 'normal',
    }));

    this.cdr.markForCheck();
  }

  get currentStepComponent(): Type<any> | undefined {
    return this.dynamicSteps[this.activeStepNumber - 1]?.component;
  }

  get currentStepConfig(): WizardInterface | undefined {
    return this.dynamicSteps[this.activeStepNumber - 1];
  }

  closeWizard(source: string = ''): void {
    this.closeWizardEmitter.emit(source);
  }

  // ===============================
  // Wizard Controller
  // ===============================
  private getWizardController() {
    return {
      next: () => this.moveToNextStep(),
      prev: () => this.moveToPreviousStep(),
      skip: () => this.skipStep(),
      goToStep: (step: number) => this.goToStep(step),

      finish: () => this.onComplete.emit(),

      reset: () => this.resetWizard(),

      setData: (key: string, value: any) => {
        this.wizardData[key] = value;
      },

      getData: (key: string) => this.wizardData[key],

      getAllData: () => ({ ...this.wizardData }),

      currentStep: () => this.activeStepNumber,

      totalSteps: () => this.dynamicSteps.length,
    };
  }

  getComponentInputs(): Record<string, any> {
    return {
      contextId: this.wizardId,
      wizard: this.getWizardController(),
      ...(this.currentStepConfig?.data || {}),
    };
  }

  // ===============================
  // Navigation
  // ===============================

  moveToNextStep(): void {
    if (this.activeStepNumber >= this.dynamicSteps.length) {
      this.onComplete.emit();
      return;
    }

    this.updateStepState(this.activeStepNumber, 'done');
    this.activeStepNumber++;
    this.updateStepState(this.activeStepNumber, 'active');

    this.emitStepChange('next');
  }

  moveToPreviousStep(): void {
    if (this.activeStepNumber <= 1) return;

    this.updateStepState(this.activeStepNumber, 'normal');
    this.activeStepNumber--;
    this.updateStepState(this.activeStepNumber, 'active');

    this.emitStepChange('prev');
  }

  skipStep(): void {
    if (this.activeStepNumber >= this.dynamicSteps.length) return;

    this.updateStepState(this.activeStepNumber, 'skipped');
    this.activeStepNumber++;
    this.updateStepState(this.activeStepNumber, 'active');

    this.emitStepChange('skip');
  }

  goToStep(step: number): void {
    if (step < 1 || step > this.dynamicSteps.length || step === this.activeStepNumber) return;

    this.stepsInternalConfig = this.stepsInternalConfig.map((item, i) => ({
      ...item,
      state: i === step - 1 ? 'active' : i < step - 1 ? 'done' : 'normal',
    }));

    this.activeStepNumber = step;

    this.onStepChange.emit({
      currentStep: this.activeStepNumber,
      action: 'goto',
    });

    this.cdr.markForCheck();
  }

  resetWizard(): void {
    this.wizardData = {};
    this.initWizard();
  }

  // ===============================
  // Helpers
  // ===============================

  private updateStepState(stepIndex: number, state: WizardState['state']): void {
    const clone = [...this.stepsInternalConfig];

    clone[stepIndex - 1] = {
      ...clone[stepIndex - 1],
      state,
    };

    this.stepsInternalConfig = clone;
    this.cdr.markForCheck();
  }

  private emitStepChange(action: 'next' | 'prev' | 'skip' | 'goto'): void {
    this.onStepChange.emit({
      currentStep: this.activeStepNumber,
      action,
    });

    this.cdr.markForCheck();
  }

  // ===============================
  // UI
  // ===============================

  toggleFullScreen(): void {
    this.isFullScreen = !this.isFullScreen;

    const modals = document.querySelectorAll('.modal.show');
    const currentModal = modals[modals.length - 1] as HTMLElement;

    if (currentModal) {
      currentModal.classList.toggle('fullscreen-modal', this.isFullScreen);
      document.body.style.overflow = this.isFullScreen ? 'hidden' : 'auto';
    }

    this.cdr.markForCheck();
  }
}
