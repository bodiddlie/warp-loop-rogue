import { RogueScreen } from './rogue-screen';
import { GUI, Terminal } from 'wglt';
import { GameMap } from './map/game-map';
import { Player } from './entities/player';
import { Point } from './util/point';
import { Action } from './actions/action';
import { BaseInputHandler } from './input-handling/base-input-handler';
import { GameInputHandler } from './input-handling/game-input-handler';
import { ImpossibleException } from './exceptions';

export class GameScreen extends RogueScreen {
  map: GameMap;
  player: Player;
  inputHandler: BaseInputHandler;

  constructor(term: Terminal, gui: GUI) {
    super(term, gui);
    this.map = new GameMap(500, 500);
    this.player = new Player(
      new Point(this.map.cameraPosition.x, this.map.cameraPosition.y),
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

    this.map.cameraPosition = this.player.position;

    this.map.render(this.term);
    this.player.render(this.term, this.map.getScreenBounds(this.term));
    return this;
  }
}
