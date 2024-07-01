import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CallTopBarComponent } from './call-top-bar.component';

describe('CallTopBarComponent', () => {
  let component: CallTopBarComponent;
  let fixture: ComponentFixture<CallTopBarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CallTopBarComponent]
    });
    fixture = TestBed.createComponent(CallTopBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
