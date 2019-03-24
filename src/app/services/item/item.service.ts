import { AuthenticateService } from './../authenticate/authenticate.service';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Item {
  imdbID?: string;
  Title: string;
  Type: string;
  Date: string;
}

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  private itemsCollection: AngularFirestoreCollection<Item>;
  private items: Observable<Item[]>;

  constructor(public db: AngularFirestore,
    ) {
      this.updateCollection('items');

  }

  updateCollection(userEmail){
    this.itemsCollection =  this.db.collection<Item>(userEmail);

    this.items = this.itemsCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const imdbID = a.payload.doc.id;
          return { imdbID, ...data };
        });
      })
    );
  }

  getItems() {
    return this.items;
  }
 
  getItem(imdbID) {
    return this.itemsCollection.doc<Item>(imdbID).valueChanges();
  }
 
  updateItem(item: Item, imdbID: string) {
    return this.itemsCollection.doc(imdbID).update(item);
  }
 
  addItem(item: Item) {
    return this.itemsCollection.doc(item.imdbID).set(item);
  }
 
  removeItem(imdbID) {
    return this.itemsCollection.doc(imdbID).delete();
  }
}