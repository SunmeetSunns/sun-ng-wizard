import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DummyComp1 } from './dummy-comp-1';

describe('DummyComp1', () => {
  let component: DummyComp1;
  let fixture: ComponentFixture<DummyComp1>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DummyComp1]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DummyComp1);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
