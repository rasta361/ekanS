import Snake from './snake.js';
import Apple from './apple.js';
import GroundTile from './groundTile.js'
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
        this.gridSize = Math.round(((gameWidth + gameHeight) / 40) / 10) * 10;
        this.gamestate = GAMESTATE.MENU;
        this.gameObjects = [];
        this.groundTiles = [];
        
        this.snake = new Snake(this);
        this.snake.reset();
        this.apple = new Apple(this);
        new InputHandler(this, this.snake);
    }

    start() {
        if (this.gamestate !== GAMESTATE.MENU && this.gamestate !== GAMESTATE.GAMEOVER) return;

        for(let i=0; i<this.gameHeight/this.gridSize; i++) {    
            for(let j=0; j<this.gameWidth/this.gridSize; j++) {
                this.groundTiles.push(new GroundTile(this, {x: j * 40, y: i * 40}));
            }
        }

        this.lives = 1;
        this.points = 0;
        this.snake.reset();
        this.apple.reset();
        this.gameObjects = [this.snake, this.apple];
        this.gamestate = GAMESTATE.RUNNING;
        console.log('game start');
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

        // display points
        context.font = '20px Arial';
        context.fillStyle = 'white';
        context.textAlign = 'left';
        context.fillText('Points: ' + this.points, this.gameWidth - (this.gridSize * 3), this.gridSize);
        
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
            
            context.font = '20px Arial';
            context.fillStyle = 'white';
            context.textAlign = 'left';
            context.fillText('Points: ' + this.points, this.gameWidth - (this.gridSize * 3), this.gridSize);

			context.font = '40px Arial';
			context.fillStyle = 'white';
			context.textAlign = 'center';
            context.fillText('GAME OVER', this.gameWidth / 2, this.gameHeight / 2);
            
            context.font = '20px Arial';
			context.fillStyle = 'white';
			context.textAlign = 'center';
			context.fillText('Press SPACEBAR To Try Again', this.gameWidth / 2, this.gameHeight / 1.7);
		}
    }

    drawGround(context) {
        this.groundTiles.forEach(GroundTile => GroundTile.draw(context));
    }

    togglePause() {
        if (this.gamestate === GAMESTATE.PAUSED) this.gamestate = GAMESTATE.RUNNING;
        else this.gamestate = GAMESTATE.PAUSED;
    }

    // get random grid position within the game screen
    getRandomPos(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        this.temp1 = Math.floor(Math.random() * (max - min)) + min;

        if (Math.round(this.temp1 / (this.gridSize / 2)) === max / (this.gridSize / 2))
            Math.floor(this.temp1 / (this.gridSize / 2));
        else this.temp2 = Math.round(this.temp1 / (this.gridSize / 2));

        if (this.temp2 % 2 !== 0) this.getRandomPos(min, max);

        return this.temp2 * (this.gridSize / 2);
    }
}