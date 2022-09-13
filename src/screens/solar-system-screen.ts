import { RogueScreen } from './rogue-screen';
import { GameMap } from '../map/game-map';
import { Player } from '../entities/player';
import { BaseInputHandler } from '../input-handling/base-input-handler';
import { GUI, Terminal } from 'wglt';
import { Point } from '../util/point';
import { GameInputHandler } from '../input-handling/game-input-handler';
import { generateSolarSystem } from '../map/solar-system-generator';

export class SolarSystemScreen extends RogueScreen {
  map: GameMap;
  player: Player;
  inputHandler: BaseInputHandler;
  cameraPosition: Point;

  constructor(term: Terminal, gui: GUI) {
    super(term, gui);
    const tiles = generateSolarSystem(term.width, term.height);
    this.map = new GameMap(term.width, term.height, tiles);
    this.cameraPosition = new Point(term.width / 2, term.height / 2);
    this.player = new Player(
      new Point(this.cameraPosition.x, this.cameraPosition.y),
    );

    this.inputHandler = new GameInputHandler(this.player);
  }

  update(): RogueScreen {
    this.map.render(this.term, this.getScreenBounds());
    return this;
  }
}
