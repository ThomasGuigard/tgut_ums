import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ExtrasService } from 'src/app/services/extras/extras.service';

@Component({
  selector: 'app-item-season',
  templateUrl: './item-season.page.html',
  styleUrls: ['./item-season.page.scss'],
})
export class ItemSeasonPage implements OnInit {

  season:any;

  constructor(
    public router: Router,
    public extrasService: ExtrasService
  ) { 
    this.season = extrasService.getExtras();
    console.log(this.season);
  }

  ngOnInit() {
    this.loadView();
  }

  async loadView() {

  }

  episodeTapped(ev:any, episode:any){
    this.router.navigate(['/item-info/' + episode.imdbID]);
  }

}
