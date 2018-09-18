// Enemies our player must avoid
let Enemy = function(posX, posY) {
    this.x = posX;
    this.y = posY;
    this.velocity = getRandomInt(100, 400);
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.velocity * dt;

    //bring the enemies back on screen when they go off-screen
    if (this.x > 500) {
        this.x = -100;
        this.y = generateRandomPosY();
        this.velocity = getRandomInt(100, 400);
    }

    this.speedUp();
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//increase Enemy speed based on player's level
Enemy.prototype.speedUp = function(){
  if (player.level <= 3){
    this.velocity = getRandomInt(120, 420);
  } else if (player.level > 3 || player.level <= 5){
    this.velocity = getRandomInt(140, 430);
  } else if (player.level > 5 || player.level <= 10){
    this.velocity = getRandomInt(160, 450);
  } else if (player.level > 10 || player.level < 12){
    this.velocity = getRandomInt(180, 470);
  } else if (player.level >= 12){
    this.velocity = getRandomInt(200, 490);
  }
}
