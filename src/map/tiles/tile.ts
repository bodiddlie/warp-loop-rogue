import { Color, Colors, fromRgb, Terminal } from 'wglt';

type RenderFunc = (
  term: Terminal,
  x: number,
  y: number,
  tileType: TileType,
) => void;

export const genericRender: RenderFunc = (term, x, y, tileType) => {
  term.drawChar(x, y, tileType.char, tileType.fg, tileType.bg);
};

export class TileType {
  constructor(
    public char: string,
    public fg: Color,
    public bg: Color,
    public passable: boolean,
    public transparent: boolean,
    public info: string = '',
    public renderFunc: RenderFunc = genericRender,
  ) {}

  render(term: Terminal, x: number, y: number) {
    this.renderFunc(term, x, y, this);
  }
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

export function createFloorTile() {
  return new Tile(FLOOR_TYPE);
}

export function createWallTile() {
  return new Tile(WALL_TYPE);
}
