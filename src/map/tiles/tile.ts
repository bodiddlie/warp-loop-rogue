import {Color, Colors, fromRgb, RNG, Terminal} from 'wglt';

const rng = new RNG();

export class Glyph {
  constructor(
    public char: string | number,
    public fg: Color,
    public bg: Color,
  ) {}
}

export class TileType {
  constructor(
    public frames: Glyph[],
    public frameTime:number,
    public passable: boolean,
    public transparent: boolean,
    public info: string = '',
  ) {
  }
}

export class Tile {
  visible: boolean;
  seen: boolean;
  currentFrameIndex: number;
  timeSinceLastFrame: number;
  frameTime: number;

  constructor(public type: TileType) {
    this.visible = false;
    this.seen = false;
    this.currentFrameIndex = 0;
    this.timeSinceLastFrame = 0;
    if (this.type.frameTime === Infinity) {
      this.frameTime = rng.nextRange(500, 10000);
    } else {
      this.frameTime = this.type.frameTime;
    }
  }

  update(deltaTime: number) {
    this.timeSinceLastFrame += deltaTime;
    if (this.timeSinceLastFrame > this.frameTime) {
      if (this.type.frames.length > 1){
        this.currentFrameIndex = (this.currentFrameIndex + 1) % this.type.frames.length;
      }
      this.timeSinceLastFrame = 0;
    }
  }

  render(term: Terminal, x: number, y:number) {
    const glyph = this.type.frames[this.currentFrameIndex];
    term.drawChar(x, y, glyph.char, glyph.fg, glyph.bg);
  }
}

const FLOOR_TYPE = new TileType(
  [new Glyph('.', fromRgb(100, 100, 100), Colors.BLACK)],
  0,
  true,
  true,
);
const WALL_TYPE = new TileType(
  [new Glyph('#', fromRgb(100, 100, 100), Colors.BLACK)],
  0,
  false,
  false,
);

export function createFloorTile() {
  return new Tile(FLOOR_TYPE);
}

export function createWallTile() {
  return new Tile(WALL_TYPE);
}
