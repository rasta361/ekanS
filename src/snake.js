import { detectTailCollision, detectWallCollision } from "./collisionDetection.js";

export default class Snake {
    constructor(game) {
        this.game = game;
        this.width = game.gridSize;
        this.height = game.gridSize;

        this.maxSpeed = 10;
        this.fpsInterval = 1000 / this.maxSpeed;
        this.then = Date.now();
        this.startTime = this.then;
    }

    reset() {
        this.position = {x: this.game.gridSize, y: this.game.gameHeight - this.game.gridSize};
        this.speed = {x: this.width, y: 0};
        this.length = 2;
        this.tails = [];
    }

    moveLeft(){
        if (this.speed.x === this.width) return;
        else this.speed.x -= this.width;

        this.speed.y = 0;
    }

    moveRight(){
        if (this.speed.x === -this.width) return;
        else this.speed.x += this.width;

        this.speed.y = 0;
    }

    moveUp(){
        if (this.speed.y === this.width) return;
        else this.speed.y -= this.height;

        this.speed.x = 0;
    }

    moveDown(){
        if (this.speed.y === -this.width) return;
        else this.speed.y += this.height;

        this.speed.x = 0;
    }

    draw(context) {
        context.fillStyle='#459f30';
        context.fillRect(this.position.x, this.position.y, this.width, this.height);

        for(let i=0; i < this.tails.length; i++){
            context.fillRect(this.tails[i][0], this.tails[i][1], this.width, this.height);
        }
    }

    update(deltaTime) {
        // calc elapsed time since last loop
        this.now = Date.now();
        this.elapsed = this.now - this.then;

        // if enough time has elapsed, update the next frame
        if (this.elapsed > this.fpsInterval) {
            // add values of position to tails array
            if (this.tails.length < this.length) this.tails.push(Object.values(this.position));

            // each tail follows the one before
            for(let i = this.tails.length; i > 1; i--) {
                this.tails[i-1][0] = this.tails[i-2][0];
                this.tails[i-1][1] = this.tails[i-2][1];
            }

            // first tail follows the head
            if (this.tails != 0) {
                this.tails[0][0] = this.position.x;
                this.tails[0][1] = this.position.y;
            }

            // Get ready for next frame by setting then=now, but...
            // Also, adjust for fpsInterval not being multiple of 16.67
            this.then = this.now - (this.elapsed % this.fpsInterval);
            
            // update head position
            this.position.x += this.speed.x;
            this.position.y += this.speed.y;
        }

        if (detectTailCollision(this, this)) {
            this.game.lives--;
        }

        if (detectWallCollision(this.game, this)) {
            this.game.lives--;
        }
    }
}