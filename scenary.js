// Collectable Constructor
function Collectable(x, y, size, colour) {
  this.x = x;
  this.y = y;
  this.size = size;
  this.colour = colour;

  this.currentX = x;
  this.currentY = y;

  this.isfound = false;

  this.draw = function () {
    fill(this.colour);
    rect(this.x, this.y - 22, this.size - 28, this.size - 20);
    ellipse(this.x, this.y - 22, this.size - 22, this.size - 27);

    fill(this.colour);
    ellipse(this.x - 10, this.y + 21, this.size - 22, this.size - 27);
    ellipse(this.x + 9, this.y + 21, this.size - 22, this.size - 27);
    rect(this.x - 8, this.y + 12, this.size - 27, this.size - 20);
    rect(this.x + 5, this.y + 12, this.size - 27, this.size - 20);

    fill(165, 42, 42);
    beginShape();
    vertex(this.x - 15, this.y - 20);
    vertex(this.x - 10, this.y - 15);
    vertex(this.x - 5, this.y - 10);
    vertex(this.x - 12, this.y - 10);
    vertex(this.x - 14, this.y - 15);
    vertex(this.x - 15, this.y - 20);
    endShape();

    beginShape();
    vertex(this.x + 15, this.y - 20);
    vertex(this.x + 10, this.y - 15);
    vertex(this.x + 5, this.y - 10);
    vertex(this.x + 12, this.y - 10);
    vertex(this.x + 14, this.y - 15);
    vertex(this.x + 15, this.y - 20);
    endShape();

    fill(this.colour);
    // anchored point
    ellipse(this.x, this.y, this.size, this.size);
    fill(255, 255, 255);
    ellipse(this.x + 1, this.y - 5, this.size - 15, this.size - 15);
    fill(0, 0, 0);
    ellipse(this.x + 1, this.y - 5, this.size - 22.5, this.size - 22.5);

    fill(255, 255, 255);
    triangle(
      this.x - 7,
      this.y + 6,
      this.x - 3,
      this.y + 5,
      this.x - 5,
      this.y + 7
    );
    triangle(
      this.x + 1,
      this.y + 6,
      this.x + 5,
      this.y + 5,
      this.x + 3,
      this.y + 7
    );

    strokeWeight(1);

    fill(25, 25, 112);
    beginShape();
    vertex(this.x - 10, this.y + 3);
    vertex(this.x - 8, this.y + 10);
    vertex(this.x, this.y + 12);
    vertex(this.x + 8, this.y + 10);
    vertex(this.x + 10, this.y + 3);
    vertex(this.x + 5, this.y + 7);
    vertex(this.x, this.y + 7);
    vertex(this.x - 5, this.y + 7);
    vertex(this.x - 10, this.y + 3);
    endShape();
    fill(255, 255, 255);
    triangle(
      this.x - 7,
      this.y + 6,
      this.x - 1,
      this.y + 6,
      this.x - 4,
      this.y + 11
    );
    triangle(
      this.x + 1,
      this.y + 6,
      this.x + 7,
      this.y + 6,
      this.x + 4,
      this.y + 11
    );
  };

  this.checkContact = function (gc_x, gc_y) {
    var d = dist(gc_x, gc_y, this.currentX, this.currentY);
    if (d < 30) {
      this.isfound = true;
      game_score += 1;
    }
  };
}

// function to draw Collectable items
function drawCollectable() {
  for (var i = 0; i < collectables.length; i++) {
    if (!collectables[i].isfound) {
      collectables[i].draw();
      collectables[i].checkContact(gameChar_world_x, gameChar_y);
    }
  }
}

