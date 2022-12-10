import { Color, Colors, fromRgb } from 'wglt';
import { genericRender, Tile, TileType } from './tile';

const SPACE_TYPE = new TileType(
  ' ',
  fromRgb(50, 50, 50),
  Colors.BLACK,
  true,
  true,
  'The void of space.',
  (term, x, y, tileType) => {
    if (Math.random() < 0.00001) {
      term.drawChar(x, y, '.', Colors.WHITE, Colors.BLACK);
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
    ' ',
    Colors.BLACK,
    bg,
    false,
    false,
    'A bright burning star.',
    (term, x, y, tileType) => {
      if (Math.random() > 0.985) {
        term.drawChar(x, y, tileType.char, Colors.WHITE, Colors.WHITE);
      } else {
        genericRender(term, x, y, tileType);
      }
    },
  );
  return new Tile(sunType);
}
