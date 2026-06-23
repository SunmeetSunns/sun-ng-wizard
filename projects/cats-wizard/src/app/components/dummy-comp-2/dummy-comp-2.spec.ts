import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DummyComp2 } from './dummy-comp-2';

describe('DummyComp2', () => {
  let component: DummyComp2;
  let fixture: ComponentFixture<DummyComp2>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DummyComp2]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DummyComp2);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
