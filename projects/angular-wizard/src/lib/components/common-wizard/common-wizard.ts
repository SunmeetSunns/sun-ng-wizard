import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  Type,
  ViewEncapsulation,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FeatherModule } from 'angular-feather';
import { WizardInterface } from '../../wizard-interface';

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
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NgxStepperWizardComponent implements OnInit, OnChanges, AfterViewInit {
  @Input() wizardId = 'ngx-stepper-wizard';
  @Input() wizardTitle = 'Create New Configuration';
  @Input() dynamicSteps: WizardInterface[] = [];

  /** Modal Size */
  @Input() width: string | number = '90%';
  @Input() maxWidth: string | number = '900px';
  @Input() height: string | number = 'calc(100vh - 96px)';

  /** Minimum supported size */
  private readonly MIN_WIDTH = 500;
  private readonly MIN_HEIGHT = 350;

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

  ngAfterViewInit(): void {
    setTimeout(() => this.applyModalSize());
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['dynamicSteps'] && !changes['dynamicSteps'].firstChange) {
      this.initWizard();
    }

    if (changes['width'] || changes['maxWidth'] || changes['height']) {
      setTimeout(() => this.applyModalSize());
    }
  }

  /**
   * Converts input into css value
   */
  private cssValue(value: string | number): string {
    return typeof value === 'number' ? `${value}px` : value;
  }

  /**
   * Enforce minimum width
   */
  private getWidth(): string {
    if (typeof this.width === 'number') {
      return `${Math.max(this.width, this.MIN_WIDTH)}px`;
    }

    return this.width;
  }

  /**
   * Enforce minimum height
   */
  private getHeight(): string {
    if (typeof this.height === 'number') {
      return `${Math.max(this.height, this.MIN_HEIGHT)}px`;
    }

    return this.height;
  }

  /**
   * Apply modal dimensions
   */
  private applyModalSize(): void {
    const modal = document.querySelector('.modal.show .modal-dialog') as HTMLElement;

    if (!modal) return;

    modal.classList.add('ngx-stepper-modal');

    if (this.isFullScreen) {
      modal.style.width = '100vw';
      modal.style.maxWidth = '100vw';
      modal.style.height = '100vh';
      modal.style.minWidth = '100vw';
      modal.style.minHeight = '100vh';
      return;
    }

    modal.style.width = this.getWidth();
    modal.style.maxWidth = this.cssValue(this.maxWidth);
    modal.style.height = this.getHeight();

    modal.style.minWidth = `${this.MIN_WIDTH}px`;
    modal.style.minHeight = `${this.MIN_HEIGHT}px`;
  }

  private initWizard(): void {
    if (!this.dynamicSteps?.length) return;

    this.activeStepNumber = 1;

    this.stepsInternalConfig = this.dynamicSteps.map((step, i) => ({
      title: step.title,
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

  closeWizard(source = ''): void {
    this.closeWizardEmitter.emit(source);
  }

  // ---------------- Wizard Controller ----------------

  private getWizardController() {
    return {
      next: () => this.moveToNextStep(),
      prev: () => this.moveToPreviousStep(),
      skip: () => this.skipStep(),
      goToStep: (step: number) => this.goToStep(step),

      finish: () => this.onComplete.emit(),

      reset: () => this.resetWizard(),

      setData: (key: string, value: any) => (this.wizardData[key] = value),

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
    if (step < 1 || step > this.dynamicSteps.length || step === this.activeStepNumber) {
      return;
    }

    this.stepsInternalConfig = this.stepsInternalConfig.map((item, i) => ({
      ...item,
      state: i === step - 1 ? 'active' : i < step - 1 ? 'done' : 'normal',
    }));

    this.activeStepNumber = step;

    this.emitStepChange('goto');
  }

  resetWizard(): void {
    this.wizardData = {};
    this.initWizard();
  }

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

  toggleFullScreen(): void {
    this.isFullScreen = !this.isFullScreen;

    const modal = document.querySelector('.modal.show');

    modal?.classList.toggle('fullscreen-modal', this.isFullScreen);

    document.body.style.overflow = this.isFullScreen ? 'hidden' : '';

    this.applyModalSize(); // <-- add this

    this.cdr.markForCheck();
  }
}
