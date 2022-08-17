import { createWallTile, Tile } from './tile';
import { Terminal } from 'wglt';

export class GameMap {
  tiles: Tile[][];
  constructor(public width: number, public height: number) {
    this.tiles = new Array<Tile[]>(this.height);
    for (let y = 0; y < this.height; y++) {
      this.tiles[y] = new Array<Tile>(this.width);
      for (let x = 0; x < this.width; x++) {
        this.tiles[y][x] = createWallTile();
      }
    }
  }

  render(term: Terminal) {
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        const tile = this.tiles[y][x];
        term.drawChar(
          x,
          y,
          tile.glyph.light.char,
          tile.glyph.light.fg,
          tile.glyph.light.bg,
        );
      }
    }
  }
}
