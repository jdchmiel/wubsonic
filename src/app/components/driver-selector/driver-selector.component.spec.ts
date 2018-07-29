import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DriverSelectorComponent } from './driver-selector.component';

describe('DriverSelectorComponent', () => {
  let component: DriverSelectorComponent;
  let fixture: ComponentFixture<DriverSelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DriverSelectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DriverSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
