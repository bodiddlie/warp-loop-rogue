import { GUI, Terminal } from 'wglt';
import { RogueScreen } from './rogue-screen';
import { MainMenu } from './main-menu';

export class Engine {
  term: Terminal;
  gui: GUI;
  screen: RogueScreen;

  constructor() {
    this.term = new Terminal(
      document.querySelector('canvas') as HTMLCanvasElement,
      80,
      45,
      {
        maxFps: 20,
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

    this.gui = new GUI(this.term);

    this.screen = new MainMenu(this.term, this.gui);

    this.term.update = () => {
      const screen = this.screen.update();
      if (!Object.is(screen, this.screen)) {
        this.screen = screen;
      }
    };
  }
}
