import { EnvironmentProviders, importProvidersFrom } from '@angular/core';
import { FeatherModule } from 'angular-feather';
import { allIcons } from 'angular-feather/icons';

export function provideWizardIcons(): EnvironmentProviders {
  return importProvidersFrom(FeatherModule.pick(allIcons));
}
