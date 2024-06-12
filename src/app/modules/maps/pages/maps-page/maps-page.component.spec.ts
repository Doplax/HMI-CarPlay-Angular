import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapsPageComponent } from './maps-page.component';

describe('MapsPageComponent', () => {
  let component: MapsPageComponent;
  let fixture: ComponentFixture<MapsPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MapsPageComponent]
    });
    fixture = TestBed.createComponent(MapsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
