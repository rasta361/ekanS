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
}