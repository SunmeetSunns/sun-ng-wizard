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
  ChangeDetectorRef, // 1. Added for OnPush re-render safety
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { WizardInterface } from '../../wizard-interface';
import { FeatherModule } from 'angular-feather';

@Component({
  selector: 'acl-create-wizard',
  standalone: true,
  imports: [CommonModule, FormsModule, FeatherModule],
  templateUrl: './common-wizard.html',
  styleUrl: './common-wizard.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class CommonWizardComponent implements OnChanges, OnInit {
  @Input() wizardId: string = 'connection-wizard';
  @Input() wizardTitle: string = 'Create New Configuration';
  @Input() dynamicSteps: WizardInterface[] = [];

  @Output() onStepChange = new EventEmitter<{
    currentStep: number;
    action: 'next' | 'prev' | 'skip';
  }>();
  @Output() onComplete = new EventEmitter<void>();
  @Output() closeWizardEmitter = new EventEmitter<string>();

  activeStepNumber = 1;
  stepsInternalConfig: any[] = [];
  isFullScreen = false;

  // 2. Inject ChangeDetectorRef for explicit Push cycles
  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.initWizardEngine();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['dynamicSteps'] && !changes['dynamicSteps'].isFirstChange()) {
      this.initWizardEngine();
    }
  }

  private initWizardEngine(): void {
    if (!this.dynamicSteps.length) return;
    this.activeStepNumber = 1;
    this.stepsInternalConfig = this.dynamicSteps.map((s, i) => ({
      title: s.title,
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

  closeWizard(from: string = '') {
    this.closeWizardEmitter.emit(from);
  }

  getComponentInputs(): { [key: string]: any } {
    const config = this.currentStepConfig;
    if (!config) return {};

    return {
      contextId: this.wizardId,
      isSkippable: config.isSkippable ?? false,
      onStepComplete: () => this.moveToNextStep(),
      onStepSkip: () => this.skipCurrentStep(),
      ...(config.data || {}),
    };
  }

  moveToNextStep(): void {
    if (this.activeStepNumber < this.dynamicSteps.length) {
      // Reference modification fix for OnPush view synchronization
      const clone = [...this.stepsInternalConfig];
      clone[this.activeStepNumber - 1] = { ...clone[this.activeStepNumber - 1], state: 'done' };
      this.activeStepNumber++;
      clone[this.activeStepNumber - 1] = { ...clone[this.activeStepNumber - 1], state: 'active' };

      this.stepsInternalConfig = clone;
      this.onStepChange.emit({ currentStep: this.activeStepNumber, action: 'next' });
      this.cdr.markForCheck();
    } else {
      this.onComplete.emit();
    }
  }

  skipCurrentStep(): void {
    if (this.activeStepNumber < this.dynamicSteps.length) {
      const clone = [...this.stepsInternalConfig];
      clone[this.activeStepNumber - 1] = { ...clone[this.activeStepNumber - 1], state: 'skipped' };
      this.activeStepNumber++;
      clone[this.activeStepNumber - 1] = { ...clone[this.activeStepNumber - 1], state: 'active' };

      this.stepsInternalConfig = clone;
      this.onStepChange.emit({ currentStep: this.activeStepNumber, action: 'skip' });
      this.cdr.markForCheck();
    }
  }

  moveToPreviousStep(): void {
    if (this.activeStepNumber > 1) {
      const clone = [...this.stepsInternalConfig];
      clone[this.activeStepNumber - 1] = { ...clone[this.activeStepNumber - 1], state: 'normal' };
      this.activeStepNumber--;
      clone[this.activeStepNumber - 1] = { ...clone[this.activeStepNumber - 1], state: 'active' };

      this.stepsInternalConfig = clone;
      this.onStepChange.emit({ currentStep: this.activeStepNumber, action: 'prev' });
      this.cdr.markForCheck();
    }
  }

  toggleFullScreen() {
    this.isFullScreen = !this.isFullScreen;
    const modals = document.querySelectorAll('.modal.show');
    const currentModal = modals[modals.length - 1] as HTMLElement;

    if (currentModal) {
      if (this.isFullScreen) {
        currentModal.classList.add('fullscreen-modal');
        document.body.style.overflow = 'hidden';
      } else {
        currentModal.classList.remove('fullscreen-modal');
        document.body.style.overflow = 'auto';
      }
    }
    this.cdr.markForCheck();
  }
}
