import { ExtrasService } from 'src/app/services/extras/extras.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  constructor(private extrasService: ExtrasService){}

  updateTab(idTab: number){
    this.extrasService.setActiveTab(idTab);
  }

}
