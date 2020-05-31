import {detectCollision, detectTailCollision} from './collisionDetection.js';

export default class Apple {
    constructor(game) {
        this.game = game;
        this.width = game.gridSize;
        this.height = game.gridSize;

        this.position = {x: 0, y: 0};
        
    }

    reset() {
        this.position = {
            x: this.game.getRandomPos(this.game.gridSize, this.game.gameWidth),
            y: this.game.getRandomPos(this.game.gridSize, this.game.gameHeight)
        };
    }

    draw(context) {
        context.fillStyle='#9f2020';
        context.fillRect(this.position.x, this.position.y, this.width, this.height);
    }

    update() {
        console.log('apple pos: ' + this.position.x + ' ' + this.position.y);

        // collision detection
        if (detectCollision(this.game.snake, this)) {
            this.game.snake.length++;
            this.reset();
        }

        if (detectTailCollision(this.game.snake, this)) this.reset();
    }

    
}