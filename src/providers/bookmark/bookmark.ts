import { Injectable } from '@angular/core';

@Injectable()
export class BookmarkProvider {

    key = 'bookmarks';

    getBookmark (): string[] {
        const json = JSON.parse(localStorage.getItem(this.key));
        const bookmarks = (json || []) as string[];
        return bookmarks
    }

    addBookmark (id: string) {
        let bookmarks = this.getBookmark();
        bookmarks.push(id);
        localStorage.setItem(this.key, JSON.stringify(bookmarks));
    }

    removeBookmark (id: string) {
        let bookmarks = this.getBookmark();
        bookmarks = bookmarks.filter((b: string)=>{return b != id})
        localStorage.setItem(this.key, JSON.stringify(bookmarks));
    }
}
