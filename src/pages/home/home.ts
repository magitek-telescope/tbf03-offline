import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface Circle {
  id: string
  genre: string
  name: string
  penName: string
  nameRuby: string
  nextCircleExhibitInfoID: string
  prevCircleExhibitInfoID: string
  genreFreeFormat?: string
  createdAt: string
  updatedAt: string
  webSiteURL: string
  event?: any
  circleCutImage?: any
  spaces: string[]
}

@Injectable()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public circles: Circle[] = [];
  public visibleCircles: Circle[] = [];
  private baseURL: string = 'https://us-central1-tbf03-offline.cloudfunctions.net/scraper'

  constructor(
    public navCtrl: NavController,
    private http: HttpClient
  ) {
    if(navigator.onLine) {
      this.http.get(this.baseURL).subscribe((json: any) => {
        this.circles = JSON.parse(json).list.map((circle) => {
          if(!circle.circleCutImage) {
            circle.circleCutImage = {url: null};
          }
          return circle;
        });
        this.visibleCircles = this.circles;
        localStorage.setItem('circles', JSON.stringify(this.circles));
        console.log(this.visibleCircles)
      });
    } else {
      this.circles = JSON.parse(localStorage.getItem('circles')) as Circle[];
      this.visibleCircles = this.circles;
    }
  }

  getItems(ev: any) {
    const target = ev.target.value;
    this.visibleCircles = this.circles.filter((circle: Circle) => {
      return (
        circle.name.indexOf(target)+1 ||
        circle.penName.indexOf(target)+1 ||
        ('genreFreeFormat' in circle && circle.genreFreeFormat.indexOf(target)+1) ||
        circle.nameRuby.indexOf(target)+1 ||
        circle.spaces.join(', ').indexOf(target)+1
      );
    })
  }

}
