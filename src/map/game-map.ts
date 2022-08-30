import { createFloorTile, createWallTile, Tile } from './tile';
import { RNG, Terminal } from 'wglt';
import { Point } from '../util/point';
import { Rectangle } from '../util/rectangle';

const chanceToStartAlive = 0.4;
const deathLimit = 3;
const birthLimit = 4;
const numberOfSteps = 3;

export class GameMap {
  tiles: Tile[][];
  cameraPosition: Point;

  constructor(public width: number, public height: number) {
    this.tiles = new Array<Tile[]>(this.width);
    this.initializeMap();

    const rng = new RNG();
    let startX = rng.nextRange(0, 500);
    let startY = rng.nextRange(0, 500);

    while (!this.tiles[startX][startY].walkable) {
      startX = rng.nextRange(0, 500);
      startY = rng.nextRange(0, 500);
    }

    this.cameraPosition = new Point(startX, startY);
  }

  initializeMap() {
    let map = new Array<boolean[]>(this.width);
    for (let x = 0; x < this.width; x++) {
      map[x] = new Array<boolean>(this.height);
      for (let y = 0; y < this.height; y++) {
        map[x][y] = Math.random() < chanceToStartAlive;
      }
    }

    for (let i = 0; i < numberOfSteps; i++) {
      map = this.simulate(map);
    }

    for (let x = 0; x < this.width; x++) {
      this.tiles[x] = new Array<Tile>(this.height);
      for (let y = 0; y < this.height; y++) {
        this.tiles[x][y] = map[x][y] ? createWallTile() : createFloorTile();
      }
    }
  }

  private simulate(map: boolean[][]): boolean[][] {
    const newMap = new Array<boolean[]>(map.length);
    for (let i = 0; i < map.length; i++) {
      newMap[i] = new Array<boolean>(map[0].length);
    }

    for (let x = 0; x < map.length; x++) {
      for (let y = 0; y < map[x].length; y++) {
        const neighbors = this.countAliveNeighbors(map, x, y);
        if (map[x][y]) {
          newMap[x][y] = neighbors >= deathLimit;
        } else {
          newMap[x][y] = neighbors > birthLimit;
        }
      }
    }
    return newMap;
  }

  private countAliveNeighbors(map: boolean[][], x: number, y: number): number {
    let neighbors = 0;
    for (let i = -1; i < 2; i++) {
      for (let j = -1; j < 2; j++) {
        const nX = x + i;
        const nY = y + j;
        if (i === 0 && j === 0) {
        } else if (
          nX < 0 ||
          nY < 0 ||
          nX >= map.length ||
          nY >= map[0].length
        ) {
          neighbors++;
        } else if (map[nX][nY]) {
          neighbors++;
        }
      }
    }
    return neighbors;
  }

  getScreenBounds(term: Terminal): Rectangle {
    const halfHeight = Math.floor(term.height / 2);
    const halfWidth = Math.floor(term.width / 2);
    const startY = this.cameraPosition.y - halfHeight;
    const startX = this.cameraPosition.x - halfWidth;
    return new Rectangle(startX, startY, term.width, term.height);
  }

  isPointInBounds(point: Point): boolean {
    return (
      0 <= point.x &&
      point.x < this.width &&
      0 <= point.y &&
      point.y < this.height
    );
  }

  render(term: Terminal) {
    const rectangle = this.getScreenBounds(term);
    for (let y = rectangle.y; y <= rectangle.y + term.height; y++) {
      for (let x = rectangle.x; x <= rectangle.x + term.width; x++) {
        const row = this.tiles[x];
        if (!row) continue;
        const tile = row[y];
        if (tile) {
          term.drawChar(
            x - rectangle.x,
            y - rectangle.y,
            tile.glyph.light.char,
            tile.glyph.light.fg,
            tile.glyph.light.bg,
          );
        }
      }
    }
  }
}
