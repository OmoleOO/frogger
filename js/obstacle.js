// Obstacles our player must avoid
let Obstacle = function() {
    this.x = generateRandomPosX();
    this.y = generateRandomPosY();
    // The image/sprite for our enemies, this uses
    // a helper provided to easily load images
    this.sprite = 'images/rock.png';
};

// Update the obstacle's position
Obstacle.prototype.update = function() {
  this.x = generateRandomPosX();
  this.y = generateRandomPosY();
};

// Draw the obstacle on the screen
Obstacle.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
