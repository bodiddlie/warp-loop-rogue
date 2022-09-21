import { createSpaceTile, createSunTile, Tile } from './tile';
import { fromRgb } from 'wglt';

const STAR_RADIUS = 4;
const BlueColor = fromRgb(0, 0, 200);
const RedColor = fromRgb(200, 0, 0);
const YellowColor = fromRgb(200, 200, 0);

export function generateSolarSystem(width: number, height: number): Tile[][] {
  const tiles = new Array<Tile[]>(width);

  const centerX = Math.floor(width / 2);
  const centerY = Math.floor(height / 2);

  for (let x = 0; x < width; x++) {
    tiles[x] = new Array<Tile>(height);
    for (let y = 0; y < height; y++) {
      tiles[x][y] = createSpaceTile();
    }
  }

  const star = createStar(STAR_RADIUS);
  for (let x = 0; x < star.length; x++) {
    for (let y = 0; y < star[x].length; y++) {
      tiles[x + centerX - STAR_RADIUS][y + centerY - STAR_RADIUS] = star[x][y];
    }
  }
  return tiles;
}

function createStar(radius: number): Tile[][] {
  const tiles = new Array<Tile[]>(radius * 2);

  for (let x = 0; x <= radius * 2; x++) {
    tiles[x] = new Array<Tile>(radius * 2);
    for (let y = 0; y <= radius * 2; y++) {
      if ((x - radius) ** 2 + (y - radius) ** 2 <= radius ** 2) {
        tiles[x][y] = createSunTile(BlueColor);
      } else {
        tiles[x][y] = createSpaceTile();
      }
    }
  }

  return tiles;
}
