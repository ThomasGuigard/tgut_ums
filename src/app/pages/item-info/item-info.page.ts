import { LoadingController, IonContent } from '@ionic/angular';
import { ItemService } from './../../services/item/item.service';
import { Router, ActivatedRoute } from '@angular/router';
import { OmdbService } from './../../services/omdb/omdb.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { ExtrasService } from 'src/app/services/extras/extras.service';
import { Storage } from '@ionic/storage';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser'

@Component({
  selector: 'app-item-info',
  templateUrl: './item-info.page.html',
  styleUrls: ['./item-info.page.scss'],
})
export class ItemInfoPage implements OnInit {
  @ViewChild('itemContent') itemContent: any;
  itemInfo: any;
  passedId: string;
  inFav: string = "star-outline";
  moviePosterHD: SafeUrl;
  CONST_SERIE:string = "series";
  posterBlob:Blob;
  seasons: any[] = [];

 

  constructor(
    public OMdbProvider: OmdbService,
    public router: Router,
    public extrasService: ExtrasService,
    private storage: Storage,
    private route: ActivatedRoute,
    private itemService: ItemService,
    private loadingController: LoadingController,
    private sanitizer: DomSanitizer
  ) {
    this.itemInfo = new Observable<any>();
    //this.poster = new Observable<any>();
    // let routeParams = this.router.url.split('/')
    // this.passedId = routeParams[routeParams.length-1].trim()
    // console.log(this.passedId)
    this.passedId = this.route.snapshot.params['id'];
    console.log(this.itemContent)

    
  }

  ngOnInit() {
    this.loadInfo();
    console.log(this.itemInfo)
  }

  // downloadPoster() {

  //   window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, (fs) => {
  //     fs.root.getDirectory("poster", {create: true, exclusive: false}, (dirEntry) => {
  //       console.log('file system open: ' + fs);
  //       dirEntry.getFile(this.passedId, { create: true, exclusive: false }, (fileEntry) => {
  
  //         this.writeFile(fileEntry, this.posterBlob, false);
    
  //       }, this.onErrorCreateFile);
  //     }, this.onErrorLoadDir);
   
  
  //   }, this.onErrorLoadFs);
  

  // }
  // onErrorCreateFile(error: FileError){}
  // onErrorLoadDir(error: FileError){}
  // onErrorLoadFs(error: FileError){}

  // writeFile(fileEntry, dataObj, isAppend) {
  //   console.log(dataObj)
  //   // Create a FileWriter object for our FileEntry (log.txt).
  //   fileEntry.createWriter(function (fileWriter) {

  //       fileWriter.onwriteend = function() {
  //           console.log("Successful file write...", dataObj);            
  //       };

  //       fileWriter.onerror = function(e) {
  //           console.log("Failed file write: " + e.toString());
  //       };

  //       fileWriter.write(dataObj);
  //   });
  // }



  async loadInfo() {
    await this.getPosterHD()
    this.itemInfo = await this.OMdbProvider.getInfoById(this.passedId);
    console.log(this.itemInfo.Type , this.CONST_SERIE)
    this.itemInfo.Actors = this.itemInfo.Actors.split(',')
    this.itemInfo.Genre = this.itemInfo.Genre.split(',')
    if(this.itemInfo.Type == this.CONST_SERIE){

      for(let i=1; i <= this.itemInfo.totalSeasons; i++){
        let season:any = new Observable<any>();
        season = await this.OMdbProvider.getSeasonsByImdbID(this.passedId, i.toString());
        this.seasons.push(season);
      }
     
    }
    //check internet
    this.isInFav();
    this.loadItem();
  }

  
  async getPosterHD(){
    this.posterBlob = await this.OMdbProvider.getPosterById(this.passedId);
    this.moviePosterHD = this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(this.posterBlob));
  }

  showEpisodes(ev: any, season:any){
    // this.extrasService.setExtras(season);
    // this.router.navigate(['/item-info/' + this.passedId + '/' + season.Season]);
    //console.log();
    ev.preventDefault();

    let alreadyDisplayed = false;
    if(ev.target.nextElementSibling.className.indexOf("active") > -1){
      alreadyDisplayed = true;
    }

    ev.target.parentElement.parentElement.parentElement.querySelectorAll( ".active" ).forEach( e =>
      e.classList.remove( "active" )
    );

    if(!alreadyDisplayed) {
      ev.target.nextElementSibling.classList.add( "active" );
    }
  }

  
  episodeTapped(ev:any, episode:any){
    this.router.navigate(['/item-info/' + episode.imdbID]);
  }

  async loadItem(){
    const loading = await this.loadingController.create({
      message: 'Loading Todo..'
    });

    await loading.present();
    this.itemService.getItem(this.passedId).subscribe(res => {
      loading.dismiss();
      if(res){        
        this.inFav = "star";
      }else {
        this.inFav = "star-outline";
      }
      
      console.log("result from firebase", res);
    });
  }

  isInFav(){
    this.storage.get(this.passedId).then((item) => {
      if(item){
        //update item for offline
        this.storage.set(this.passedId,JSON.stringify(this.itemInfo));
        this.inFav = "star";
      } else {
        this.inFav = "star-outline";
      }
    })
  }

  async saveItem(){
    const loading = await this.loadingController.create({
      message: 'Saving Todo..'
    });
    await loading.present();
 
    if (this.inFav == "star") {
      this.itemService.removeItem(this.passedId).then(() => {
        loading.dismiss();
        this.inFav = "star-outline";
        //this.nav.goBack('home');
      });
    } else {
      this.itemService.addItem(this.itemInfo).then(() => {
        loading.dismiss();
        this.inFav = "star";
        //this.nav.goBack('home');
      });
    }
  }

  addOrRemoveFav(ev: any){
    //check status
    this.storage.get(this.passedId).then((item) => {
      console.log(item);
      if(item){
        // 
        this.storage.remove(this.passedId);
        console.log(item);
        this.inFav = "star-outline";
      }else {
        // add
        this.storage.set(this.passedId,JSON.stringify(this.itemInfo));
        this.inFav = "star";
      }
   
    }).catch((error) => {
      console.log(error);
    });    
  }
}
