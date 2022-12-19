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

export function createSunTile(bg: Color) {
  const sunType = new TileType(
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
  return new Tile(sunType);
}

const STAR_TYPE = new TileType(
  [new Glyph('*', fromRgb(50, 50, 50), Colors.BLACK), new Glyph('*', fromRgb(255, 255, 255), Colors.BLACK)],
  Infinity,
  true,
  true,
  'A distant star.'
);

export function createStarTile() {
  return new Tile(STAR_TYPE);
}