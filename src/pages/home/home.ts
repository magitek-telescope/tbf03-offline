import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { CloudfunctionsProvider } from '../../providers';
import { Circle, searchCircles } from '../../models/circle';
import { getBookmark, addBookmark, removeBookmark } from '../../models/bookmarks';
import { getLocalCircles } from '../../models/circle';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [CloudfunctionsProvider]
})
export class HomePage {

  public circles: Circle[] = [];
  public visibleCircles: Circle[] = [];
  public bookmarks: string[] = [];

  constructor(
    public navCtrl: NavController,
    public cf: CloudfunctionsProvider
  ){}

  ionViewDidLoad() {
      this.bookmarks = getBookmark();
      if(navigator.onLine) {
          this.cf.getScraper()
              .subscribe((json: any) => {
              this.circles = json;
              this.visibleCircles = this.circles;
              localStorage.setItem('circles', JSON.stringify(this.circles));
          });
      } else {
          this.circles = getLocalCircles();
          this.visibleCircles = this.circles;
      }
  }

  getItems(ev: any) {
    const target: string = ev.target.value.toLowerCase();
    this.visibleCircles = searchCircles(target, this.circles);
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
