import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ExtrasService {

  extras:any = {};
  private activeTab: number = 0;

  constructor() { }

  public setExtras(data:any) {
    this.extras = data;
  }


  public getExtras(){
    return this.extras;
  }

  public setActiveTab(id: number){
    this.activeTab = id;
  }

  public getActiveTab(){
    return this.activeTab;
  }
}
