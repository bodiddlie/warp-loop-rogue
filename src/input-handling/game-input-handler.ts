import { BaseInputHandler } from './base-input-handler';
import { NoOpAction } from '../actions/noop-action';
import { Action } from '../actions/action';
import { Terminal } from 'wglt';
import { MoveAction } from '../actions/move-action';
import { Player } from '../entities/player';

export class GameInputHandler extends BaseInputHandler {
  constructor(public player: Player) {
    super();
  }

  handleInput(term: Terminal): Action | BaseInputHandler {
    const moveKey = term.getMovementKey();
    if (moveKey) {
      return new MoveAction(moveKey.x, moveKey.y, this.player);
    }
    return new NoOpAction();
  }
}
