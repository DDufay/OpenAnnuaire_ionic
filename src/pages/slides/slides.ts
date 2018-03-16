import { Component } from '@angular/core';
import { NavController } from "ionic-angular";
import { TabsPage } from "../tabs/tabs";

@Component({
    selector: 'page-slides',
    templateUrl: 'slides.html',
})
export class SlidesPage {
  slides = [
      {
          title: "Bienvenue sur OpenAnnuaire!",
          description: "OpenAnnuaire est une application qui vous permet de trouver des entreprises Françaises.",
          image: "assets/imgs/openannuaire.png",
      },
      {
          title: "Filtres",
          description: "Affiner votre recherche grâce à des filtres.",
          image: "assets/imgs/listCompanies.png",
      },
      {
          title: "Map",
          description: "Trouver votre entreprise sur la carte.",
          image: "assets/imgs/map.png",
      },
      {
          title: "Export",
          description: "Exporter les données des entreprises aux formats <small>XLS, CSV, JSON</small>.",
          image: "assets/imgs/export.png",
      }
  ];

    constructor(public navCtrl: NavController) {

    }

  closeSlider() {
      this.navCtrl.push(TabsPage);
  }
}