//Cloud (moon) Constructor
function Cloud(x, y, size, range) {
  this.x = x;
  this.y = y;
  this.size = size;
  this.range = range;

  this.currentY = y;
  this.bounceSpeed = random(0.1, 1);

  this.draw = function () {
    this.bouncingClouds();
    fill(250, 250, 210);
    //anchored cloud
    ellipse(this.x, this.currentY, this.size, this.size);
    fill(211, 211, 211);
    ellipse(this.x - 12.5, this.currentY - 25, this.size / 15, this.size / 15);
    ellipse(this.x - 20, this.currentY - 15, this.size / 5, this.size / 5);
    ellipse(this.x - 15, this.currentY + 15, this.size / 5, this.size / 5);
    ellipse(this.x - 10, this.currentY + 25, this.size / 15, this.size / 15);
    ellipse(this.x + 25, this.currentY, this.size / 15, this.size / 15);
    ellipse(this.x + 15, this.currentY + 15, this.size / 5, this.size / 5);
    ellipse(this.x + 5, this.currentY - 20, this.size / 15, this.size / 15);
  };

  this.bouncingClouds = function () {
    this.currentY += this.bounceSpeed;
    if (this.currentY > this.y + this.range) {
      this.bounceSpeed = random(-1, -0.1);
    } else if (this.currentY < this.y) {
      this.bounceSpeed = random(0.1, 1);
    }
  };
}

//function to draw clouds
function drawClouds() {
  for (var i = 0; i < clouds.length; i++) {
    clouds[i].draw();
  }
}

//Mountain Constructor
function Mountain(x, y, size) {
  this.x = x;
  this.y = y;
  this.size = size;

  this.draw = function () {
    //base of statue
    fill(169, 169, 169);
    rect(this.x - 100, this.y + 124, this.size + 25, this.size - 165);
    //body of statue
    fill(220, 20, 60);
    //anchored mountain
    ellipse(this.x, this.y, this.size, this.size);
    rect(this.x - 35, this.y + 80, this.size - 165, this.size - 132);
    rect(this.x + 20, this.y + 80, this.size - 165, this.size - 132);
    ellipse(this.x - 48, this.y + 119, this.size - 129, this.size - 165);
    ellipse(this.x + 44, this.y + 119, this.size - 129, this.size - 165);
    rect(this.x + 80, this.y, this.size - 125, this.size - 170);
    rect(this.x - 130, this.y, this.size - 125, this.size - 170);
    fill(255, 127, 80);
    ellipse(this.x, this.y - 20, this.size - 75, this.size - 75);
    fill(0, 0, 0, 255);
    ellipse(this.x, this.y - 20, this.size - 125, this.size - 125);

    //Torch of statue

    fill(205, 133, 63);
    rect(this.x + 130, this.y - 60, this.size - 165, this.size - 65);
    ellipse(this.x + 135, this.y - 58, this.size - 130, this.size - 170);
    fill(220, 20, 60);
    arc(
      this.x + 135,
      this.y - 57,
      this.size - 145,
      this.size - 95,
      PI,
      this.size - 175
    );
    fill(220, 20, 60);
    arc(
      this.x + 135,
      this.y - 57,
      this.size - 145,
      this.size - 95,
      PI,
      this.size - 175
    );
    fill(178, 34, 34);
    arc(
      this.x + 135,
      this.y - 57,
      this.size - 155,
      this.size - 115,
      PI,
      this.size - 175
    );
    fill(205, 92, 92);
    arc(
      this.x + 135,
      this.y - 57,
      this.size - 165,
      this.size - 135,
      PI,
      this.size - 175
    );

    //Crown of statue

    fill(255, 155, 0);
    beginShape();
    vertex(this.x - 50, this.y - 130);
    vertex(this.x - 25, this.y - 110);
    vertex(this.x, this.y - 130);
    vertex(this.x + 25, this.y - 110);
    vertex(this.x + 50, this.y - 130);
    vertex(this.x + 50, this.y - 85);
    vertex(this.x - 50, this.y - 85);
    vertex(this.x - 50, this.y - 130);
    endShape();
  };
}

//function to draw mountains
function drawMountains() {
  for (var i = 0; i < mountains.length; i++) {
    mountains[i].draw();
  }
}

