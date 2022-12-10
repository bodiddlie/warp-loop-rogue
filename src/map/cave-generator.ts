import { createFloorTile, createWallTile, Tile } from './tiles/tile';

const CHANCE_TO_START_ALIVE = 0.4;
const DEATH_LIMIT = 3;
const BIRTH_LIMIT = 4;
const NUMBER_OF_STEPS = 3;

export function generateCaves(width: number, height: number): Tile[][] {
  const tiles = new Array<Tile[]>(width);

  let map = new Array<boolean[]>(width);
  for (let x = 0; x < width; x++) {
    map[x] = new Array<boolean>(height);
    for (let y = 0; y < height; y++) {
      map[x][y] = Math.random() < CHANCE_TO_START_ALIVE;
    }
  }

  for (let i = 0; i < NUMBER_OF_STEPS; i++) {
    map = simulate(map);
  }

  for (let x = 0; x < width; x++) {
    tiles[x] = new Array<Tile>(height);
    for (let y = 0; y < height; y++) {
      tiles[x][y] = map[x][y] ? createWallTile() : createFloorTile();
    }
  }

  return tiles;
}

function simulate(map: boolean[][]): boolean[][] {
  const newMap = new Array<boolean[]>(map.length);
  for (let i = 0; i < map.length; i++) {
    newMap[i] = new Array<boolean>(map[0].length);
  }

  for (let x = 0; x < map.length; x++) {
    for (let y = 0; y < map[x].length; y++) {
      const neighbors = countAliveNeighbors(map, x, y);
      if (map[x][y]) {
        newMap[x][y] = neighbors >= DEATH_LIMIT;
      } else {
        newMap[x][y] = neighbors > BIRTH_LIMIT;
      }
    }
  }
  return newMap;
}

function countAliveNeighbors(map: boolean[][], x: number, y: number): number {
  let neighbors = 0;
  for (let i = -1; i < 2; i++) {
    for (let j = -1; j < 2; j++) {
      const nX = x + i;
      const nY = y + j;
      if (i === 0 && j === 0) {
      } else if (nX < 0 || nY < 0 || nX >= map.length || nY >= map[0].length) {
        neighbors++;
      } else if (map[nX][nY]) {
        neighbors++;
      }
    }
  }
  return neighbors;
}
