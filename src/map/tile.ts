import { Color, Colors, fromRgb } from 'wglt';

export class TileType {
  constructor(
    public char: string,
    public fg: Color,
    public bg: Color,
    public passable: boolean,
    public transparent: boolean,
    public info: string = '',
  ) {}
}

export class Tile {
  visible: boolean;
  seen: boolean;

  constructor(public type: TileType) {
    this.visible = false;
    this.seen = false;
  }
}

const FLOOR_TYPE = new TileType(
  '.',
  fromRgb(100, 100, 100),
  Colors.BLACK,
  true,
  true,
);
const WALL_TYPE = new TileType(
  '#',
  fromRgb(100, 100, 100),
  Colors.BLACK,
  false,
  false,
);
const SPACE_TYPE = new TileType(
  '.',
  fromRgb(50, 50, 50),
  Colors.BLACK,
  true,
  true,
  'The void of space.',
);
const BLUE_DWARF_TYPE = new TileType(
  ' ',
  Colors.BLACK,
  fromRgb(0, 0, 200),
  false,
  false,
  'A bright burning star.',
);

export function createSpaceTile() {
  return new Tile(SPACE_TYPE);
}

export function createSunTile() {
  return new Tile(BLUE_DWARF_TYPE);
}

export function createFloorTile() {
  return new Tile(FLOOR_TYPE);
}

export function createWallTile() {
  return new Tile(WALL_TYPE);
}
