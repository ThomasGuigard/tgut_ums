import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OmdbService {

  requestString: string;

  static OMdbApiKey =  '75522b56' //'79c5ab14';

  constructor(public http: HttpClient) {
    console.log('Hello MovieProvider Provider');
  }


  async getInfoById(imdbID){
    console.log(imdbID)
    return await this.http.get<any>(
      'http://www.omdbapi.com/?i=' + imdbID + '&apikey=' + OmdbService.OMdbApiKey
    ).toPromise();
    //.map(res => res.json())
  }

  async getPosterById(imdbID){
    return await this.http.get(
      'http://img.omdbapi.com/?i=' + imdbID + '&h=600&apikey=' + OmdbService.OMdbApiKey
    , {responseType: "blob"}).toPromise();
  }

  async getSeasonsByImdbID(imdbID: string, seasonNumber: string){
    return await this.http.get(
      'http://www.omdbapi.com/?i=' + imdbID + '&season=' + seasonNumber + '&apikey=' + OmdbService.OMdbApiKey
    ).toPromise();
  }

  async getEpisodesByImdbID(imdbID: string){
    return await this.http.get(
      'http://omdbapi.com/?i=' + imdbID + '&h=600&apikey=' + OmdbService.OMdbApiKey
    ).toPromise();
  }
  
  async getContentByTitle(title: string, contentType: string, page: number){
    return new Promise(resolve => {
      console.log(contentType)
      this.requestString = 'http://www.omdbapi.com/?type=' + contentType 
                          + '&s=' + title 
                          + '&page=' + page.toString()
                          + '&apikey=' + OmdbService.OMdbApiKey
      this.http.get(
        this.requestString
      ).subscribe((content) => {
  
        if(!content['Search']) {
          resolve(false);
        } 
        let newContent: any = {'results':'','maxResults':''};
        
        newContent.results = content['Search'];
        newContent.maxResults = content['totalResults']
        
        if(newContent.results){
          for(let content of newContent.results) {
            if(content.poster == 'N/A') {
              // this.http.request('../assets/imgs/default_poster.png')
              // .subscribe(poster => {
              //content.poster = '../assets/imgs/default_poster.png';
              // })
            
            }          
          }   
        }

        resolve(newContent);
      });
    });
	}
}
