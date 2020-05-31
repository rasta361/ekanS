export function drawFPS(context, deltaTime) {
    // calculate fps
    let fps = Math.round(1 / (deltaTime / 1000));

    // draw number to screen
    context.fillStyle='white';
    context.textAlign = 'left';
    context.font='10px sans-serif';
    context.fillText('FPS: ' + fps, 10, 30);
}

export function drawGrid(context, game) {
    context.fillStyle = '#000';
    context.lineWidth = 1;
    // draw vertical lines
    for(let i=0; i<game.gameWidth/game.gridSize; i++) {
        context.moveTo(i * game.gridSize, 0);
        context.lineTo(i * game.gridSize, game.gameHeight)
    }
    // draw horizontal lines
    for(let i=0; i<game.gameHeight/game.gridSize; i++) {
        context.moveTo(0, i * game.gridSize);
        context.lineTo(game.gameWidth, i * game.gridSize)
    }
    context.closePath();
    context.stroke();
}