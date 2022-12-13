import { Color, Colors, fromRgb } from 'wglt';
import { genericRender, Glyph, Tile, TileType } from './tile';

const SPACE_TYPE = new TileType(
  new Glyph(' ', fromRgb(50, 50, 50), Colors.BLACK, 'The void of space.'),
  true,
  true,
  (term, x, y, tileType) => {
    if (Math.random() < 0.00001) {
      term.drawChar(x, y, '*', Colors.WHITE, Colors.BLACK);
    } else {
      genericRender(term, x, y, tileType);
    }
  },
);

export function createSpaceTile() {
  return new Tile(SPACE_TYPE);
}

export function createSunTile(bg: Color) {
  const sunType = new TileType(
    new Glyph(' ', Colors.BLACK, bg, 'A bright burning star.'),
    false,
    false,
    (term, x, y, tileType) => {
      if (Math.random() > 0.985) {
        term.drawChar(x, y, tileType.glyph.char, Colors.WHITE, Colors.WHITE);
      } else {
        genericRender(term, x, y, tileType);
      }
    },
  );
  return new Tile(sunType);
}
