import { Injectable } from '@angular/core';
import { Circle } from '../../interfaces';

@Injectable()
export class CircleProvider {

    key = 'circles';

    getLocalCircles(): Circle[] {
        const json = JSON.parse(localStorage.getItem(this.key));
        const bookmarks = (json || []) as Circle[];
        return bookmarks
    }

    searchCircles(target: string, circles: Circle[]): Circle[] {
        target = target.toLowerCase();

        return circles.filter((circle: Circle) => {
            return (
                circle.name.toLowerCase().indexOf(target)+1 ||
                circle.penName.toLowerCase().indexOf(target)+1 ||
                ('genreFreeFormat' in circle && circle.genreFreeFormat.toLowerCase().indexOf(target)+1) ||
                circle.nameRuby.toLowerCase().indexOf(target)+1 ||
                circle.spaces.join(', ').toLowerCase().indexOf(target)+1
            );
        })
    }
}
