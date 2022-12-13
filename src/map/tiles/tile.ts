import { Color, Colors, fromRgb, Terminal } from 'wglt';

type RenderFunc = (
  term: Terminal,
  x: number,
  y: number,
  tileType: TileType,
) => void;

type UpdateFunc = () => void;

export const genericRender: RenderFunc = (term, x, y, tileType) => {
  term.drawChar(
    x,
    y,
    tileType.glyph.char,
    tileType.glyph.fg,
    tileType.glyph.bg,
  );
};

export const genericUpdate: UpdateFunc = () => {};

export class Glyph {
  constructor(
    public char: string,
    public fg: Color,
    public bg: Color,
    public info: string = '',
  ) {}
}

export class TileType {
  constructor(
    public glyph: Glyph,
    public passable: boolean,
    public transparent: boolean,
    public renderFunc: RenderFunc = genericRender,
    public updateFunc: UpdateFunc = genericUpdate,
  ) {}

  render(term: Terminal, x: number, y: number) {
    this.renderFunc(term, x, y, this);
  }

  update() {
    this.updateFunc();
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
  new Glyph('.', fromRgb(100, 100, 100), Colors.BLACK),
  true,
  true,
);
const WALL_TYPE = new TileType(
  new Glyph('#', fromRgb(100, 100, 100), Colors.BLACK),
  false,
  false,
);

export function createFloorTile() {
  return new Tile(FLOOR_TYPE);
}

export function createWallTile() {
  return new Tile(WALL_TYPE);
}
