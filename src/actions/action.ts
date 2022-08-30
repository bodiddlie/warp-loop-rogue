import { GameMap } from '../map/game-map';

export abstract class Action {
  abstract perform(gameMap: GameMap): void;
}
