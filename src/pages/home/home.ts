import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { Circle } from '../../interfaces';
import { CloudfunctionsProvider, BookmarkProvider, CircleProvider } from '../../providers';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [
      CloudfunctionsProvider,
      BookmarkProvider,
      CircleProvider
  ]
})
export class HomePage {

  public circles: Circle[] = [];
  public visibleCircles: Circle[] = [];
  public bookmarks: string[] = [];

  constructor(
    public navCtrl: NavController,
    public cf: CloudfunctionsProvider,
    public bookmark: BookmarkProvider,
    public circle: CircleProvider
  ){}

  ionViewDidLoad() {
      if(navigator.onLine) {
          this.cf.getScraper()
              .subscribe((json: any) => {
              this.circles = json;
              this.visibleCircles = this.circles;
              localStorage.setItem('circles', JSON.stringify(this.circles));
          });
      } else {
          this.circles = this.circle.getLocalCircles();
          this.visibleCircles = this.circles;
      }
  }

  getItems(ev: any) {
    const target: string = ev.target.value.toLowerCase();
    this.visibleCircles = this.circle.searchCircles(target, this.circles);
  }
}
