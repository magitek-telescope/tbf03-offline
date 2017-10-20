import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

import { Circle } from '../../interfaces';
import { CloudfunctionsProvider, BookmarkProvider, CircleProvider } from '../../providers';

@IonicPage()
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
  public page:number = 0;
  public per :number = 9;

  constructor(
    public navCtrl: NavController,
    public cf: CloudfunctionsProvider,
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

  doInfinite(infiniteScroll) {
      this.visibleCircles = this.visibleCircles.concat(this.circles.slice(this.page * this.per, this.page * this.per + this.per));
      this.page++;
      console.log([this.page * this.per, this.page * this.per + this.per]);
      infiniteScroll.complete();
  }
}
