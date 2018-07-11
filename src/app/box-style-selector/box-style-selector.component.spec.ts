import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoxStyleSelectorComponent } from './box-style-selector.component';

describe('BoxStyleSelectorComponent', () => {
  let component: BoxStyleSelectorComponent;
  let fixture: ComponentFixture<BoxStyleSelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoxStyleSelectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoxStyleSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
