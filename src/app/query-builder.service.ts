import { Injectable } from '@angular/core';
import { Filter } from './model/filter';

@Injectable()
export class QueryBuilderService {

    buildQuery(filters: Filter[]): string {
        return filters
            .map((filter: Filter) => {
                return filter.values.length > 0
                    ? '(' + filter.getFormattedValues().join(' OR ') + ')'
                    : undefined
                ;
            })
            .filter(elem => typeof elem !== 'undefined')
            .join(' AND ')
        ;
    }

}
