/* For my extension I implemented the sound, enemies and platform.For the enemies, they are constantly patrolling the
ground and are able to shoot at the game character.As for the platform, the game character can jump on it to try and
escape the enemies.Sounds have been implemented for movement of left, right and jumping as well as falling and getting
hit by the missiles.While creating the enemy, I had to implement a unique id for each of the missiles to identify which
of the enemies shot the missile so as to prevent a bug where the enemy could not shoot after firing once.While doing the
game project, I have learned to create constructor as i had refractor most of my codes for the scenery and background to
make my codes neater and also to debug the errors that i encounter on my own. */

//variable for sounds
var jumpSound;
var teleportSound;
var dropSound;
var backgroundSound;
var explosionSound;
var laserSound;
var moverightSound;
var moveleftSound;
var collideSound;
var gameoverSound;

//vaiable for logic and game character
var gameChar_x;
var gameChar_y;
var floorPos_y;
var scrollPos;
var gameChar_world_x;
var isLeft;
var isRight;
var isFalling;
var isPlummeting;
var isGameOver;
var isGameWon;
var isGameLost;
var onPlatform;

//variables for scenary
var clouds;
var trees;
var mountains;
var collectables;
var canyons;
var game_score;
var lives;
var flagpole;
var enemies;
var platforms;
var emits;
var missiles;
var stars;

function preload() {
  soundFormats("mp3", "wav");

  //load your sounds here
  jumpSound = loadSound("assets/jump.wav");
  jumpSound.setVolume(0.1);
  teleportSound = loadSound("assets/teleport.wav");
  teleportSound.setVolume(0.05);
  dropSound = loadSound("assets/drop.wav");
  dropSound.setVolume(0.1);
  backgroundSound = loadSound("assets/background.mp3");
  backgroundSound.setVolume(0.05);
  explosionSound = loadSound("assets/explosion.wav");
  explosionSound.setVolume(0.5);
  laserSound = loadSound("assets/laserbeam.wav");
  laserSound.setVolume(0.5);
  moverightSound = loadSound("assets/moveright.wav");
  moverightSound.setVolume(0.5);
  moveleftSound = loadSound("assets/moveleft.wav");
  moveleftSound.setVolume(1.0);
  collideSound = loadSound("assets/collide.wav");
  collideSound.setVolume(1.0);
  gameoverSound = loadSound("assets/gameover.wav");
  gameoverSound.setVolume(1.0);
}

function setup() {
  createCanvas(1024, 576);
  floorPos_y = (height * 3) / 4;
  lives = 3;
  // Initialise background sound
  backgroundSound.play();
  startGame();
}

function draw() {
  backgroundDraw();
  push();
  translate(scrollPos, 0);
  drawStars();
  // Draw clouds.
  drawClouds();
  // Draw mountains.
  drawMountains();
  // Draw tress.
  drawTrees();
  // Draw canyon.
  drawCanyon();
  // Draw collectable.
  drawCollectable();
  //Draw Enemy
  drawEnemies();
  //draw flagpole
  drawFlagpole();
  //draw platform
  drawPlatforms();
  //draw Missiles.
  drawMissiles();
  // check if character is on platform
  checkIfGameCharIsOverAnyPlatforms();
  pop();

  // Logic to check flagpole reached
  if (flagpole.isReached == false) {
    checkFlagpole();
  }

  // Game score
  fill(0);
  textSize(40);
  text("Score:" + game_score, 0, 30);

  //drawing of game character
  if ((!isGameOver || teleportSound.isPlaying()) && lives > 0) {
    drawGameChar();
  }

  // Game over sound when live = 0 and turn the gameover statement true.
  if (lives < 1 && !isGameOver) {
    isGameOver = true;
    isGameLost = true;
    backgroundSound.stop();
    gameoverSound.play();
  }

  // Initate game over text
  if (isGameLost) {
    fill(255, 0, 0);
    textSize(28);
    text("Game Over Press space to continue.", width / 4, height / 2);
    return;
  }

  // initate winning sound
  if (flagpole.isReached == true && !isGameOver) {
    isGameOver = true;
    isGameWon = true;
    backgroundSound.stop();
    teleportSound.play();
    return;
  }
  //show that game is over
  if (isGameWon) {
    fill(0, 255, 0);
    textSize(28);
    text(
      "Level complete with a score of: " +
        game_score +
        " Press space to continue",
      width / 6,
      height / 3
    );
  }

  // Logic to make the game character move or the background scroll.
  if (isLeft && !isGameOver && !isGameWon && gameChar_world_x > -200) {
    if (gameChar_x > width * 0.5) {
      gameChar_x -= 5;
    } else {
      scrollPos += 5;
    }
  }

  if (isRight && !isGameOver && !isGameWon) {
    if (gameChar_x < width * 0.5) {
      gameChar_x += 5;
    } else {
      scrollPos -= 5; // negative for moving against the background
    }
  }

  // Logic to make the game character rise and fall.
  if (gameChar_y < floorPos_y && !isGameOver && !isGameWon) {
    // gameChar_y += 2;
    isFalling = true;
  } else {
    isFalling = false;
  }

  // Update real position of gameChar for collision detection.
  gameChar_world_x = gameChar_x - scrollPos;

  // Logic to make player die
  checkPlayerFall();

  // Drawing Life
  drawLife();
}

