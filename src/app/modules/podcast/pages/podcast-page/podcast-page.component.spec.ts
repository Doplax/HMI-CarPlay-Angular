import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PodcastPageComponent } from './podcast-page.component';

describe('PodcastPageComponent', () => {
  let component: PodcastPageComponent;
  let fixture: ComponentFixture<PodcastPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PodcastPageComponent],
    });
    fixture = TestBed.createComponent(PodcastPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
