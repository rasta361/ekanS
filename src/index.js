import Game from './game.js';
import {drawFPS} from './debug.js';

let canvas = document.getElementById('gameScreen');
let context = canvas.getContext('2d');

const GAME_WIDTH = 800;
const GAME_HEIGHT = 600;

let game = new Game(GAME_WIDTH, GAME_HEIGHT);
game.start();

let lastTime = 0;

function gameLoop(timestamp) {
    let deltaTime = timestamp - lastTime;
    lastTime = timestamp;

    context.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

    game.update(deltaTime);
    game.draw(context);
    drawFPS(context, deltaTime);
    
    requestAnimationFrame(gameLoop);
}
requestAnimationFrame(gameLoop);