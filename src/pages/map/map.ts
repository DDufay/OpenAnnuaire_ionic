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
    currentModal = null;

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
                    const latLng = new google.maps.LatLng(company.coordinates[0], company.coordinates[1]);
                    // Content of infoWindow
                    const content = "Nom : " + company.name + "<hr>Adresse : " + company.address + "<br>Code postal : " + company.postal_code + "<br>Ville : " + company.city;
                    const infoWindow = this.infoWindow(content);
                    const marker = this.addMarker(latLng, map, company.name);
                    marker.addListener('click', () => {
                        if (this.currentModal !== null) {
                            this.currentModal.close();
                        }
                        this.currentModal = infoWindow;
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
