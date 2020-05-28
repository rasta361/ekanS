import {drawGrid} from "./levels.js";

export default class Game {
    constructor(gameWidth, gameHeight) {
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;

        
    }

    update(deltaTime) {

    }

    draw(context) {
        drawGrid(this, context);
    }
}