import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CallKeypadComponent } from './call-keypad.component';

describe('CallKeypadComponent', () => {
  let component: CallKeypadComponent;
  let fixture: ComponentFixture<CallKeypadComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CallKeypadComponent]
    });
    fixture = TestBed.createComponent(CallKeypadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
