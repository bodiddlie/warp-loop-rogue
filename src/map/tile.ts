import { Color, Colors, fromRgb } from 'wglt';

export type Graphic = {
  char: string;
  fg: Color;
  bg: Color;
};

export type Glyph = {
  dark: Graphic;
  light: Graphic;
};

const FLOOR_GLYPH: Glyph = {
  dark: { char: '.', fg: fromRgb(100, 100, 100), bg: Colors.BLACK },
  light: { char: '.', fg: fromRgb(200, 200, 200), bg: Colors.BLACK },
};

const WALL_GLYPH: Glyph = {
  dark: { char: '#', fg: fromRgb(100, 100, 100), bg: Colors.BLACK },
  light: { char: '#', fg: fromRgb(200, 200, 200), bg: Colors.BLACK },
};

const SPACE_GLYPH: Glyph = {
  dark: { char: '.', fg: fromRgb(50, 50, 50), bg: Colors.BLACK },
  light: { char: '.', fg: fromRgb(50, 50, 50), bg: Colors.BLACK },
};

const SUN_GLYPH: Glyph = {
  dark: { char: ' ', fg: Colors.BLACK, bg: Colors.ORANGE },
  light: { char: ' ', fg: Colors.BLACK, bg: Colors.ORANGE },
};

export class Tile {
  visible: boolean;
  seen: boolean;
  constructor(
    public glyph: Glyph,
    public walkable: boolean,
    public transparent: boolean,
  ) {
    this.visible = false;
    this.seen = false;
  }
}

export function createFloorTile() {
  return new Tile(FLOOR_GLYPH, true, true);
}

export function createWallTile() {
  return new Tile(WALL_GLYPH, false, false);
}

export function createSpaceTile() {
  return new Tile(SPACE_GLYPH, true, true);
}

export function createSunTile() {
  return new Tile(SUN_GLYPH, true, false);
}
