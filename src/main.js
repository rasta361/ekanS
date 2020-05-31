import Game from './game.js';
import {drawFPS, drawGrid, logData} from './debug.js';

let canvas = document.getElementById('gameScreen');
let context = canvas.getContext('2d');

const GAME_WIDTH = 800;
const GAME_HEIGHT = 600;

context.canvas.width = GAME_WIDTH;
context.canvas.height = GAME_HEIGHT;

let lastTime = 0;

let game = new Game(GAME_WIDTH, GAME_HEIGHT);

function gameLoop(timestamp) {
    let deltaTime = timestamp - lastTime;
    lastTime = timestamp;
    
    context.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
    game.update(deltaTime);
    game.draw(context);
    drawFPS(context, deltaTime);
    //logData(game);
    //drawGrid(context, game);

    requestAnimationFrame(gameLoop);
}
requestAnimationFrame(gameLoop);