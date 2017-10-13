const key = 'circles';

export interface Circle {
  id: string
  genre: string
  name: string
  penName: string
  nameRuby: string
  nextCircleExhibitInfoID: string
  prevCircleExhibitInfoID: string
  genreFreeFormat?: string
  createdAt: string
  updatedAt: string
  webSiteURL: string
  event?: any
  circleCutImage?: any
  spaces: string[]
}

export function getLocalCircles(): Circle[] {
  const json = JSON.parse(localStorage.getItem(key));
  const bookmarks = (json || []) as Circle[];
  return bookmarks
}
