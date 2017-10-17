import { Component, Input } from '@angular/core';
import { Circle } from '../../interfaces';
import { CloudfunctionsProvider, BookmarkProvider, CircleProvider } from '../../providers';

@Component({
  selector: 'circle-card',
  templateUrl: 'circle-card.html',
    providers: [
        CloudfunctionsProvider,
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
      public cf: CloudfunctionsProvider,
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
