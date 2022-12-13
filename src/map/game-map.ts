import { Tile } from './tiles/tile';
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

  update() {
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        const tile = this.tiles[x][y];
        tile.type.update();
      }
    }
  }

  render(term: Terminal, screenBounds: Rectangle) {
    for (let y = screenBounds.y; y <= screenBounds.y + term.height; y++) {
      for (let x = screenBounds.x; x <= screenBounds.x + term.width; x++) {
        const row = this.tiles[x];
        if (!row) continue;
        const tile = row[y];
        if (tile) {
          tile.type.render(term, x - screenBounds.x, y - screenBounds.y);
        }
      }
    }
  }
}
