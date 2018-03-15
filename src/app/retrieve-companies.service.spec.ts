import { inject, TestBed } from '@angular/core/testing';

import { RetrieveCompaniesService } from './retrieve-companies.service';

describe('RetrieveCompaniesService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [RetrieveCompaniesService]
        });
    });

    it('should be created', inject([RetrieveCompaniesService], (service: RetrieveCompaniesService) => {
        expect(service).toBeTruthy();
    }));
});
