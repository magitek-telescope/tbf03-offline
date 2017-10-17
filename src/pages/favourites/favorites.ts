import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

import { Circle } from '../../interfaces';
import { CloudfunctionsProvider, BookmarkProvider, CircleProvider } from '../../providers';

@IonicPage()
@Component({
  selector: 'page-favourites',
  templateUrl: 'favorites.html',
  providers: [
      CloudfunctionsProvider,
      BookmarkProvider,
      CircleProvider
  ]
})
export class FavoritesPage {

  public circles: Circle[] = [];
  public visibleCircles: Circle[] = [];

  constructor(
    public navCtrl: NavController,
    public cf: CloudfunctionsProvider,
    public bookmark: BookmarkProvider,
    public circle: CircleProvider
  ) {}

  ionViewDidLoad() {
    let circles: Circle[] = this.circle.getLocalCircles();
    const bookmarks = this.bookmark.getBookmark();

    circles = circles.filter((circle: Circle) => {
        return (bookmarks.indexOf(circle.id)+1)
    });

    this.circles = circles;
    this.visibleCircles = this.circles;
  }

  getItems(ev: any) {
    const target = ev.target.value;
    this.visibleCircles = this.circle.searchCircles(target, this.circles);
  }

}
