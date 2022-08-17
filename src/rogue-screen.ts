import { GUI, Terminal } from 'wglt';

export abstract class RogueScreen {
  protected constructor(public term: Terminal, public gui: GUI) {}

  abstract update(): RogueScreen;
}
