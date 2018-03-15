import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';

import { MapPage } from '../pages/map/map';
import { ExportPage } from '../pages/export/export';
import { CompaniesPage } from '../pages/companies/companies';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ExportService } from './export.service';
import { QueryBuilderService } from './query-builder.service';
import { RetrieveCompaniesService } from './retrieve-companies.service';
import { HttpClientModule } from '@angular/common/http';
import { DetailCompanyPage } from '../pages/detail-company/detail-company';
import localeFr from '@angular/common/locales/fr';
import { registerLocaleData } from '@angular/common';
import { MenuPage } from "../pages/menu/menu";
import { ClearFilterService } from "./clear-filter.service";
import { File } from "@ionic-native/file";
import { FileTransfer } from "@ionic-native/file-transfer";
import { FilterPage } from "../pages/filter/filter";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { TagInputModule } from "ngx-chips";

registerLocaleData(localeFr, 'fr');
@NgModule({
    declarations: [
        MyApp,
        MapPage,
        ExportPage,
        CompaniesPage,
        TabsPage,
        DetailCompanyPage,
        MenuPage,
        FilterPage,
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        TagInputModule,
        HttpClientModule,
        IonicModule.forRoot(MyApp),
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        MapPage,
        ExportPage,
        CompaniesPage,
        TabsPage,
        DetailCompanyPage,
        MenuPage,
        FilterPage,
    ],
    providers: [
        StatusBar,
        SplashScreen,
        ExportService,
        QueryBuilderService,
        RetrieveCompaniesService,
        ClearFilterService,
        FileTransfer,
        File,
        FilterPage,
        TagInputModule,
        BrowserAnimationsModule,
        { provide: ErrorHandler, useClass: IonicErrorHandler }
    ]
})
export class AppModule {
}
