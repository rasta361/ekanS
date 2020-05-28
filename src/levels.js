
export function drawGrid(game, context) {
    context.fillStyle = '#000';
    context.lineWidth = 1;
    
    let gridSize = 20;

    // draw vertical lines
    for(let i=0; i<game.gameWidth/gridSize; i++) {
        context.moveTo(i * gridSize, 0);
        context.lineTo(i * gridSize, game.gameHeight)
    }
    // draw horizontal lines
    for(let i=0; i<game.gameHeight/gridSize; i++) {
        context.moveTo(0, i * gridSize);
        context.lineTo(game.gameWidth, i * gridSize)
    }
    
    context.closePath();
    context.stroke();
    
}