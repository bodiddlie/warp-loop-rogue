import { RogueScreen } from './rogue-screen';
import { Colors, GUI, Terminal } from 'wglt';
import { GameMap } from './map/game-map';

export class GameScreen extends RogueScreen {
  map: GameMap;
  constructor(term: Terminal, gui: GUI) {
    super(term, gui);
    this.map = new GameMap(80, 40);
  }

  update(): RogueScreen {
    // this.term.fillRect(0, 0, 80, 45, 0, Colors.WHITE, Colors.BLACK);
    this.map.render(this.term);
    this.term.drawChar(10, 10, '@', Colors.LIGHT_RED);
    return this;
  }
}
