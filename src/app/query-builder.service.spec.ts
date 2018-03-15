import { TestBed, inject } from '@angular/core/testing';

import { QueryBuilderService } from './query-builder.service';

describe('QueryBuilderService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [QueryBuilderService]
    });
  });

  it('should be created', inject([QueryBuilderService], (service: QueryBuilderService) => {
    expect(service).toBeTruthy();
  }));
});
