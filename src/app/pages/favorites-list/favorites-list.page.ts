
import { Item, ItemService } from './../../services/item/item.service';
import { Component, OnInit } from '@angular/core';

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

  constructor(private itemService: ItemService) { }

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


  }

  
  share(){
    
  }
  
  export() {
    
  }

  import() {

  }

}
