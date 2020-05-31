import Snake from './snake.js';
import InputHandler from './input.js';

const GAMESTATE = {
    PAUSED: 0,
    RUNNING: 1,
    MENU: 2,
    GAMEOVER: 3,
    NEWLEVEL: 4
}

export default class Game {
    constructor(gameWidth, gameHeight) {
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
        this.gridSize = 20;
        this.gamestate = GAMESTATE.MENU;
        this.gameObjects = [];
        this.lives = 1;
        this.snake = new Snake(this);
        new InputHandler(this, this.snake);
    }

    start() {
        if (this.gamestate !== GAMESTATE.MENU) return;

        this.gameObjects = [this.snake];

        this.gamestate = GAMESTATE.RUNNING;
    }

    update(deltaTime) {
        if (this.lives === 0) this.gamestate = GAMESTATE.GAMEOVER;

        if (
            this.gamestate === GAMESTATE.PAUSED ||
            this.gamestate === GAMESTATE.MENU ||
            this.gamestate === GAMESTATE.GAMEOVER
        ) return;

        this.gameObjects.forEach(object => object.update(deltaTime));
    }

    draw(context) {
        this.gameObjects.forEach(object => object.draw(context));

        // draw paused screen
        if (this.gamestate === GAMESTATE.PAUSED) {
			context.rect(0, 0, this.gameWidth, this.gameHeight);
			context.fillStyle = 'rgba(0,0,0,0.5)';
			context.fill();

			context.font = '30px Arial';
			context.fillStyle = 'white';
			context.textAlign = 'center';
			context.fillText('Paused', this.gameWidth / 2, this.gameHeight / 2);
        }

        // draw menu screen
        if (this.gamestate === GAMESTATE.MENU) {
            context.rect(0, 0, this.gameWidth, this.gameHeight);
            context.fillStyle = 'rgba(0,0,0,1)';
            context.fill();

            context.font = '30px Arial';
            context.fillStyle = 'white';
            context.textAlign = 'center';
            context.fillText('Press SPACEBAR To Start', this.gameWidth / 2, this.gameHeight / 2);
        }
        
        // draw gameover screen
        if (this.gamestate === GAMESTATE.GAMEOVER) {
			context.rect(0, 0, this.gameWidth, this.gameHeight);
			context.fillStyle = 'rgba(0,0,0,1)';
			context.fill();

			context.font = '30px Arial';
			context.fillStyle = 'white';
			context.textAlign = 'center';
			context.fillText('GAME OVER', this.gameWidth / 2, this.gameHeight / 2);
		}
    }

    togglePause() {
        if (this.gamestate === GAMESTATE.PAUSED) this.gamestate = GAMESTATE.RUNNING;
        else this.gamestate = GAMESTATE.PAUSED;
    }
}