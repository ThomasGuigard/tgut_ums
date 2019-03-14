import { ExtrasService } from 'src/app/services/extras/extras.service';

import { ItemInfoPage } from '../item-info/item-info.page';
import { OmdbService } from '../../services/omdb/omdb.service';
import { HttpClient } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NavController, IonInfiniteScroll } from '@ionic/angular';
import { ActionSheetController } from '@ionic/angular';
import { AlertController, LoadingController  } from '@ionic/angular';


@Component({
  selector: 'app-item-list',
  templateUrl: 'item-list.page.html',
  styleUrls: ['item-list.page.scss']
})
export class ItemListPage {
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  loading: any;
  items: any[];
  posters: string[];
  inputString: string;
  defaultPoster: any;
  contentType: string="movie";
  maxResults: number;
  currentPage: number;
  displaySrcBar: boolean=false;

  constructor(
    public navCtrl: NavController,
    public actionSheetCtrl: ActionSheetController,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public OMdbProvider: OmdbService,
    public http: HttpClient,
    public router: Router,
    public extrasService: ExtrasService) {

  }

  ngOnInit(){}

  ionViewDidEnter(){
    if(this.extrasService.getActiveTab() == 1){
      this.contentType = "series"
    }
    console.log(this.contentType)
  }

  ionViewDidLoad() {
    
  }

  switch(ev: any,_bool: boolean){
    this.displaySrcBar = _bool;
    console.log(this.displaySrcBar);
  }

  searchByTitle(ev: any) {
    // set val to the value of the searchbar
    const inputString = ev.target.value;

    // if the value is an empty string don't filter the items
    if (inputString 
      && inputString.trim() != '' 
      && inputString.trim().length > 3) {    
        //this.presentLoading()
        this.inputString = inputString;
        this.OMdbProvider.getContentByTitle(this.inputString, this.contentType, this.currentPage = 1)
        .then((dataFetched: any) => {
          if(!dataFetched){
            //this.showAlert(inputString);
          } else {
            this.items = dataFetched.results
            this.maxResults = dataFetched.maxResults;
            if(this.infiniteScroll.disabled){
              this.infiniteScroll.disabled = false
            }            
          }
          //this.loading.dismiss();
        });    
    }
  }

  isInfiniteScrollAvailable(){
   if(this.maxResults/10 >= this.currentPage){      
      return true;
    } else {
      return false;
    }
  }

  loadData(event){
    if(this.isInfiniteScrollAvailable()){      
      this.OMdbProvider.getContentByTitle(this.inputString, this.contentType, this.currentPage + 1).then((newItems: any) => {
        this.currentPage += 1;
        this.items.push(...newItems.results);
        event.target.complete();
      })
    } else {
      this.infiniteScroll.disabled = true;
      event.target.complete();
    }
  }

  async showAlert(mySearch: string) {
    const alert = await this.alertCtrl.create({
      header: 'Erreur',
      subHeader: 'Impossible de trouver un contenu correspondant à ' + mySearch,
      buttons: ['OK']
    });
    return await alert.present();
  }

  async presentLoading() {

    this.loading = await this.loadingCtrl.create({
        message: 'Please wait...'
    });
    
    return await this.loading.present();
  }



}
