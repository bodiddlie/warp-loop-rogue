import { Entity } from './entity';
import { Point } from '../util/point';
import { Colors, fromRgb } from 'wglt';

const graphic = { char: '@', fg: fromRgb(255, 0, 0), bg: Colors.BLACK };

export class Player extends Entity {
  constructor(position: Point) {
    super(position, graphic);
  }
}
