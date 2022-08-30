import { Action } from '../actions/action';
import { Terminal } from 'wglt';

export abstract class BaseInputHandler {
  protected constructor() {}

  abstract handleInput(term: Terminal): Action | BaseInputHandler;
}
