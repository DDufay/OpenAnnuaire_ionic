import { Component, OnInit } from '@angular/core';
import { LoadingController, NavController, NavParams } from 'ionic-angular';
import { RetrieveCompaniesService } from '../../app/retrieve-companies.service';
import { Company } from '../../app/model/company';
import { DetailCompanyPage } from '../detail-company/detail-company';

@Component({
    selector: 'page-companies',
    templateUrl: 'companies.html'
})
export class CompaniesPage implements OnInit {
    companies: Company[];

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        private retrieveCompaniesService: RetrieveCompaniesService,
        public loadingCtrl: LoadingController
    ) {
        this.retrieveCompaniesService.onGetCompanies.subscribe((companies: Company[]) => this.companies = companies);
    }

    ngOnInit(): void {
        this.retrieveCompaniesService.retrieveCompanies();
    }

    doInfinite(infiniteScroll) {
        setTimeout(() => {
            this.retrieveCompaniesService.incrementCompanies();
            infiniteScroll.complete();
        }, 700);
    }

    detailCompany(company: Company) {
        this.navCtrl.push(DetailCompanyPage, company);
    }
}