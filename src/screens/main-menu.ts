import { RogueScreen } from './rogue-screen';
import { GUI, SelectDialog, Terminal } from 'wglt';
import { GameScreen } from './game-screen';
import { Point } from '../util/point';

const OPTIONS = ['New Game', 'Continue Saved Game'];

export class MainMenu extends RogueScreen {
  nextScreen: RogueScreen;
  cameraPosition: Point;

  constructor(term: Terminal, gui: GUI) {
    super(term, gui);
    this.nextScreen = this;
    this.cameraPosition = new Point(term.width / 2, (term.height - 6) / 2);
  }

  update(): RogueScreen {
    if (this.gui.dialogs.length === 0) {
      this.gui.add(
        new SelectDialog('MAIN MENU', OPTIONS, (choice) => {
          if (choice === 0) {
            this.nextScreen = new GameScreen(this.term, this.gui);
          } else if (choice === 1) {
            console.log('Continue');
          }
        }),
      );
    }

    this.gui.handleInput();

    this.term.clear();
    this.gui.draw();

    return this.nextScreen;
  }
}
