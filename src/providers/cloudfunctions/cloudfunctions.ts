import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';

@Injectable()
export class CloudfunctionsProvider {

  constructor(public http: HttpClient) {
    console.log('Hello CloudfunctionsProvider Provider');
  }

  getScraper() {
    return this.http.get<string>('https://us-central1-tbf03-offline.cloudfunctions.net/scraper')
      .map( res => {
        return JSON.parse(res).list.map((circle) => {
          if(!circle.circleCutImage) {
            circle.circleCutImage = {url: null};
          }
          return circle;
        });
      });
  }

}
