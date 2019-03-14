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
  loaded: boolean = false;

  constructor(private itemService: ItemService) { }

  ngOnInit() {
    this.itemService.getItems().subscribe(res => {
      let that = this;
      this.movies = [];
      this.tvshows = [];
      res.forEach(function(value, key) {
        console.log(value);
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

}
