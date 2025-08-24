import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecentsCardComponent } from './recents-card.component';

describe('RecentsCardComponent', () => {
  let component: RecentsCardComponent;
  let fixture: ComponentFixture<RecentsCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecentsCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecentsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
