import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FirmApiInterface } from './model/firmapi-interface';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/map';
import { CompanyInterface } from './model/company-interface';
import { Company } from './model/company';
import { QueryBuilderService } from './query-builder.service';
import { Filter } from './model/filter';
import { Loading, LoadingController, AlertController } from 'ionic-angular';
import { Network } from "@ionic-native/network";

@Injectable()
export class RetrieveCompaniesService {
    static DATASET = 'sirene';
    static LANG = 'fr';
    static MAX_ROWS = 10000;
    static NORMAL_ROWS = 100;
    rows = RetrieveCompaniesService.NORMAL_ROWS;
    private _url = 'https://public.opendatasoft.com/api/records/1.0/search/';
    start = 0;
    companies: Company[] = [];
    facetsParams: string[] = [];
    facets: {};
    nhits = 0;
    isConnected: boolean = navigator.onLine;

    // Object for all params of the search
    filters: Filter[] = [];
    // Event emit when companies are retrive from API
    onGetCompanies = new EventEmitter();
    onGetHits = new EventEmitter();
    onGetFacets = new EventEmitter();
    // Event emit when a filter is add
    onFilterCompanies = new EventEmitter();
    onFacetCompanies = new EventEmitter();
    onQuery = new EventEmitter();
    loading: Loading;

    constructor(private http: HttpClient,
                private queryBuilder: QueryBuilderService,
                public loadingCtrl: LoadingController,
                private network: Network,
                private alertCtrl: AlertController
    ) {
        // Subscribe new filter added
        this.onFilterCompanies.subscribe((filter: Filter) => {
            if (!this.filters.some(x => x === filter)) {
                this.filters.push(filter);
            }
        });

        this.onFacetCompanies.subscribe((facet: string) => {
            if (!this.facetsParams.some(x => x === facet)) {
                this.facetsParams.push(facet);
            }
            this.getCompanies(true);
        });
    }

    dispatch() {
        this.onGetHits.emit(this.nhits);
        this.onGetCompanies.emit(this.companies as Company[]);
        this.onGetFacets.emit(this.facets);
        this.loading.dismissAll();
    }

    retrieveCompanies() {
        this.checkConnexion();
        if (this.isConnected) {
            this.createLoader();
            this.onQuery.emit(this.queryBuilder.buildQuery(this.filters));
            return this.http.get(this._url, {
                params: {
                    dataset: RetrieveCompaniesService.DATASET,
                    lang: RetrieveCompaniesService.LANG,
                    rows: this.rows.toString(),
                    facet: this.facetsParams,
                    start: this.start.toString(),
                    q: this.queryBuilder.buildQuery(this.filters),
                },
            }).map((res) => res as FirmApiInterface).subscribe((response) => {
                this.nhits = response.nhits;
                this.facets = response.facet_groups;
                response.records.forEach((record: CompanyInterface) => {
                    this.companies.push(new Company(
                        record.fields.siren,
                        record.fields.l1_normalisee,
                        record.fields.l4_normalisee,
                        record.fields.codpos,
                        record.fields.libcom,
                        record.fields.categorie,
                        record.fields.libapen,
                        record.fields.libtefet,
                        record.fields.dcret,
                        record.fields.coordonnees,
                        record.fields.libapet,
                    ));
                });
                this.dispatch();
            });
        } else {
            this.createAlertCantConnect();
        }
    }

    // Fetch API and emit onGetCompanies event
    getCompanies(reinit = false, number = 0): Subscription {
        if (reinit) {
            this.companies = [];
            this.start = 0;
            if (number !== 0) {
                this.rows = number;
            } else {
                this.rows = RetrieveCompaniesService.NORMAL_ROWS;
            }
            return this.retrieveCompanies();
        }
        this.dispatch();
    }

    incrementCompanies(rows: number = null) {
        if (null !== rows) {
            if (RetrieveCompaniesService.MAX_ROWS <= rows) {
                rows = RetrieveCompaniesService.MAX_ROWS;
                this.start = 0;
            }
            this.rows = rows;
            this.companies = [];
        } else {
            if (this.rows !== RetrieveCompaniesService.MAX_ROWS) {
                this.start += this.rows;
            } else {
                this.start = 0;
            }
        }
        return this.retrieveCompanies();
    }

    checkConnexion(): void {
        this.network.onDisconnect().subscribe(
            () => this.isConnected = false,
        );
    }

    createAlertCantConnect(): void {
        let alert = this.alertCtrl.create({
            title: 'Pas de connexion !',
            subTitle: 'Impossible de se connecter à l\'application. Veuillez vous connecter',
            enableBackdropDismiss: false,
        });
        alert.present();
    }

    createLoader(): void {
        this.loading = this.loadingCtrl.create({
            spinner: 'crescent',
            content: 'Chargement en cours...',
        });
        this.loading.present();
    }
}
