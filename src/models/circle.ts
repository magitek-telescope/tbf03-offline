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

export function searchCircles(target: string, circles: Circle[]): Circle[] {
  target = target.toLowerCase();

  return circles.filter((circle: Circle) => {
    return (
      circle.name.indexOf(target)+1 ||
      circle.penName.indexOf(target)+1 ||
      ('genreFreeFormat' in circle && circle.genreFreeFormat.indexOf(target)+1) ||
      circle.nameRuby.indexOf(target)+1 ||
      circle.spaces.join(', ').indexOf(target)+1
    );
  })
}
