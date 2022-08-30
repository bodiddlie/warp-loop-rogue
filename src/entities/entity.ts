import { Point } from '../util/point';
import { Graphic } from '../map/tile';
import { Terminal } from 'wglt';
import { Rectangle } from '../util/rectangle';

export abstract class Entity {
  protected constructor(public position: Point, public graphic: Graphic) {}

  render(term: Terminal, screenBounds: Rectangle) {
    if (!screenBounds.contains(this.position)) return;

    term.drawChar(
      this.position.x - screenBounds.x,
      this.position.y - screenBounds.y,
      this.graphic.char,
      this.graphic.fg,
      this.graphic.bg,
    );
  }
}
