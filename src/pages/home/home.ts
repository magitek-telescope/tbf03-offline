import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Circle } from '../../models/circle';
import { getBookmark, addBookmark, removeBookmark } from '../../models/bookmarks';
import { getLocalCircles } from '../../models/circle';

@Injectable()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public circles: Circle[] = [];
  public visibleCircles: Circle[] = [];
  public bookmarks: string[] = [];
  private baseURL: string = 'https://us-central1-tbf03-offline.cloudfunctions.net/scraper'

  constructor(
    public navCtrl: NavController,
    private http: HttpClient
  ) {
    this.bookmarks = getBookmark();
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
      });
    } else {
      this.circles = getLocalCircles();
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

  onClickBookmark (id: string) {
    if (this.bookmarks.indexOf(id)+1) {
      removeBookmark(id)
    } else {
      addBookmark(id)
    }
    this.bookmarks = getBookmark()
  }

}
