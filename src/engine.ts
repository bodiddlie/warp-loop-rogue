import { GUI, Terminal } from 'wglt';
import { RogueScreen } from './screens/rogue-screen';
// import { MainMenu } from './main-menu';
// import { GameScreen } from './screens/game-screen';
import { SolarSystemScreen } from './screens/solar-system-screen';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from './constants';

export class Engine {
  term: Terminal;
  gui: GUI;
  screen: RogueScreen;
  lastFrameTime: number;

  constructor() {
    this.term = new Terminal(
      document.querySelector('canvas') as HTMLCanvasElement,
      SCREEN_WIDTH,
      SCREEN_HEIGHT,
      {
        maxFps: 10,
        crt: {
          scale: 6,
          blur: 0.5,
          curvature: 0.05,
          chroma: 0.5,
          vignette: 0.05,
          scanlineWidth: 0.85,
          scanlineIntensity: 0.15,
        },
      },
    );

    this.lastFrameTime = performance.now();
    this.gui = new GUI(this.term);

    // this.screen = new MainMenu(this.term, this.gui);
    // this.screen = new GameScreen(this.term, this.gui);
    this.screen = new SolarSystemScreen(this.term, this.gui);

    this.term.update = () => {
      const now = performance.now();
      const delta = now - this.lastFrameTime;
      this.lastFrameTime = now;
      this.term.clear();
      const screen = this.screen.update(delta);
      if (!Object.is(screen, this.screen)) {
        this.screen = screen;
      }
    };
  }
}
