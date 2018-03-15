import { EventEmitter, Injectable } from '@angular/core';

@Injectable()
export class ClearFilterService {

    onClearFilter = new EventEmitter();

    clearAllFilters() {
        this.onClearFilter.emit();
    }
}
