import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FillForm } from './fill-form';

describe('FillForm', () => {
  let component: FillForm;
  let fixture: ComponentFixture<FillForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FillForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FillForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
