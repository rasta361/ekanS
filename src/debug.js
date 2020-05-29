export function drawFPS(context, deltaTime) {
    // calculate fps
    let fps = Math.round(1 / (deltaTime / 1000));

    // draw number to screen
    context.fillStyle='white';
    context.font='10px sans-serif';
    context.fillText('FPS: ' + fps, 10, 30);
}