//Constructor for tree
function Tree(x, y) {
  this.x = x;
  this.y = y;

  this.draw = function () {
    //temple base
    fill(205, 133, 63);
    // anchored tree
    rect(this.x, this.y - 30, 100, 30);
    //temple body
    fill(178, 34, 34);
    beginShape();
    vertex(this.x, this.y - 30);
    vertex(this.x - 20, this.y - 40);
    vertex(this.x + 10, this.y - 50);
    vertex(this.x + 90, this.y - 50);
    vertex(this.x + 120, this.y - 40);
    vertex(this.x + 100, this.y - 30);
    endShape();
    beginShape();
    vertex(this.x + 10, this.y - 70);
    vertex(this.x - 10, this.y - 80);
    vertex(this.x + 20, this.y - 90);
    vertex(this.x + 80, this.y - 90);
    vertex(this.x + 110, this.y - 80);
    vertex(this.x + 90, this.y - 70);
    endShape();
    beginShape();
    vertex(this.x + 20, this.y - 110);
    vertex(this.x, this.y - 120);
    vertex(this.x + 30, this.y - 130);
    vertex(this.x + 70, this.y - 130);
    vertex(this.x + 100, this.y - 120);
    vertex(this.x + 80, this.y - 110);
    endShape();
    beginShape();
    vertex(this.x + 30, this.y - 150);
    vertex(this.x + 10, this.y - 160);
    vertex(this.x + 40, this.y - 170);
    vertex(this.x + 60, this.y - 170);
    vertex(this.x + 90, this.y - 160);
    vertex(this.x + 70, this.y - 150);
    endShape();
    fill(205, 133, 63);
    rect(this.x + 10, this.y - 70, 80, 20);
    rect(this.x + 20, this.y - 110, 60, 20);
    rect(this.x + 30, this.y - 150, 40, 20);
    //temple head
    fill(178, 34, 34);
    beginShape();
    vertex(this.x + 50, this.y - 170);
    vertex(this.x + 20, this.y - 210);
    vertex(this.x + 50, this.y - 190);
    vertex(this.x + 50, this.y - 190);
    vertex(this.x + 80, this.y - 210);
    vertex(this.x + 50, this.y - 170);
    endShape();
    fill(205, 133, 63);
    rect(this.x + 45, this.y - 190, 10, 20);
    //temple door
    fill(255, 255, 255);
    rect(this.x + 40, this.y - 20, 20, 20);
  };
}

//function to draw trees
function drawTrees() {
  for (var i = 0; i < trees.length; i++) {
    trees[i].draw();
  }
}

function Canyon(x, y, size) {
  this.x = x;
  this.y = y;
  this.size = size;

  this.draw = function () {
    fill(0, 0, 0);
    // anchored canyon
    rect(this.x, this.y, this.size, 144);

    fill(0, 0, 128);
    ellipse(this.x + 50, this.y + 10, this.size, 50);
    fill(0, 0, 139);
    ellipse(this.x + 50, this.y + 10, this.size - 20, 40);
    fill(0, 0, 205);
    ellipse(this.x + 50, this.y + 10, this.size - 40, 30);
    fill(0, 0, 255);
    ellipse(this.x + 50, this.y + 10, this.size - 60, 20);
  };
  this.checkContact = function (gc_x, gc_y) {
    if (gc_x > this.x && gc_x < this.x + 100 && gc_y >= floorPos_y) {
      dropSound.play();
      gameChar_y += 2.5;
      isPlummeting = true;
      isLeft = false;
      isRight = false;
      return;
    }
  };
}

//function to draw canyon
function drawCanyon() {
  for (var i = 0; i < canyons.length; i++) {
    canyons[i].draw();
    canyons[i].checkContact(gameChar_world_x, gameChar_y);
    emits[i].updateParticles();
  }
}

