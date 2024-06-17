import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlockScreenComponent } from './block-screen.component';

describe('BlockScreenComponent', () => {
  let component: BlockScreenComponent;
  let fixture: ComponentFixture<BlockScreenComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BlockScreenComponent]
    });
    fixture = TestBed.createComponent(BlockScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
