import { TestBed } from '@angular/core/testing';

import { DynamicStepService } from './dynamic-step-service';

describe('DynamicStepService', () => {
  let service: DynamicStepService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DynamicStepService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
