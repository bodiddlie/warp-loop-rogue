import { RogueScreen } from './rogue-screen';
import { Colors, GUI, Terminal } from 'wglt';
import { GameMap } from './map/game-map';

export class GameScreen extends RogueScreen {
  map: GameMap;

  constructor(term: Terminal, gui: GUI) {
    super(term, gui);
    this.map = new GameMap(500, 500);
  }

  update(): RogueScreen {
    // this.term.fillRect(0, 0, 80, 45, 0, Colors.WHITE, Colors.BLACK);
    const moveKey = this.term.getMovementKey();

    if (moveKey) {
      this.map.cameraPosition.x += moveKey.x;
      this.map.cameraPosition.y += moveKey.y;
    }

    this.map.render(this.term);
    const { startX, startY } = this.map.getScreenBounds(this.term);
    this.term.drawChar(
      this.map.cameraPosition.x - startX,
      this.map.cameraPosition.y - startY,
      '@',
      Colors.LIGHT_RED,
    );
    return this;
  }
}
