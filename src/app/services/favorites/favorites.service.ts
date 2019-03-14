import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

const STORAGE_KEY = 'favoriteMedias';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {

  constructor(public storage: Storage) { }

  isFavorite(mediaId) {
    return this.getAllFavoriteMedias().then(result => {
      return result && result.indexOf(mediaId) !== -1;
    });
  }
 
  favoriteMedia(mediaId) {
    return this.getAllFavoriteMedias().then(result => {
      if (result) {
        result.push(mediaId);
        return this.storage.set(STORAGE_KEY, result);
      } else {
        return this.storage.set(STORAGE_KEY, [mediaId]);
      }
    });
  }
 
  unfavoriteMedia(mediaId) {
    return this.getAllFavoriteMedias().then(result => {
      if (result) {
        var index = result.indexOf(mediaId);
        result.splice(index, 1);
        return this.storage.set(STORAGE_KEY, result);
      }
    });
  }
 
  getAllFavoriteMedias() {
    return this.storage.get(STORAGE_KEY);
  }
 

}
