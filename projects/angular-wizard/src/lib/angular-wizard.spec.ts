import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AngularWizard } from './angular-wizard';

describe('AngularWizard', () => {
  let component: AngularWizard;
  let fixture: ComponentFixture<AngularWizard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AngularWizard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AngularWizard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