//Enemy Constructor
function Enemy(x, y, range, color, direction) {
  this.x = x;
  this.y = y;
  this.range = range;
  this.uniqueid = Math.random() + "_" + Math.random() + "_" + Math.random();
  this.color = color;
  //true is going right, false is going left for direction
  this.direction = direction;
  this.currentX = x;
  this.inc = random(2,4);
  this.bullet = 1;

  //drawing enemy
  this.draw = function () {
    this.update();
    //enemy facing right
    if (this.direction) {
      fill(this.color);
      rect(this.currentX - 25, this.y - 50, 15, 35, 10);
      rect(this.currentX - 15, this.y - 25, 15, 30, 0, 0, 5, 5);
      rect(this.currentX + 10, this.y - 25, 15, 30, 0, 0, 5, 5);
      rect(this.currentX - 15, this.y - 65, 40, 50, 15, 15, 0, 0);
      fill(255, 255, 255);
      rect(this.currentX, this.y - 50, 30, 15, 10);
    }
    //enemy facing left
    else {
      fill(this.color);
      rect(this.currentX + 40, this.y - 50, 15, 35, 10);
      rect(this.currentX + 5, this.y - 25, 15, 30, 0, 0, 5, 5);
      rect(this.currentX + 30, this.y - 25, 15, 30, 0, 0, 5, 5);
      rect(this.currentX + 5, this.y - 65, 40, 50, 15, 15, 0, 0);
      fill(255, 255, 255);
      rect(this.currentX, this.y - 50, 30, 15, 10);
    }
  };
  this.update = function () {
    this.currentX += this.inc;
    if (this.currentX > this.x + this.range) {
      this.inc = random(-2,-4);
      this.direction = false;
    } else if (this.currentX < this.x) {
      this.inc = random(2,4);
      this.direction = true;
    }
    var bullet_shot_by_this_enemy = false;
    for (let i = 0; i < missiles.length; i++) {
      if (this.uniqueid == missiles[i].ownerofbullet.uniqueid) {
        bullet_shot_by_this_enemy = true;
        break;
      }
    }
    if (!bullet_shot_by_this_enemy) {
      this.checkshoot(gameChar_world_x, gameChar_y);
    }
  };

  //checking contact of the enemy
  this.checkContact = function (gc_x, gc_y) {
    var d = dist(gc_x, gc_y, this.currentX, this.y);
    if (d < 30) {
      collideSound.play();
      lives -= 1;
      startGame();
    } else {
      return false;
    }
  };
  //check if the eneemy can shoot
  this.checkshoot = function (gc_x, gc_y) {
    var d = gc_x - this.currentX;
    if (
      d < 200 &&
      d > 0 &&
      gc_y == floorPos_y &&
      this.bullet == 1 &&
      this.direction
    ) {
      this.bullet = 0;
      missiles.push(
        new Missile(this.currentX, this.y, 30, this, gameChar_world_x)
      );
      laserSound.play();
    } else if (
      d < 0 &&
      d > -200 &&
      gc_y == floorPos_y &&
      this.bullet == 1 &&
      !this.direction
    ) {
      this.bullet = 0;
      missiles.push(
        new Missile(this.currentX, this.y, 30, this, gameChar_world_x)
      );
      laserSound.play();
    }
  };
  //reload the bullet that enemy have
  this.resetBullet = function () {
    if (this.bullet == 0) {
      this.bullet = 1;
      for (let i = 0; i < missiles.length; i++) {
        if (this.uniqueid == missiles[i].ownerofbullet.uniqueid) {
          missiles.splice(i, 1);
        }
      }
    }
  };
}
//drrawing enemy missile
function drawMissiles() {
  for (m in missiles) {
    if (missiles.length > 0) {
      missiles[m].draw();
      if (missiles.length > 0) {
        missiles[m].checkContact(gameChar_world_x, gameChar_y);
      }
    }
  }
}
//draw enemy
function drawEnemies() {
  for (i in enemies) {
    var enemy = enemies[i];
    enemy.draw();
    enemy.checkContact(gameChar_world_x, gameChar_y);
  }
}
//factory to create platform
function createPlatform(x, y, length) {
  var p = {
    x: x,
    y: y,
    length: length,
    draw: function () {
      fill(255, 0, 255);
      rect(this.x, this.y, this.length, 20);
    },
    checkContact: function (gc_x, gc_y) {
      var c1 = gc_x + 10 > this.x;
      var c2 = gc_x < this.x + 20 + this.length;

      if (c1 && c2) {
        //check for y axis
        var d = this.y - gc_y;
        if (d >= 0 && d < 1) {
          return true;
        }
      }
      return false;
    },
  };
  return p;
}
//drawing the platform
function drawPlatforms() {
  for (i in platforms) {
    var platform = platforms[i];
    platform.draw();
  }
}
//Particle constructor
function Particle(x, y, xSpeed, ySpeed, size, colour) {
  this.x = x;
  this.y = y;
  this.xSpeed = xSpeed;
  this.ySpeed = ySpeed;
  this.size = size;
  this.colour = colour;
  this.age = 0;

  this.drawParticle = function () {
    fill(this.colour);
    ellipse(this.x, this.y, this.size);
  };

  this.updateParticle = function () {
    this.x += this.xSpeed;
    this.y += this.ySpeed;
    this.age++;
  };
}
//emitter constructor
function Emitter(x, y, xSpeed, ySpeed, size, colour) {
  this.x = x;
  this.y = y;
  this.xSpeed = xSpeed;
  this.ySpeed = ySpeed;
  this.size = size;
  this.colour = colour;

  this.startParticles = 0;
  this.lifetime = 0;
  this.particles = [];

  this.addParticles = function () {
    var p = new Particle(
      random(this.x - 10, this.x + 10),
      random(this.y - 10, this.y + 10),
      random(this.xSpeed - 1, this.xSpeed + 1),
      random(this.ySpeed - 1, this.ySpeed + 1),
      random(this.size - 4, this.size + 4),
      this.colour
    );
    return p;
  };

  this.startEmitter = function (startParticles, lifetime) {
    this.startParticles = startParticles;
    this.lifetime = lifetime;

    //start emitter with initial particles
    for (var i = 0; i < startParticles; i++) {
      this.particles.push(this.addParticles());
    }
  };

  this.updateParticles = function () {
    //iterate through particles and draw to the screen
    var deadParticles = 0;
    for (var i = this.particles.length - 1; i >= 0; i--) {
      this.particles[i].drawParticle();
      this.particles[i].updateParticle();
      if (this.particles[i].age > random(0, this.lifetime)) {
        this.particles.splice(i, 1);
        deadParticles++;
      }
    }

    if (deadParticles > 0) {
      for (var i = 0; i < deadParticles; i++) {
        this.particles.push(this.addParticles());
      }
    }
  };
}

