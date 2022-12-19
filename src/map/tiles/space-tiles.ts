import { Color, Colors, fromRgb } from 'wglt';
import { Glyph, Tile, TileType } from './tile';

const SPACE_TYPE = new TileType(
  [new Glyph(' ', fromRgb(50, 50, 50), Colors.BLACK)],
  0,
  true,
  true,
  'The void of space.'
);

export function createSpaceTile() {
  return new Tile(SPACE_TYPE);
}

const sunMap = new Map<Color, TileType>();

export function createSunTile(bg: Color) {
  let sunType = sunMap.get(bg);
  if (!sunType) {
    sunType = new TileType(
      [
        new Glyph(' ', Colors.BLACK, bg),
        new Glyph(' ', Colors.BLACK, bg),
        new Glyph(' ', Colors.BLACK, bg),
        new Glyph(' ', Colors.BLACK, bg),
        new Glyph(' ', Colors.BLACK, Colors.WHITE)
      ],
      Infinity,
      false,
      false,
      'A bright burning star.'
    );
    sunMap.set(bg, sunType);
  }
  return new Tile(sunType);
}

const STAR_TYPE = new TileType(
  [new Glyph('.', fromRgb(50, 50, 50), Colors.BLACK), new Glyph('.', fromRgb(255, 255, 255), Colors.BLACK)],
  Infinity,
  true,
  true,
  'A distant star.'
);

export function createStarTile() {
  return new Tile(STAR_TYPE);
}

const coronaMap = new Map<Color, TileType>();

export function createCoronaTile(bg: Color) {
  let coronaType = coronaMap.get(bg);
  if (!coronaType) {
    coronaType = new TileType(
      [
        new Glyph(' ', Colors.BLACK, bg),
      ],
      0,
      false,
      false,
      'A bright burning star.'
    );
    coronaMap.set(bg, coronaType);
  }
  return new Tile(coronaType);
}