// ---------------------
// Key control functions
// ---------------------

function keyPressed() {
  // if statements to control the animation of the character when
  // keys are pressed.
  if (keyCode == 39 && !isGameOver && !isGameWon) {
    isRight = true;
    moverightSound.play();
  }

  if (keyCode == 37 && !isGameOver && !isGameWon) {
    isLeft = true;
    moveleftSound.play();
  }

  if (
    keyCode == 32 &&
    (gameChar_y == floorPos_y || onPlatform) &&
    !isGameOver &&
    !isGameWon
  ) {
    gameChar_y -= 140;
    jumpSound.play();
  }

  if (keyCode == 32 && (isGameOver || isGameWon)) {
    lives = 3;
    startGame();
    backgroundSound.play();
  }

  //open up the console to see how these work
  console.log("keyPressed: " + key);
  console.log("keyPressed: " + keyCode);
}

function keyReleased() {
  // if statements to control the animation of the character when
  // keys are released.
  if (keyCode == 39) {
    isRight = false;
  }

  if (keyCode == 37) {
    isLeft = false;
  }

  console.log("keyReleased: " + key);
  console.log("keyReleased: " + keyCode);
}

// ------------------------------
// Game character render function
// ------------------------------

// Function to draw the game character.

function drawGameChar() {
  if (onPlatform && isLeft) {
    drawWalkingLeft();
  } else if (onPlatform && isRight) {
    drawWalkingRight();
  } else if (isLeft && isFalling) {
    drawJumpingLeft();
  } else if (isRight && isFalling) {
    drawJumpingRight();
  } else if (isLeft) {
    drawWalkingLeft();
  } else if (isRight) {
    drawWalkingRight();
  } else if (onPlatform) {
    drawStandingFrontFacing();
  } else if (isFalling || isPlummeting) {
    drawJumpingFacingForwards();
  } else {
    drawStandingFrontFacing();
  }
}

// ---------------------------
// Background render functions
// ---------------------------

//function to check if player fall
function checkPlayerFall() {
  if (gameChar_y > height && lives > 0) {
    lives -= 1;
    dropSound.stop();
    startGame();
  }
}

