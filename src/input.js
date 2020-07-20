

export default class InputHandler {
    constructor(game, snake) {
        document.addEventListener('keydown', (event) => {
            switch (event.keyCode) {
                case 37:
                    if (snake.speed.x >= 0) snake.moveLeft();
                    break;

                case 39:
                    if (snake.speed.x <= 0) snake.moveRight();
                    break;

                case 38:
                    if (snake.speed.y >= 0) snake.moveUp();
                    break;

                case 40:
                    if (snake.speed.y <= 0) snake.moveDown();
                    break;

                case 27:
                    game.togglePause();
                    break;

                case 32:
                    game.start();
                    break;
            }
        });
    }
}