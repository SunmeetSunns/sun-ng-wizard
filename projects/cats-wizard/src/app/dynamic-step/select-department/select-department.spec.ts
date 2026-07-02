import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectDepartment } from './select-department';

describe('SelectDepartment', () => {
  let component: SelectDepartment;
  let fixture: ComponentFixture<SelectDepartment>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectDepartment]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectDepartment);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