//function to draw life
function drawLife() {
  //Life Body
  fill(255, 0, 0);
  textSize(35);
  text("Life:", 710, 35);

  for (var i = 0; i < lives; i++) {
    fill(135, 206, 235);
    arc(
      life[i].x_position,
      life[i].y_position,
      life[i].size,
      life[i].size,
      PI,
      0
    );
    fill(255, 215, 0);
    arc(
      life[i].x_position,
      life[i].y_position + 6,
      life[i].size,
      life[i].size,
      0,
      PI
    );
    fill(75, 0, 130);
    ellipse(
      life[i].x_position,
      life[i].y_position - 1,
      life[i].size + 10,
      life[i].size - 15
    );
    fill(112, 128, 144);
    ellipse(life[i].x_position, life[i].y_position + 5, 75, 20);
    fill(255, 255, 255);
    ellipse(
      life[i].x_position + 20,
      life[i].y_position + 5,
      life[i].size - 25,
      life[i].size - 25
    );
    ellipse(
      life[i].x_position,
      life[i].y_position + 5,
      life[i].size - 25,
      life[i].size - 25
    );
    ellipse(
      life[i].x_position - 20,
      life[i].y_position + 5,
      life[i].size - 25,
      life[i].size - 25
    );
  }
}

//function to draw the flagpole
function drawFlagpole() {
  if (flagpole.isReached == false) {
    //portal base
    fill(75, 0, 130);
    beginShape();
    vertex(flagpole.x_position - 100, flagpole.y_position_1);
    vertex(flagpole.x_position + 100, flagpole.y_position_1);
    vertex(flagpole.x_position + 50, flagpole.y_position_1 - 20);
    vertex(flagpole.x_position - 50, flagpole.y_position_1 - 20);
    vertex(flagpole.x_position - 100, flagpole.y_position_1);
    endShape();

    beginShape();
    vertex(flagpole.x_position - 50, flagpole.y_position_1 - 150);
    vertex(flagpole.x_position + 50, flagpole.y_position_1 - 150);
    vertex(flagpole.x_position + 100, flagpole.y_position_1 - 170);
    vertex(flagpole.x_position - 100, flagpole.y_position_1 - 170);
    vertex(flagpole.x_position - 50, flagpole.y_position_1 - 150);
    endShape();
  } else {
    //portal base
    fill(75, 0, 130);
    beginShape();
    vertex(flagpole.x_position - 100, flagpole.y_position_1);
    vertex(flagpole.x_position + 100, flagpole.y_position_1);
    vertex(flagpole.x_position + 50, flagpole.y_position_1 - 20);
    vertex(flagpole.x_position - 50, flagpole.y_position_1 - 20);
    vertex(flagpole.x_position - 100, flagpole.y_position_1);
    endShape();

    beginShape();
    vertex(flagpole.x_position - 50, flagpole.y_position_1 - 150);
    vertex(flagpole.x_position + 50, flagpole.y_position_1 - 150);
    vertex(flagpole.x_position + 100, flagpole.y_position_1 - 170);
    vertex(flagpole.x_position - 100, flagpole.y_position_1 - 170);
    vertex(flagpole.x_position - 50, flagpole.y_position_1 - 150);
    endShape();

    fill(70, 130, 180);
    ellipse(flagpole.x_position, flagpole.y_position_2, 100, 20);
    ellipse(flagpole.x_position, flagpole.y_position_3, 100, 20);
    ellipse(flagpole.x_position, flagpole.y_position_4, 100, 20);

    fill(192, 192, 192);
    ellipse(flagpole.x_position, flagpole.y_position_2, 75, 10);
    ellipse(flagpole.x_position, flagpole.y_position_3, 75, 10);
    ellipse(flagpole.x_position, flagpole.y_position_4, 75, 10);

    fill(238, 232, 170);
    ellipse(flagpole.x_position, flagpole.y_position_5, 80, 20);
    ellipse(flagpole.x_position, flagpole.y_position_6, 80, 20);

    fill(192, 192, 192);
    ellipse(flagpole.x_position, flagpole.y_position_5, 60, 10);
    ellipse(flagpole.x_position, flagpole.y_position_6, 60, 10);

    flagpole.y_position_2 += 5;
    flagpole.y_position_3 += 5;
    flagpole.y_position_4 += 5;
    flagpole.y_position_5 += 4;
    flagpole.y_position_6 += 4;

    if (flagpole.y_position_2 > 420) {
      flagpole.y_position_2 = 300;
    }
    if (flagpole.y_position_3 > 420) {
      flagpole.y_position_3 = 300;
    }
    if (flagpole.y_position_4 > 420) {
      flagpole.y_position_4 = 300;
    }
    if (flagpole.y_position_5 > 420) {
      flagpole.y_position_5 = 300;
    }
    if (flagpole.y_position_6 > 420) {
      flagpole.y_position_6 = 300;
    }
  }
}

