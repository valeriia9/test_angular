import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DayFilterComponent } from './day-filter.component';

describe('DayFilterComponent', () => {
  let component: DayFilterComponent;
  let fixture: ComponentFixture<DayFilterComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DayFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DayFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
