import { Type } from '@angular/core';

export interface WizardInterface {
  title: string;
  component: Type<any>;
  state?: 'normal' | 'active' | 'done' | 'skipped';
  isSkippable?: boolean;
  data?: { [key: string]: any };
}
