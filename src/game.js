//import {drawGrid} from "./levels.js";
import Snake from './snake.js';
import InputHandler from './input.js';

export default class Game {
    constructor(gameWidth, gameHeight) {
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
        this.gridSize = 20;

        this.gameObjects = [];

        this.snake = new Snake(this);

        new InputHandler(this, this.snake);
    }

    start(context) {
        this.gameObjects = [this.snake];
    }

    update(deltaTime) {
        this.gameObjects.forEach(object => object.update(deltaTime));
    }

    draw(context) {
        //this.drawGrid(context);
        this.gameObjects.forEach(object => object.draw(context));
    }

    drawGrid(context) {
        context.fillStyle = '#000';
        context.lineWidth = 1;
        // draw vertical lines
        for(let i=0; i<this.gameWidth/this.gridSize; i++) {
            context.moveTo(i * this.gridSize, 0);
            context.lineTo(i * this.gridSize, this.gameHeight)
        }
        // draw horizontal lines
        for(let i=0; i<this.gameHeight/this.gridSize; i++) {
            context.moveTo(0, i * this.gridSize);
            context.lineTo(this.gameWidth, i * this.gridSize)
        }
        context.closePath();
        context.stroke();
    }
}