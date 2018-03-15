import { Component, Input, OnInit } from '@angular/core';
import { RetrieveCompaniesService } from '../../app/retrieve-companies.service';
import { Filters } from '../../app/enum/filters';
import { Filter } from "../../app/model/filter";

@Component({
    selector: 'page-filter',
    templateUrl: 'filter.html',
})
export class FilterPage implements OnInit {
    timeout: number;
    filter: Filter;
    options: Filters[];
    items = [];
    facets: string[] = [];
    // Name of the API field
    @Input() paramName: string;
    // Label to display
    @Input() paramLabel: string;
    // Multiple values allowed for field ?
    @Input() multiple = true;
    // Field value need to be concat with the paramName ?
    @Input() needName = true;
    // Operator for the API : =(:), >, <=
    @Input() operator = ':';
    @Input() type = 'text';
    @Input() optionIndex: string;
    @Input() display: boolean;
    @Input() facetsCount;

    constructor(private retrieveCompaniesService: RetrieveCompaniesService) {
    }

    ngOnInit(): void {
        this.filter = new Filter(this.paramName, this.needName, this.multiple, this.operator);
        this.options = Filters[this.optionIndex];
    }

    // Emit events
    onFilter(): void {
        this.retrieveCompaniesService.onFilterCompanies.emit(this.filter);
        this.retrieveCompaniesService.onFacetCompanies.emit(this.facets);
    }

    // Add filter
    add(value): void {
        clearTimeout(this.timeout);
        this.timeout = setTimeout(() => {
            if (value.value) {
                this.filter.addValue(value.value.trim());
            }
            else if ((undefined !== value.trim() && 0 !== value.trim().length) || ('name' === this.paramName && 0 === value.trim().length)) {
                this.filter.addValue(value.trim());
            }
            if (!this.facets.some(x => x === (this.paramName)) && 'name' !== this.paramName) {
                this.facets.push(this.paramName);
            }
            this.onFilter();
        }, 700);
    }

    // Remove filter
    remove(filter): void {
        this.filter.removeValue(filter.value ? filter.value : filter);
        this.onFilter();
    }
}
