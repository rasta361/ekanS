import {detectCollision, detectTailCollision} from './collisionDetection.js';

export default class Apple {
    constructor(game) {
        this.game = game;
        this.width = game.gridSize;
        this.height = game.gridSize;

        this.image = new Image();
        this.image.src = '/assets/art/apple.png'

        this.position = {x: 0, y: 0};
        
    }

    reset() {
        this.position = {
            x: this.game.getRandomPos(0, this.game.gameWidth),
            y: this.game.getRandomPos(0, this.game.gameHeight)
        };
    }

    draw(context) {
        // context.fillStyle='#9f2020';
        // context.fillRect(this.position.x, this.position.y, this.width, this.height);
        context.drawImage(this.image, this.position.x, this.position.y, this.game.gridSize, this.game.gridSize);
        
    }

    update() {
        // collision detection
        if (detectCollision(this.game.snake, this)) {
            this.game.snake.length++;
            this.game.points++;
            this.reset();
        }

        if (detectTailCollision(this.game.snake, this)) this.reset();
    }

    
}