const key = 'bookmarks';

export function getBookmark (): string[] {
  const json = JSON.parse(localStorage.getItem(key));
  const bookmarks = (json || []) as string[];
  return bookmarks
}

export function addBookmark (id: string) {
  let bookmarks = getBookmark();
  bookmarks.push(id);
  localStorage.setItem(key, JSON.stringify(bookmarks));
}

export function removeBookmark (id: string) {
  let bookmarks = getBookmark();
  bookmarks = bookmarks.filter((b: string)=>{return b != id})
  localStorage.setItem(key, JSON.stringify(bookmarks));
}
