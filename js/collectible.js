
// Player do not want to avoid this
let Collectible = function() {
  let posX = generateRandomPosX();
  let posY = generateRandomPosY();
  // Ensure collectibles are not on obstacle
  if (posX !== obstacle.x && posY !== obstacle.y){
    this.x = posX;
    this.y = posY;
  }
  this.collectibles = [
    {type: "gem", image: "images/Gem Blue.png"},
    {type: "gem", image: "images/Gem Green.png"},
    {type: "gem", image: "images/Gem Orange.png"},
  ];
  this.bonus = this.collectibles[Math.floor(Math.random() * this.collectibles.length)];
  this.sprite = this.bonus.image;
};

// Update the collectibles' position
Collectible.prototype.update = function() {
  let posX = generateRandomPosX();
  let posY = generateRandomPosY();
  // Ensure collectibles are not on obstacle
  if (posX !== obstacle.x && posY !== obstacle.y){
    this.x = posX;
    this.y = posY;
  }

  // show random gem from the array of gems
  this.sprite = this.collectibles[Math.floor(Math.random() * this.collectibles.length)].image;
};

// Draw collectibles on screen
Collectible.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
