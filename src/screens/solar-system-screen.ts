import { RogueScreen } from './rogue-screen';
import { GameMap } from '../map/game-map';
import { Player } from '../entities/player';
import { BaseInputHandler } from '../input-handling/base-input-handler';
import { GUI, Terminal } from 'wglt';
import { Point } from '../util/point';
import { GameInputHandler } from '../input-handling/game-input-handler';
import { generateSolarSystem } from '../map/solar-system-generator';
import { MAP_HEIGHT, MAP_WIDTH } from '../constants';

export class SolarSystemScreen extends RogueScreen {
  map: GameMap;
  player: Player;
  inputHandler: BaseInputHandler;
  cameraPosition: Point;

  constructor(term: Terminal, gui: GUI) {
    super(term, gui);
    const tiles = generateSolarSystem(MAP_WIDTH, MAP_HEIGHT);
    this.map = new GameMap(MAP_WIDTH, MAP_HEIGHT, tiles);
    this.cameraPosition = new Point(term.width / 2, (term.height - 6) / 2);
    this.player = new Player(
      new Point(this.cameraPosition.x, this.cameraPosition.y),
    );

    this.inputHandler = new GameInputHandler(this.player);
  }

  update(): RogueScreen {
    this.map.render(this.term, this.getScreenBounds());
    this.term.drawSingleBox(60, 0, 20, 10);
    this.term.drawString(61, 1, this.getNamesUnderMouse());
    this.term.drawString(0, 40, 'Hello');
    this.term.drawString(0, 41, 'Hello');
    this.term.drawString(0, 42, 'Hello');
    this.term.drawString(0, 43, 'Hello');
    this.term.drawString(0, 44, 'Hello');
    return this;
  }

  getNamesUnderMouse(): string {
    const x = this.term.mouse.x;
    const y = this.term.mouse.y;

    if (!this.map.isPointInBounds(new Point(x, y))) {
      return '';
    }

    return this.map.tiles[x][y].info;
  }
}