//function to check if flagpole is reached
function checkFlagpole() {
  var d = abs(gameChar_world_x - flagpole.x_position);
  if (d < 5) {
    flagpole.isReached = true;
  }
}

//function to check if the player is  ontop of platforms
function checkIfGameCharIsOverAnyPlatforms() {
  if (isFalling) {
    for (i in platforms) {
      var platform = platforms[i];
      isContact = platform.checkContact(gameChar_world_x, gameChar_y);
      if (isContact) {
        onPlatform = true;
        break;
      }
    }
    if (isContact == false) {
      gameChar_y += 5;
      onPlatform = false;
    }
  }
}

//function to start the game
function startGame() {
  gameChar_x = 50;
  gameChar_y = floorPos_y - 100;

  // Variable to control the background scrolling.
  scrollPos = 0;

  // Variable to store the real position of the gameChar in the game
  // world. Needed for collision detection.
  gameChar_world_x = gameChar_x - scrollPos;

  // Boolean variables to control the movement of the game character.
  isLeft = false;
  isRight = false;
  isFalling = false;
  isPlummeting = false;
  onPlatform = false;

  //Initalise arrays of canyons and emmiter
  canyons = [];
  emits = [];
  for (var i = 0; i < 8; i++) {
    var x = random(250, 350) + 500 * i;
    canyons.push(new Canyon(x, floorPos_y, 100));
    emits.push(new Emitter(x + 50, height, 0, -1, 15, color(0, 0, 200, 100)));
    emits[i].startEmitter(200, 300);
  }

  // Initialise arrays of trees.
  trees = [];
  for (var i = 0; i < 5; i++) {
    trees.push(new Tree(random(500, 600) + 1000 * i, floorPos_y));
  }

  //Initialise arrays of clouds
  clouds = [];
  for (var i = 0; i < 20; i++) {
    clouds.push(new Cloud(300 * i, random(25, 125), 75, random(50, 100)));
  }
  //Initialise arrays of mountains
  mountains = [];
  for (var i = 0; i < 4; i++) {
    mountains.push(new Mountain(150 + 1000 * i, floorPos_y - 130, 175));
  }
  //Initialise arrays of collectables
  collectables = [];
  for (var i = 1; i < 8; i++) {
    var c = color(random(0, 255), random(0, 255), 255);
    collectables.push(
      new Collectable(random(0, 220) + 500 * i, floorPos_y - 20, 30, c)
    );
  }
  //Initialise arrays of enemies
  enemies = [];
  for (var i = 0; i < 4; i++) {
    var c = color(random(0, 255), random(0, 255), random(0, 255));
    enemies.push(new Enemy(500 + 1000 * i, floorPos_y, 200, c, true));
  }
  //flagpoles coordinates
  flagpole = {
    x_position: 4200,
    y_position_1: 440,
    y_position_2: 270,
    y_position_3: 320,
    y_position_4: 370,
    y_position_5: 330,
    y_position_6: 380,
    isReached: false,
  };
  //Setting intial score
  game_score = 0;
  //Setting the game state
  isGameOver = false;
  isGameWon = false;
  isGameLost = false;
  //life bar position
  life = [
    { x_position: 820, y_position: 20, size: 35 },
    { x_position: 900, y_position: 20, size: 35 },
    { x_position: 980, y_position: 20, size: 35 },
  ];
  //platforms positions
  platforms = [];
  for (var i = 0; i < 4; i++) {
    platforms.push(createPlatform(600 + 1000 * i, floorPos_y - 100, 100));
  }
  //missile
  missiles = [];
  //stars
  stars = [];
  for (var i = 0; i < 100; i++) {
    stars.push(new Star(random(0, 5000), random(windowHeight - 600)));
  }
}
