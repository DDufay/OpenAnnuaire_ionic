import { TestBed, inject } from '@angular/core/testing';

import { ClearFilterService } from './clear-filter.service';

describe('ClearFilterService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ClearFilterService]
    });
  });

  it('should be created', inject([ClearFilterService], (service: ClearFilterService) => {
    expect(service).toBeTruthy();
  }));
});
