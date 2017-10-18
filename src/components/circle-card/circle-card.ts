import { Component, Input } from '@angular/core';
import { Circle } from '../../interfaces';
import { BookmarkProvider, CircleProvider } from '../../providers';

@Component({
  selector: 'circle-card',
  templateUrl: 'circle-card.html',
    providers: [
        BookmarkProvider,
        CircleProvider
    ]
})
export class CircleCardComponent {

  public circles: Circle[] = [];
  public visibleCircles: Circle[] = [];
  public bookmarks: string[] = [];
  @Input() info:Circle;

  constructor(
      public bookmark: BookmarkProvider,
      public circle: CircleProvider
  ){}

  ngOnInit(){
      this.bookmarks = this.bookmark.getBookmark();
  }

  onClickBookmark (id: string) {
      if (this.bookmarks.indexOf(id)+1) {
          this.bookmark.removeBookmark(id)
      } else {
          this.bookmark.addBookmark(id)
      }
      this.bookmarks = this.bookmark.getBookmark()
  }
}
