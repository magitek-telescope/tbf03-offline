import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { Circle } from '../../models/circle';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {

  public circles: Circle[] = [];
  public visibleCircles: Circle[] = [];
  private baseURL: string = 'https://us-central1-tbf03-offline.cloudfunctions.net/scraper'

  constructor(
    public navCtrl: NavController
  ) {
    let circles: Circle[] = JSON.parse(localStorage.getItem('circles', '[]')) as Circle[] || [];
    const bookmarks = (JSON.parse(localStorage.getItem('bookmarks', '[]')) as string[]) || [];

    circles = circles.filter((circle: Circle) => {
      return (bookmarks.indexOf(circle.id)+1)
    });

    this.circles = circles;
    this.visibleCircles = this.circles;
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