//Missile Constructor
function Missile(x, y, size, enemyobj, charpos) {
  this.x = x;
  this.y = y;
  this.size = size;
  this.currentX = x;
  this.inc = 6 ;
  this.ownerofbullet = enemyobj;
  this.direction = 0;
  this.charpos = charpos;
  this.draw = function () {
    this.update();
    fill(255, 0, 0);
    rect(this.currentX, this.y - 50, 30, 15, 10);
  };
  this.checkContact = function (gc_x, gc_y) {
    var d = dist(gc_x, gc_y, this.currentX, this.y);
    if (d < 20) {
      lives -= 1;
      startGame();
      explosionSound.play();
    } else {
      return false;
    }
  };
  this.update = function () {
    var direction = this.x - charpos;
    if (direction < 0) {
      this.currentX += this.inc;
    }
    if (direction > 0) {
      this.currentX -= this.inc;
    }
    var d = abs(this.x - this.currentX);
    if (d > 150) {
      this.size = 0;
      this.ownerofbullet.resetBullet();
    }
  };
}
//set gradient for the background
function setGradient(x, y, w, h, c1, c2, axis) {
  noFill();
  if (axis == "Y") {
    // Top to bottom gradient
    for (let i = y; i <= y + h; i++) {
      var inter = map(i, y, y + h, 0, 1);
      var c = lerpColor(c1, c2, inter);
      stroke(c);
      line(x, i, x + w, i);
    }
  } else if (axis == "X") {
    // Left to right gradient
    for (let j = x; j <= x + w; j++) {
      var inter2 = map(j, x, x + w, 0, 1);
      var d = lerpColor(c1, c2, inter2);
      stroke(d);
      line(j, y, j, y + h);
    }
  }
}

//static star constructor
function Star(x, y) {
  // We'll add code here
  this.x = x;
  this.y = y;
  this.draw = function () {
    noStroke();
    fill(255, 255, 0);
    ellipse(this.x, this.y, 2, 2);
  };
}

//function to draw star
function drawStars() {
  for (var i = 0; i < stars.length; i++) {
    stars[i].draw();
  }
}

//functin to draw background
function backgroundDraw() {
  //setbackground color
  var color1 = color(69, 76, 146);
  var color2 = color(209, 199, 230);
  setGradient(0, 0, 1024, 432, color1, color2, "Y");
  background(96, 76, 146);
  fill(139, 69, 19);
  //draw ground
  rect(0, 432, width, floorPos_y);
  fill(186, 30, 104, 60);
  fill(244, 164, 96);
  rect(0, 432, 150, 20);
  rect(0, 432, width, 20);
  noStroke();
  fill(0, 155, 0);
}
