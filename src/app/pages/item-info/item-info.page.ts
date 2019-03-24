
import { LoadingController, IonContent } from '@ionic/angular';
import { ItemService, Item } from './../../services/item/item.service';
import { Router, ActivatedRoute } from '@angular/router';
import { OmdbService } from './../../services/omdb/omdb.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { ExtrasService } from 'src/app/services/extras/extras.service';
import { File } from '@ionic-native/file/ngx';
import { Platform } from '@ionic/angular';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser'

@Component({
  selector: 'app-item-info',
  templateUrl: './item-info.page.html',
  styleUrls: ['./item-info.page.scss'],
})
export class ItemInfoPage implements OnInit {
  // @ViewChild('itemContent') itemContent: any;
  itemInfo: any;
  passedId: string;
  inFav: boolean = false;
  moviePosterHD: SafeUrl;
  CONST_SERIE:string = "series";
  posterBlob:Blob;
  seasons: any[] = [];

 

  constructor(
    public OMdbProvider: OmdbService,
    public router: Router,
    public extrasService: ExtrasService,
    private route: ActivatedRoute,
    private itemService: ItemService,
    private loadingController: LoadingController,
    private sanitizer: DomSanitizer,
    private file: File,
    private platform: Platform
  ) {
    this.itemInfo = new Observable<any>();
  
    this.passedId = this.route.snapshot.params['id'];
       
  }

  ngOnInit() {
    this.loadInfo();
  }

   async downloadPoster() {
    await this.platform.ready();
    var storageLocation = "";
    console.log(this.platform.platforms, this.file.dataDirectory);
    switch (cordova.platformId.toLowerCase()) {  

      case "android":
        storageLocation = 'file:///storage/emulated/0/';
        break;
      case "ios":
        storageLocation = this.file.documentsDirectory;
        break;

    }

    var fs  = await this.file.resolveDirectoryUrl(storageLocation) 
    var umsDir = await this.file.getDirectory(fs, "/ums", {create: true, exclusive: false})
    var dirEntry = await this.file.getDirectory(umsDir, "/posters", {create: true, exclusive: false})
    this.file.writeFile(dirEntry.nativeURL, this.passedId + '.png', this.posterBlob,  {replace: true}) 

  }


  async loadInfo() {
    try {
      await this.getPosterHD()
    } catch {
      this.moviePosterHD = "assets/imgs/default_poster.png";
    }
    this.itemInfo = await this.OMdbProvider.getInfoById(this.passedId);
    this.itemInfo.Actors = this.itemInfo.Actors.split(',')
    this.itemInfo.Genre = this.itemInfo.Genre.split(',')
    if(this.itemInfo.Type == this.CONST_SERIE){

      for(let i=1; i <= this.itemInfo.totalSeasons; i++){
        let season:any = new Observable<any>();
        season = await this.OMdbProvider.getSeasonsByImdbID(this.passedId, i.toString());
        this.seasons.push(season);
      }
     
    }
    this.loadItem();
  }

  
  async getPosterHD(){
    this.posterBlob = await this.OMdbProvider.getPosterById(this.passedId);
    this.moviePosterHD = this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(this.posterBlob));
  }

  showEpisodes(ev: any, season:any){
    this.extrasService.setExtras(season);
    this.router.navigate(['/item-info/' + this.passedId + '/' + season.Season]);
    //console.log();
    // ev.preventDefault();

    // let alreadyDisplayed = false;
    // if(ev.target.nextElementSibling.className.indexOf("active") > -1){
    //   alreadyDisplayed = true;
    // }

    // ev.target.parentElement.parentElement.parentElement.querySelectorAll( ".active" ).forEach( e =>
    //   e.classList.remove( "active" )
    // );

    // if(!alreadyDisplayed) {
    //   ev.target.nextElementSibling.classList.add( "active" );
    // }
  }

  
  episodeTapped(ev:any, episode:any){
    this.router.navigate(['/item-info/' + episode.imdbID]);
  }

  async loadItem(){
    const loading = await this.loadingController.create({
      message: 'Chargement..'
    });

    await loading.present();
    this.itemService.getItem(this.passedId).subscribe(res => {
      loading.dismiss();
      if(res){        
        this.inFav = true;
      }else {
        this.inFav = false;
      }
      
    });
  }

  async saveItem(){
    const loading = await this.loadingController.create({
      message: 'Mise en favoris..'
    });
    await loading.present();
 
    let myItem = {
      'imdbID' : this.passedId,
      'Title' : this.itemInfo.Title,
      'Type' : this.itemInfo.Type,
      'Date' : this.itemInfo.Date || this.itemInfo.Released
    }
    if (this.inFav) {
      this.itemService.removeItem(this.passedId).then(() => {
        loading.dismiss();
        this.inFav = false;
      });
    } else {
      this.itemService.addItem(myItem).then(() => {
        loading.dismiss();
        this.inFav = true;
      });
    }
  }

  
}
