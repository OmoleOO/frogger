let Player = function(posX, posY) {
    let player = new GameObject(posX, posY, 'images/char-boy.png');
    Object.assign(this, player);
    this.collision = false;
    this.mark = 70;
    this.level = 1;
    this.health = 3;
    this.score = 0;
}

// Update the player's position, required method for game
// Parameter: dt, a time delta between ticks
Player.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    //change player's character based on game level
    this.switchUp();
};

/** a handleInput() method.
// handle player location when user use up/down/left/right arrow key on keyboard
// (0, 0) - origin
// posX min = 0, max 400; posY min = -20, max = 380
// I have used min and max to setup a boundary below (for min) or above (for max) which the player would not appear
// (i.e player goes off canvas - we don't want that)
*/
let minX = 0, minY = -20, maxX = 400, maxY = 380;
Player.prototype.handleInput = function(position){
  if(!this.collision){
    if (position === 'up' && this.y !== minY){
        this.y -= 80;
        this.checkSuccess();
    } else if(position === 'down' && this.y !== maxY) {
        this.y += 80;
    } else if (position === 'left' && this.x !== minX) {
        this.x -= 100;
    } else if (position === 'right' && this.x !== maxX){
        this.x += 100;
    }
  }
}

/**
* Checks if a player wins by reaching the river
* River is on posY => 0 => min/ Hence, if player reaches river,
* increase player scores, increase player level and returns back to grass
*/
Player.prototype.checkSuccess = function(){
    if (this.y <= minY) {
        this.increaseScore();
        this.increaseLevel();
        this.goBackHome();
        obstacle.update();
        collectible.update();
    }
}

/**
* Takes player back home having reached the river
* PosX = 200, PosY = 400; so player appears in the middle of the grass.
*/
Player.prototype.goBackHome = function(){
    this.x = 200;
    this.y = 380;
}

/**
* increase player level by 1 on every 70 point score
*/
Player.prototype.increaseLevel = function(){
   if(this.score > this.mark){
    this.level += 1;
    // increase mark to beat on level increase
    this.mark += 70;
   }
   //increase number of enemies based on the game level
   increaseEnemies(player.level);
   //if game level is greater than 5, then add key and star to collectible
   upgradeCollectibles(player.level)
}

/**
* takes player back to level the first level when a collision is detected
*/
Player.prototype.backOneLevel = function(){
  if (this.level !== 1){
    this.level -= 1;
    increaseEnemies(player.level);
  } else {
    this.level = 1;
  }
}

// increase player scores by 10
Player.prototype.increaseScore = function(){
  this.score += 5;
}


// decrease player scores by 10
Player.prototype.decreaseScore = function(){
  if (this.collision && this.score > 0){
    if (this.level === 1){
      this.score -= 5;
    } else if (this.level === 2){
      this.score -= 20;
    } else if (this.level === 3){
      this.score -= 30;
    } else if (this.level === 4){
      this.score -= 40;
    } else if (this.level === 5){
      this.score -= 50;
    }
  }
}

/**
* decrease player lives by 1
*/
Player.prototype.decreaseHealth = function(){
  if (this.collision && this.health > 0) {
    this.health--;
  }
}

/**
* cancels player's score entirely
*/
Player.prototype.cancelScore = function(){
  this.score = 0;
}

// change player character based on game level
Player.prototype.switchUp = function(){
  if (player.level <= 3){
    this.player = 'images/char-boy.png';
  } else if (player.level > 3 || player.level <= 5){
    this.player = 'images/char-cat-girl.png';
  } else if (player.level > 5 || player.level <= 10){
    this.player = 'images/char-horn-girl.png';
  } else if (player.level > 10 || player.level < 12){
    this.player = 'images/char-pink-girl.png';
  } else if (player.level >= 12){
    this.player = 'images/char-princess-girl.png';
  }
}
