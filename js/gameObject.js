// Enemies our player must avoid
let GameObject = function(posX, posY, sprite) {
    this.x = posX;
    this.y = posY;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = sprite;
    // Draw the GameObject on the screen, required method for game
    this.render = function() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    };
};
