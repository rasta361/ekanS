export default class GroundTile {
    constructor(game, position) {
        this.image = new Image();
        this.image.src = "assets/art/grassTileTest.png"

        this.game = game;

        this.position = position;
        this.width = 40;
        this.height = 40;
    }

    update() {}

    draw(context) {
        context.drawImage(this.image, this.position.x, this.position.y, this.width, this.height);
    }

}