

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
let player = new Player(200, 380);
let obstacle = new Obstacle();
let collectible = new Collectible();
let allEnemies = loadEnemies(3);
let scoreDisplay = $('#score > span');
let levelDisplay = $('#level > span');
let healthDisplay = $('.heart > span');
const modal = $('.modal');
const replayBtn = $('#replay');
const hiScore = $('#hi_score > span');

/**
  * @description Show modal
  * @returns {void}
  */
 function showModal(){
    modal.style.display = 'flex';
    hiScore.textContent = player.score;
    replayBtn.addEventListener('click', function(e){
      e.preventDefault();
      fullGameReset();
      modal.style.display = 'none';
    });
 }

function fullGameReset(){
  player.cancelScore();
  player.goBackHome();
  removeHighValueCollectibles();
  player.collision = false;
  player.mark = 70;
  player.level = 1;
}


function increaseEnemies(level){
  if(level > 1 && level < 4) {
    allEnemies = loadEnemies(4);
  } else if (level > 3) {
    allEnemies = loadEnemies(5);
  } else {
    allEnemies = loadEnemies(3);
  }
}

//Add star and key to collectible collectibles array
function upgradeCollectibles(level){
  if(level > 5 && collectible.collectibles.length < 4 ){
    collectible.collectibles.push({type: "key", image: "images/Key.png"});
    collectible.collectibles.push({type: "star", image: "images/star.png"});
  }
}

//Remove star and key from collectible collectibles array upon demotion
function removeHighValueCollectibles(){
  if(collectible.collectibles.length > 3){
    collectible.collectibles.forEach(function(element, index){
      if(element.type === "key" || element.type === "star"){
        collectible.collectibles.pop();
      }
    });
  }
}

/**
 * @description creates fragment and appends children elements to it
 * @param {array} elements
 * @returns {void}
 */
function appendChildToFragment(elements=[]){
  const fragment = document.createDocumentFragment();
  for (let element of elements){
    fragment.appendChild(element);
  }

  return fragment;
}

/**
 * @description Select dom elements as done in JQuery
 * @param {string} selector
 * @returns {void}
 */
function $(selector){
  return document.querySelector(selector);
}

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    let allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    //moves player based on the key pressed on keyboard
    player.handleInput(allowedKeys[e.keyCode]);
});

/**
 * Returns a random integer between min (inclusive) and max (inclusive)
 * Using Math.round() will give you a non-uniform distribution!
 */
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// get random position for the y canvas coordinate from possible non-significant
// y coordinates of canvas game positions
function generateRandomPosY() {
  let enemyPositions = [145, 230, 60];
  let posY = enemyPositions[Math.floor(Math.random() * enemyPositions.length)]

  return posY;
}

// get random position for the x canvas coordinate from possible non-significant
// x coordinates of canvas game positions
function generateRandomPosX() {
  let possiblePosX = [100, 200, 300, 400];
  let posX = possiblePosX[Math.floor(Math.random() * possiblePosX.length)]

  return posX;
}

/**
 * Returns an array of objects from class Enemy with a size which
 * depends on the number passed in. Each of the enemy object has a preset
 * x coordinate of zero, a random integer between 100 and 300 for the y coordinate
 */
function loadEnemies(number){
  let enemies = [];
  for(let i = 0; i < number; i++){
    enemies.push(
      new Enemy(
        0, //posX
        generateRandomPosY() //posY
      )
    )
  }

    return enemies;
}

// display player score on score board
function displayScore(){
  scoreDisplay.innerText = player.score;
}

// display player level on score board
function displayLevel(){
  levelDisplay.innerText = player.level;
}

// display player health on score board
function displayHealth(){
  healthDisplay.innerText = player.health;
}

// detect if player has run into a bug
function detectEnemyCollision(){
  //detect collision with enemy
  allEnemies.forEach(function(enemy) {
    if(player.x >= enemy.x - 40 && player.x <= enemy.x + 65) {
      if(player.y >= enemy.y - 40 && player.y <= enemy.y + 65) {
        player.collision = true;
        //if collision detected, player.collision = true. if true, stop input keys from working, reset game...
        alertDanger();
        resetGame();
      }
    }
  });
}

// detect if player has run into an obstacle
function detectObstacleCollision() {
  //detect collision with obstacle
  if(player.x >= obstacle.x - 40 && player.x <= obstacle.x + 65) {
    if(player.y >= obstacle.y - 40 && player.y <= obstacle.y + 65) {
      player.collision = true;
      //if collision detected, player.collision = true. if true, stop input keys from working, reset game...
      alertDanger();
      resetGame();
      obstacle.update();
    }
  }
}

// Allocates reward based on the type of collectible a player picks
function getCollectible(){
  //detect collision with Gem
  if(player.x >= collectible.x - 40 && player.x <= collectible.x + 65) {
    if(player.y >= collectible.y - 40 && player.y <= collectible.y + 65) {
      checkCollectibleType();
    }
  }
}

// check the type of collectible a player picks
function checkCollectibleType(){
  if (collectible.bonus.type === "gem"){
    earnGemPoints();
  } else if (collectible.bonus.type === "key") {
    earnNewLevel();
  } else {
    earnStarPoints();
  }
}

// allocate 2 points to player's score when a gem collectible is picked
function earnGemPoints() {
  player.score += 2;
  collectible.update();
}

// allocate 5 points to player's score and increase player health by 1 when a star collectible is picked
function earnStarPoints() {
  player.score += 5;
  player.health += 1;
  collectible.update();
}

// allocate 30 points to player's score and move player to new level when a key collectible is picked
function earnNewLevel() {
  player.level += 1;
  player.score += 30;
  collectible.update();
}

// player wins when they have a score above 500, having reached or passed 12 game levels
function checkGameWinner() {
  if(player.score > 500 && player.level >= 12){
    alert("Winner");
  }
}

// Adds a css class danger to the body of the document to indicate collision
function alertDanger(){
  setTimeout(function(){
    document.body.classList.add("danger");
  }, 30);
}

// reset the game after collision
function resetGame(){
  if(player.health <= 1){
    showModal();
  }
    setTimeout(function(){
      document.body.classList.remove("danger");
    }, 1800);

    setTimeout(function(){
      player.decreaseHealth();
      player.decreaseScore();
      player.backOneLevel();
      player.goBackHome();
      removeHighValueCollectibles();
      player.collision = false;
    }, 2000);
}
