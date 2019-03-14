import { OMdbProvider } from './../../../../../tgut/src/providers/omdb/omdb';
import { ItemListPage } from '../item-list/item-list.page';
import { Component, OnInit } from '@angular/core';
import { NavController, ActionSheetController, LoadingController, AlertController } from '@ionic/angular';
import { OmdbService } from 'src/app/services/omdb/omdb.service';
import { HttpClient } from '@angular/common/http';

import { Router } from '@angular/router';
import { ExtrasService } from 'src/app/services/extras/extras.service';

@Component({
  selector: 'app-movies-list',
  templateUrl: '../item-list/item-list.page.html',
  styleUrls: ['../item-list/item-list.page.scss'],
})
export class MoviesListPage extends ItemListPage implements OnInit {

  constructor(public navCtrl: NavController,
    public actionSheetCtrl: ActionSheetController,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public OMdbProvider: OmdbService,
    public http: HttpClient,
    public router: Router,
    public extrasService: ExtrasService) {
     super(navCtrl, actionSheetCtrl, 
      loadingCtrl, alertCtrl, OMdbProvider,
      http, router, extrasService);
   }

  ngOnInit() {
  }

}
