import { GUI, Terminal } from 'wglt';
import { Rectangle } from '../util/rectangle';
import { Point } from '../util/point';

export abstract class RogueScreen {
  abstract cameraPosition: Point;

  protected constructor(public term: Terminal, public gui: GUI) {}

  abstract update(): RogueScreen;

  getScreenBounds(): Rectangle {
    const halfHeight = Math.floor((this.term.height - 6) / 2);
    const halfWidth = Math.floor(this.term.width / 2);
    const startY = Math.floor(this.cameraPosition.y - halfHeight);
    const startX = Math.floor(this.cameraPosition.x - halfWidth);
    return new Rectangle(startX, startY, this.term.width, this.term.height - 6);
  }
}
