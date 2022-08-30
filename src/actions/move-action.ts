import { Action } from './action';
import { Entity } from '../entities/entity';
import { GameMap } from '../map/game-map';
import { Point } from '../util/point';
import { ImpossibleException } from '../exceptions';

export class MoveAction extends Action {
  constructor(public dx: number, public dy: number, public entity: Entity) {
    super();
  }
  perform(gameMap: GameMap) {
    const x = this.entity.position.x + this.dx;
    const y = this.entity.position.y + this.dy;
    const destination = new Point(x, y);
    if (!gameMap.isPointInBounds(destination)) {
      throw new ImpossibleException('That way is blocked');
    }
    if (!gameMap.tiles[x][y].walkable) {
      throw new ImpossibleException('That way is blocked');
    }

    this.entity.position.x += this.dx;
    this.entity.position.y += this.dy;
  }
}
