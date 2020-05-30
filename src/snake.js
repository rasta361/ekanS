export default class Snake {
    constructor(game) {
        this.width = game.gridSize;
        this.height = game.gridSize;

        this.maxSpeed = 10;
        this.speed = {x: 0, y: 0};

        this.position = {x: game.gameWidth / 2, y: game.gameHeight / 2};

        // variables needed to control fps
        this.fpsInterval = 1000 / this.maxSpeed;
        this.then = Date.now();
        this.startTime = this.then;
    }

    moveLeft(){
        //this.position.x -= this.speed.x;
        //this.speed.x -= this.width;
        if (this.speed.x === this.width)
            this.speed.x -= this.width * 2;
        else this.speed.x -= this.width;

        this.speed.y = 0;
    }

    moveRight(){
        //this.position.x += this.speed.x;
        if (this.speed.x === -this.width)
            this.speed.x += this.width * 2;
        else this.speed.x += this.width;

        this.speed.y = 0;
    }

    moveUp(){
        //this.position.y -= this.speed.y;
        if (this.speed.y === this.width)
        this.speed.y -= this.height * 2;
        else this.speed.y -= this.height;

        this.speed.x = 0;
    }

    moveDown(){
        //this.position.y += this.speed.y;
        if (this.speed.y === -this.width)
            this.speed.y += this.height * 2;
        else this.speed.y += this.height;

        this.speed.x = 0;
    }

    stop(){
        this.speed = {x: 0, y:0};
    }

    draw(context) {
        context.fillStyle='#459f30';
        context.fillRect(this.position.x, this.position.y, this.width, this.height);
    }

    update(deltaTime) {
        // calc elapsed time since last loop
        this.now = Date.now();
        this.elapsed = this.now - this.then;

        // if enough time has elapsed, draw the next frame
        if (this.elapsed > this.fpsInterval) {
            // Get ready for next frame by setting then=now, but...
            // Also, adjust for fpsInterval not being multiple of 16.67
            this.then = this.now - (this.elapsed % this.fpsInterval);
            
            this.position.x += this.speed.x;
            this.position.y += this.speed.y;
        }
    }
}