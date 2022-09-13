import { Tile } from './tile';
import { Terminal } from 'wglt';
import { Point } from '../util/point';
import { Rectangle } from '../util/rectangle';

export class GameMap {
  constructor(
    public width: number,
    public height: number,
    public tiles: Tile[][],
  ) {}

  isPointInBounds(point: Point): boolean {
    return (
      0 <= point.x &&
      point.x < this.width &&
      0 <= point.y &&
      point.y < this.height
    );
  }

  render(term: Terminal, screenBounds: Rectangle) {
    for (let y = screenBounds.y; y <= screenBounds.y + term.height; y++) {
      for (let x = screenBounds.x; x <= screenBounds.x + term.width; x++) {
        const row = this.tiles[x];
        if (!row) continue;
        const tile = row[y];
        if (tile) {
          term.drawChar(
            x - screenBounds.x,
            y - screenBounds.y,
            tile.glyph.light.char,
            tile.glyph.light.fg,
            tile.glyph.light.bg,
          );
        }
      }
    }
  }
}
