import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { Circle, searchCircles } from '../../models/circle';
import { getBookmark } from '../../models/bookmarks';
import { getLocalCircles } from '../../models/circle';

@Component({
  selector: 'page-favourites',
  templateUrl: 'favourites.html'
})
export class FavouritesPage {

  public circles: Circle[] = [];
  public visibleCircles: Circle[] = [];

  constructor(
    public navCtrl: NavController
  ) {
    let circles: Circle[] = getLocalCircles();
    const bookmarks = getBookmark()

    circles = circles.filter((circle: Circle) => {
      return (bookmarks.indexOf(circle.id)+1)
    });

    this.circles = circles;
    this.visibleCircles = this.circles;
  }

  getItems(ev: any) {
    const target = ev.target.value;
    this.visibleCircles = searchCircles(target, this.circles);
  }

}
