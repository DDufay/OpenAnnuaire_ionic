import { Component } from '@angular/core';
import { RetrieveCompaniesService } from "../../app/retrieve-companies.service";
import { ClearFilterService } from "../../app/clear-filter.service";

@Component({
    selector: 'page-menu',
    templateUrl: 'menu.html',
})
export class MenuPage {
    nhits = 0;
    facetsGroups = [];
    facetCount = [];
    constructor(private retrieveCompaniesService: RetrieveCompaniesService, private clearFilterService: ClearFilterService) {
        this.retrieveCompaniesService.onGetHits.subscribe((nhits: number) => this.nhits = nhits);
        this.retrieveCompaniesService.onGetFacets.subscribe((facets= []) => {
            this.facetsGroups = facets;
            if (0 !== this.facetsGroups.length) {
                this.facetsGroups.forEach(facetGroup => {
                    this.facetCount[facetGroup.name] = [];
                    facetGroup.facets.forEach(facet => {
                        if (undefined === this.facetCount[facetGroup.name][facet.name]) {
                            this.facetCount[facetGroup.name][facet.name] = facet.count;
                        }
                    });
                });
            }
        });

    }

    clearAll() {
        this.clearFilterService.clearAllFilters();
        this.retrieveCompaniesService.getCompanies(true);
    }

    displayFacetOnFilter(filter, value) {
        if (this.facetCount[filter]) {
            return this.facetCount[filter][value] ? this.facetCount[filter][value] : 0;
        }
        return 0;
    }
}

