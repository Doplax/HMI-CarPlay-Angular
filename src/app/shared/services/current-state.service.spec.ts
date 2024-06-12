import { TestBed } from '@angular/core/testing';

import { CurrentStateService } from './current-state.service';

describe('CurrentStateService', () => {
  let service: CurrentStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CurrentStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
