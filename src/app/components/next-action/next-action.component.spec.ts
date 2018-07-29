import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NextActionComponent } from './next-action.component';

describe('NextActionComponent', () => {
  let component: NextActionComponent;
  let fixture: ComponentFixture<NextActionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NextActionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NextActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
