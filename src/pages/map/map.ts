import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { RetrieveCompaniesService } from "../../app/retrieve-companies.service";
import { Company } from "../../app/model/company";

declare let google: any;

@Component({
    selector: 'page-map',
    templateUrl: 'map.html'
})
export class MapPage implements OnInit {
    @ViewChild('map') mapRef: ElementRef;
    companies: Company[];
    alreadyFiltered = false;

    constructor(public navCtrl: NavController, private retrieveCompaniesService: RetrieveCompaniesService) {
        this.retrieveCompaniesService.onFilterCompanies.subscribe(() => {
            this.alreadyFiltered = true;
        });
        this.retrieveCompaniesService.onGetCompanies.subscribe((companies: Company[]) => {
            this.companies = companies;
            this.showMap();
        });
    }

    ngOnInit(): void {
        this.retrieveCompaniesService.getCompanies();
    }

    // Display map into view, with location and some options
    showMap() {
        // This location is France
        const location = new google.maps.LatLng(46.4670728, 2.0584019);
        //Map options
        const options = {
            center: location,
            zoom: 5,
            //streetViewControl: false, Useful if you want to disabled streetView. #default = true
            //mapTypeId: 'satellite', Change the view to satellite, other posibility 'roadmap', 'hybrid', 'terrain'
        };
        // Display map
        const map = new google.maps.Map(this.mapRef.nativeElement, options);
        setTimeout(() => {
            // loop on companies to set markers and to display info of company on google map
            this.companies.forEach((company: Company) => {
                if (undefined !== company.coordinates) {
                    let latLng = new google.maps.LatLng(company.coordinates[0], company.coordinates[1]);
                    // Content of infoWindow
                    let content = "Nom : " + company.name + "<hr>Adresse : " + company.address + "<br>Code postal : " + company.postal_code + "<br>Ville : " + company.city;
                    let infoWindow = this.infoWindow(content);
                    let marker = this.addMarker(latLng, map, company.name);
                    marker.addListener('click', function () {
                        infoWindow.open(map, marker);
                    });
                }
            });
        }, 1200);
    }

    addMarker(position, map, title) {
        return new google.maps.Marker({
            position,
            map,
            title
        });
    }

    infoWindow(content) {
        return new google.maps.InfoWindow({
            content: content
        });
    }
}
