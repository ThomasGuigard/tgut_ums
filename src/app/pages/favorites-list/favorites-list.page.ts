
import { Item, ItemService } from './../../services/item/item.service';
import { Component, OnInit } from '@angular/core';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { File } from '@ionic-native/file/ngx';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-favorites-list',
  templateUrl: './favorites-list.page.html',
  styleUrls: ['./favorites-list.page.scss'],
})
export class FavoritesListPage implements OnInit {

  tvshows: Item[] = [];
  movies: Item[] = [];
  allFavs: Item[] = []
  loaded: boolean = false;

  constructor(private itemService: ItemService,
    private socialSharing: SocialSharing,
    private file: File,
    private platform: Platform) { }

  ngOnInit() {
    this.itemService.getItems().subscribe(res => {
      let that = this;
      this.movies = [];
      this.tvshows = [];
      this.allFavs = res;
      res.forEach(function(value, key) {
        console.log(value);
        // sync data if online to get poster
        if(value.Type == "movie"){
          that.movies.push(value);
        } else {
          that.tvshows.push(value)
        }
      });
      this.loaded = true;
    });
  }

  remove(item){
    this.itemService.removeItem(item.imdId);
  }

  saveAsCsv() {
    let csvArray: Item[];
    console.log(this.allFavs)
    csvArray = this.allFavs.map((item) => {
      return {imdbID : item["imdbID"], Title : item["Title"],  Date : item["Date"], Type: item["Type"]}
    });
    console.log(csvArray)

    let array = typeof csvArray != 'object' ? JSON.parse(csvArray) : csvArray;
    let str = '';
    let row = "imdbID,Title,Date,Type,"; 
    // for (let index in array[0]) {
    //     //Now convert each value to string and comma-separated
    //     row += index + ',';
    // }
    row = row.slice(0, -1);
    //append Label row with line break
    str += row + '\r\n';

    for (let i = 0; i < array.length; i++) {
        let line = '';
        for (let index in array[i]) {
            if (line != '') line += ',';
            line += array[i][index];
        }
        str += line + '\r\n';
    }
    console.log(str)
    
    return str
  }

  
  async share(){
    let csv = this.saveAsCsv();
    await this.file.writeFile(this.file.cacheDirectory, "favoris.csv", csv,  {replace: true});  
    this.socialSharing.share(null, null, this.file.cacheDirectory + "favoris.csv", null);
  }
  
  async export() {
    let csv:any = this.saveAsCsv()

    await this.platform.ready();
    var storageLocation = "";
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
    var dirEntry = await this.file.getDirectory(umsDir, "/export", {create: true, exclusive: false})
    this.file.writeFile(dirEntry.nativeURL, 'favoris.csv', csv,  {replace: true}) 
  }

  async import() {

  }

}
