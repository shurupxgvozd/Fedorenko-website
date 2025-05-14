let circleX;
let circleY;
let circleRadius;
let circleMaximumRadius;
let circleColor;
let score = 0;
let highScore;

function setup() {
  createCanvas(1200, 600);
  colorMode(HSB);
  noStroke();
  ellipseMode(RADIUS);
  textSize(36);


  highScore = getItem('high score');

 
  if (highScore === null) {
    highScore = 0;
  }
}

function draw() {
  background(20);


  if (circleRadius > 0) {

    fill(circleColor);
    circle(circleX, circleY, circleRadius);
    describeElement('Circle', 'Randomly colored shrinking circle');

 
    circleRadius -= 1;

  
    textAlign(RIGHT, TOP);
    fill(220);
    text(score, width - 20, 20);
    describeElement('Score', `Text with current score: ${score}`);
  } else {

    endGame();
  }
}

function startGame() {

  score = 0;


  circleMaximumRadius = min(height / 2, width / 2);
  resetCircle();
}

function endGame() {

  noLoop();


  highScore = max(highScore, score);
  storeItem('high score', highScore);

  textAlign(CENTER, CENTER);
  fill(220);
  let startText = `Circle Clicker
  Click the circle before it gets too small
  Score: ${score}
  High score: ${highScore}
  Click to play`;
  text(startText, 0, 0, width, height);
  describeElement('Start text', `Text reading, "${startText}"`);
}

function resetCircle() {
  
  circleRadius = circleMaximumRadius;
  circleX = random(circleRadius, width - circleRadius);
  circleY = random(circleRadius, height - circleRadius);
  circleColor = color(random(240, 360), random(40, 80), random(50, 90));
}

function mousePressed() {
  
  if (isLooping() === true) {
 
    let distanceToCircle = dist(mouseX, mouseY, circleX, circleY);

    
    
    if (distanceToCircle < circleRadius) {
      
      circleMaximumRadius = max(circleMaximumRadius - 1, 15);
      resetCircle();


      score += 1;
    }

  } else {
   
    startGame();
    loop();
  }
}