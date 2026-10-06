// DM2008 — Mini Project
// FLAPPY BIRD (Starter Scaffold)
//
// Complete this scaffold into a playable game.
// Your game should have player control, collision detection,
// score tracking, and at least two game states.
//
// Not sure where to start? Try this order:
// 1. Get the bird flapping — add control in keyPressed()
// 2. Get pipes spawning — uncomment the spawn logic in draw()
// 3. Add collision detection between the bird and pipes
// 4. Add scoring when the bird passes a pipe
// 5. Add game states — at minimum a playing state and a game over state
//
// Stretch: add a start screen, a high score, or a difficulty curve.

/* ----------------- Globals ----------------- */
let bird;
let pipes = [];
let score = 0;
let spawnCounter = 0;
let button;

let penImg;
let bgImg;

//let gameFont;

let mySound;
let musicStarted = false;

const SPAWN_RATE = 90;
const PIPE_SPEED = 2.5;
const PIPE_GAP = 200;
const PIPE_W = 60;

// Game states: "playing" or "gameover" — add more if you need them
let gameState = "playing";

/* ----------------- Setup & Draw ----------------- */

async function setup() {
  penImg = await loadImage('assets/pen.png');
  bgImg = await loadImage('assets/bg.png');
  
  mySound = await loadSound('assets/bgm.mp3');
  //gameFont = await loadFont('assets/font.ttf');

  textFont('Courier New');
  
  createCanvas(500, 500);
  noStroke();
  bird = new Bird(120, height / 2 - 100);
  pipes.push(new Pipe(width + 40));

  //button
  button = createButton('RESTART');
  button.position(width / 2 - button.width/2 , height / 2 + 32);
  button.mousePressed(restart);
  button.style("display", "none");
}

function draw() {
  image(bgImg, 0, 0, width, height);

  if (gameState === "playing") {
    bird.update();

    // Spawn a new pipe every SPAWN_RATE frames, then reset the counter
    spawnCounter++;
    if (spawnCounter >= SPAWN_RATE) {
      pipes.push(new Pipe(width + 40));
      spawnCounter = 0;
    }

    for (let i = pipes.length - 1; i >= 0; i--) {
      pipes[i].update();
      pipes[i].show();

      // When the bird hits a pipe, trigger game over
      if (pipes[i].hits(bird)) {
        gameState = "gameover"
        mySound.stop();
        musicStarted = false;
      }

      // When the bird passes a pipe, increment the score
      // Hint: use pipes[i].passed to make sure you only score once per pipe
      if (!pipes[i].passed && pipes[i].x + pipes[i].w < bird.pos.x) {
        // increment score here
        score += 1;
        pipes[i].passed = true;
      }

      if (pipes[i].offscreen()) {
        pipes.splice(i, 1);
      }
    }

    bird.show();

    // Display the score — look up textAlign() and textSize() in the p5.js reference
    textSize(16);
    textAlign(LEFT);
    fill(255);
    text('score: ' + score, 10, 20);
  }

  if (gameState === "gameover") {
    // What should the player see when the game ends?
    // How do they restart?
    displayGameOverScreen();
  }
}

/* ----------------- Input ----------------- */
function keyPressed() {
  if (key === ' ' || key === UP_ARROW) {
    bird.flap();

    if(!musicStarted) {
      mySound.loop(true);
      mySound.play();
      musicStarted = true;
    }
  }
}

function displayGameOverScreen() {
  // dark transparent overlay
  fill(0, 0, 0, 150);
  rect(0, 0, width, height);

  // game over panel
  fill(0, 0, 0, 180);
  rect(width / 2 - 140, height / 2 - 100, 280, 180, 15);
  
  // GAME OVER
  fill(255);
  textAlign(CENTER);
  textSize(32);
  textStyle(BOLD);
  text('GAME OVER!', width / 2, height / 2 - 40);

  // SCORE
  textSize(20);
  textStyle(NORMAL);
  text('SCORE : ' + score, width / 2, height / 2 + 10);

  button.style("display", "block");
}

function restart() {
  bird.pos = createVector(120, height / 2 - 100);

  bird.vel = createVector(0, 0);
  bird.acc = createVector(0, 0);
  
  pipes = [];
  pipes.push(new Pipe(width + 40));
  
  score = 0;
  spawnCounter = 0;
  gameState = "playing";
  
  button.style("display", "none");
}
