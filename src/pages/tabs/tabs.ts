import { Component } from '@angular/core';

import { MapPage } from '../map/map';
import { ExportPage } from '../export/export';
import { CompaniesPage } from '../companies/companies';

@Component({
    templateUrl: 'tabs.html'
})
export class TabsPage {

    companiesRoot = CompaniesPage;
    mapRoot = MapPage;
    exportRoot = ExportPage;

    constructor() {

    }
}
