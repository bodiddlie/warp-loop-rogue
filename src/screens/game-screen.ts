import { RogueScreen } from './rogue-screen';
import { GUI, RNG, Terminal } from 'wglt';
import { GameMap } from '../map/game-map';
import { Player } from '../entities/player';
import { Point } from '../util/point';
import { Action } from '../actions/action';
import { BaseInputHandler } from '../input-handling/base-input-handler';
import { GameInputHandler } from '../input-handling/game-input-handler';
import { ImpossibleException } from '../exceptions';
import { generateCaves } from '../map/cave-generator';

const WIDTH = 500;
const HEIGHT = 500;

export class GameScreen extends RogueScreen {
  map: GameMap;
  player: Player;
  inputHandler: BaseInputHandler;
  cameraPosition: Point;

  constructor(term: Terminal, gui: GUI) {
    super(term, gui);
    const tiles = generateCaves(WIDTH, HEIGHT);
    this.map = new GameMap(WIDTH, HEIGHT, tiles);

    const rng = new RNG();
    let startX = rng.nextRange(0, WIDTH);
    let startY = rng.nextRange(0, HEIGHT);

    while (!this.map.tiles[startX][startY].walkable) {
      startX = rng.nextRange(0, WIDTH);
      startY = rng.nextRange(0, HEIGHT);
    }

    this.cameraPosition = new Point(startX, startY);
    this.player = new Player(
      new Point(this.cameraPosition.x, this.cameraPosition.y),
    );

    this.inputHandler = new GameInputHandler(this.player);
  }

  update(): RogueScreen {
    try {
      const action = this.inputHandler.handleInput(this.term);
      if (action instanceof Action) {
        action.perform(this.map);
      }
    } catch (error) {
      if (error instanceof ImpossibleException) {
        // TODO: add message log
      }
    }

    this.cameraPosition = this.player.position;

    this.map.render(this.term, this.getScreenBounds());
    this.player.render(this.term, this.getScreenBounds());
    return this;
  }
}
