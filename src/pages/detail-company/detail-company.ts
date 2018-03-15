import {Component, ElementRef, ViewChild} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {Company} from "../../app/model/company";

declare let google: any;

@Component({
    selector: 'page-detail-company',
    templateUrl: 'detail-company.html',
})
export class DetailCompanyPage {
    company: Company;
    asCoordinates = false;
    @ViewChild('map_detail_companies') mapRef: ElementRef;

    constructor(public navCtrl: NavController, public navParams: NavParams) {
        this.company = navParams.data;
    }

    ionViewDidLoad() {
        this.showMap();
    }

    showMap() {
        if (undefined !== this.company.coordinates) {
            this.asCoordinates = true;
            const destination = new google.maps.LatLng(this.company.coordinates[0], this.company.coordinates[1]);
            //Map options
            const options = {
                center: destination,
                zoom: 5,
                streetViewControl: false,
                disableDefaultUI: true
                //mapTypeId: 'satellite', Change the view to satellite, other posibility 'roadmap', 'hybrid', 'terrain'
            };
            // Display map
            const map = new google.maps.Map(this.mapRef.nativeElement, options);
            this.addMarker(destination, map, this.company.name);
        }
    }

    addMarker(position, map, title) {
        return new google.maps.Marker({
            position,
            map,
            title
        });
    }
}
