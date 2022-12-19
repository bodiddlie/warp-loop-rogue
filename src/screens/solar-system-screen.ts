import { RogueScreen } from './rogue-screen';
import { GameMap } from '../map/game-map';
import { Player } from '../entities/player';
import { BaseInputHandler } from '../input-handling/base-input-handler';
import { GUI, Terminal } from 'wglt';
import { Point } from '../util/point';
import { GameInputHandler } from '../input-handling/game-input-handler';
import { generateSolarSystem } from '../map/solar-system-generator';
import { MAP_HEIGHT, MAP_WIDTH } from '../constants';

export class SolarSystemScreen extends RogueScreen {
  map: GameMap;
  player: Player;
  inputHandler: BaseInputHandler;
  cameraPosition: Point;

  constructor(term: Terminal, gui: GUI) {
    super(term, gui);
    const tiles = generateSolarSystem(MAP_WIDTH, MAP_HEIGHT);
    this.map = new GameMap(MAP_WIDTH, MAP_HEIGHT, tiles);
    this.cameraPosition = new Point(term.width / 2, (term.height - 6) / 2);
    this.player = new Player(
      new Point(this.cameraPosition.x, this.cameraPosition.y),
    );

    this.inputHandler = new GameInputHandler(this.player);
  }

  update(deltaTime: number): RogueScreen {
    this.map.update(deltaTime);

    this.map.render(this.term, this.getScreenBounds());
    this.drawNamesUnderMouse();

    // Example of rendering text at the bottom of the screen
    // this.term.drawString(0, 40, 'Hello');
    // this.term.drawString(0, 41, 'Hello');
    // this.term.drawString(0, 42, 'Hello');
    // this.term.drawString(0, 43, 'Hello');
    // this.term.drawString(0, 44, 'Hello');
    return this;
  }

  drawNamesUnderMouse() {
    const MSG_WIDTH = 20;
    const MSG_HEIGHT = 5;
    const description = this.getNamesUnderMouse();
    if (!description) return;

    let lines = [description];
    if (description.length > MSG_WIDTH - 2) {
      const words = description.split(' ');
      let currentLine = '';
      lines = [];

      while (words.length > 0) {
        if ((currentLine + ' ' + words[0]).length > MSG_WIDTH - 2) {
          lines.push(currentLine);
          currentLine = '';
        } else {
          currentLine +=
            currentLine.length > 0 ? ' ' + words.shift() : words.shift();
        }
      }

      lines.push(currentLine);
    }

    this.term.drawSingleBox(60, 0, MSG_WIDTH, MSG_HEIGHT);
    for (let y = 0; y < lines.length; y++) {
      this.term.drawString(61, y + 1, lines[y]);
    }
  }

  getNamesUnderMouse(): string {
    const x = this.term.mouse.x;
    const y = this.term.mouse.y;

    if (!this.map.isPointInBounds(new Point(x, y))) {
      return '';
    }

    return this.map.tiles[x][y].type.info;
  }
}
