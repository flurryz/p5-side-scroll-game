//function to draw character jumping left
function drawJumpingLeft() {
  fill(238, 232, 170);
  beginShape();
  vertex(gameChar_x - 9, gameChar_y - 50);
  vertex(gameChar_x - 28, gameChar_y - 8);
  vertex(gameChar_x - 3, gameChar_y - 8);
  vertex(gameChar_x + 6, gameChar_y - 50);
  endShape();
  //UFO Body
  fill(135, 206, 235);
  arc(gameChar_x - 1, gameChar_y - 45, 45, 40, PI, 0);
  fill(255, 215, 0);
  arc(gameChar_x - 1, gameChar_y - 39, 45, 30, 0, PI);
  fill(75, 0, 130);
  ellipse(gameChar_x, gameChar_y - 46, 60, 20);
  fill(112, 128, 144);
  ellipse(gameChar_x, gameChar_y - 40, 80, 20);
  fill(255, 255, 255);
  ellipse(gameChar_x + 20, gameChar_y - 40, 10, 10);
  ellipse(gameChar_x, gameChar_y - 40, 10, 10);
  ellipse(gameChar_x - 20, gameChar_y - 40, 10, 10);
}

//function to draw character jumping right
function drawJumpingRight() {
  fill(238, 232, 170);
  beginShape();
  vertex(gameChar_x - 9, gameChar_y - 50);
  vertex(gameChar_x, gameChar_y - 8);
  vertex(gameChar_x + 25, gameChar_y - 8);
  vertex(gameChar_x + 6, gameChar_y - 50);
  endShape();
  //UFO Body
  fill(135, 206, 235);
  arc(gameChar_x - 1, gameChar_y - 45, 45, 40, PI, 0);
  fill(255, 215, 0);
  arc(gameChar_x - 1, gameChar_y - 39, 45, 30, 0, PI);
  fill(75, 0, 130);
  ellipse(gameChar_x, gameChar_y - 46, 60, 20);
  fill(112, 128, 144);
  ellipse(gameChar_x, gameChar_y - 40, 80, 20);
  fill(255, 255, 255);
  ellipse(gameChar_x + 20, gameChar_y - 40, 10, 10);
  ellipse(gameChar_x, gameChar_y - 40, 10, 10);
  ellipse(gameChar_x - 20, gameChar_y - 40, 10, 10);
}

// function to draw character walking left
function drawWalkingLeft() {
  fill(238, 232, 170);
  beginShape();
  vertex(gameChar_x - 9, gameChar_y - 35);
  vertex(gameChar_x - 28, gameChar_y + 7);
  vertex(gameChar_x - 3, gameChar_y + 7);
  vertex(gameChar_x + 6, gameChar_y - 35);
  endShape();
  //UFO Body
  fill(135, 206, 235);
  arc(gameChar_x - 1, gameChar_y - 45, 45, 40, PI, 0);
  fill(255, 215, 0);
  arc(gameChar_x - 1, gameChar_y - 39, 45, 30, 0, PI);
  fill(75, 0, 130);
  ellipse(gameChar_x, gameChar_y - 46, 60, 20);
  fill(112, 128, 144);
  ellipse(gameChar_x, gameChar_y - 40, 80, 20);
  fill(255, 255, 255);
  ellipse(gameChar_x + 20, gameChar_y - 40, 10, 10);
  ellipse(gameChar_x, gameChar_y - 40, 10, 10);
  ellipse(gameChar_x - 20, gameChar_y - 40, 10, 10);
}

// function to draw character walking right
function drawWalkingRight() {
  fill(238, 232, 170);
  beginShape();
  vertex(gameChar_x - 9, gameChar_y - 35);
  vertex(gameChar_x, gameChar_y + 7);
  vertex(gameChar_x + 25, gameChar_y + 7);
  vertex(gameChar_x + 6, gameChar_y - 35);
  endShape();
  //UFO Body
  fill(135, 206, 235);
  arc(gameChar_x - 1, gameChar_y - 45, 45, 40, PI, 0);
  fill(255, 215, 0);
  arc(gameChar_x - 1, gameChar_y - 39, 45, 30, 0, PI);
  fill(75, 0, 130);
  ellipse(gameChar_x, gameChar_y - 46, 60, 20);
  fill(112, 128, 144);
  ellipse(gameChar_x, gameChar_y - 40, 80, 20);
  fill(255, 255, 255);
  ellipse(gameChar_x + 20, gameChar_y - 40, 10, 10);
  ellipse(gameChar_x, gameChar_y - 40, 10, 10);
  ellipse(gameChar_x - 20, gameChar_y - 40, 10, 10);
}

// function to draw character jumping face forward
function drawJumpingFacingForwards() {
  fill(238, 232, 170);
  beginShape();
  vertex(gameChar_x - 9, gameChar_y - 50);
  vertex(gameChar_x - 14, gameChar_y - 8);
  vertex(gameChar_x + 11, gameChar_y - 8);
  vertex(gameChar_x + 6, gameChar_y - 50);
  endShape();
  //UFO Body
  fill(135, 206, 235);
  arc(gameChar_x - 1, gameChar_y - 45, 45, 40, PI, 0);
  fill(255, 215, 0);
  arc(gameChar_x - 1, gameChar_y - 39, 45, 30, 0, PI);
  fill(75, 0, 130);
  ellipse(gameChar_x, gameChar_y - 46, 60, 20);
  fill(112, 128, 144);
  ellipse(gameChar_x, gameChar_y - 40, 80, 20);
  fill(255, 255, 255);
  ellipse(gameChar_x + 20, gameChar_y - 40, 10, 10);
  ellipse(gameChar_x, gameChar_y - 40, 10, 10);
  ellipse(gameChar_x - 20, gameChar_y - 40, 10, 10);
}

// function to draw character facing forward standing
function drawStandingFrontFacing() {
  fill(238, 232, 170);
  beginShape();
  vertex(gameChar_x - 9, gameChar_y - 35);
  vertex(gameChar_x - 14, gameChar_y + 7);
  vertex(gameChar_x + 11, gameChar_y + 7);
  vertex(gameChar_x + 6, gameChar_y - 35);
  endShape();
  //UFO Body
  fill(135, 206, 235);
  arc(gameChar_x - 1, gameChar_y + -45, 45, 40, PI, 0);
  fill(255, 215, 0);
  arc(gameChar_x - 1, gameChar_y - 39, 45, 30, 0, PI);
  fill(75, 0, 130);
  ellipse(gameChar_x, gameChar_y - 46, 60, 20);
  fill(112, 128, 144);
  ellipse(gameChar_x, gameChar_y - 40, 80, 20);
  fill(255, 255, 255);
  ellipse(gameChar_x + 20, gameChar_y - 40, 10, 10);
  ellipse(gameChar_x, gameChar_y - 40, 10, 10);
  ellipse(gameChar_x - 20, gameChar_y - 40, 10, 10);
}
