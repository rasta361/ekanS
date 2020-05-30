import Game from './game.js';
import {drawFPS, drawGrid} from './debug.js';

let canvas = document.getElementById('gameScreen');
let context = canvas.getContext('2d');

const GAME_WIDTH = 800;
const GAME_HEIGHT = 600;

// variables needed to control fps
let fps, fpsInterval, startTime, now, then, elapsed;
let lastTime = 0;

let game = new Game(GAME_WIDTH, GAME_HEIGHT);
game.start();

startLoop(10);


////// FUNCTIONS //////

function startLoop(fps) {
    fpsInterval = 1000 / fps;
    then = Date.now();
    startTime = then;
    //console.log(startTime);
    gameLoop();
}

function gameLoop(timestamp) {
    let deltaTime = timestamp - lastTime;
    lastTime = timestamp;
    
    requestAnimationFrame(gameLoop);

    // calc elapsed time since last loop
    now = Date.now();
    elapsed = now - then;

    // if enough time has elapsed, draw the next frame
    if (elapsed > fpsInterval) {

        // Get ready for next frame by setting then=now, but...
        // Also, adjust for fpsInterval not being multiple of 16.67
        then = now - (elapsed % fpsInterval);

        // draw stuff here
        context.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
        game.update(deltaTime);
        game.draw(context);
        drawFPS(context, elapsed);
    }
    
}
//requestAnimationFrame(gameLoop);