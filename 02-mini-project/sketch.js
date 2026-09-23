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

const SPAWN_RATE = 90;
const PIPE_SPEED = 2.5;
const PIPE_GAP = 200;
const PIPE_W = 60;

// Game states: "playing" or "gameover" — add more if you need them
let gameState = "playing";

/* ----------------- Setup & Draw ----------------- */
function setup() { 
  createCanvas(480, 500);
  noStroke();
  bird = new Bird(120, height / 2 - 100);
  pipes.push(new Pipe(width + 40));

    //button
  button = createButton('RESTART');
  button.position(width/2 - 20, height/2 + 80);
  button.mousePressed(restart);
  button.style("display", "none");
}

function draw() {
  background(18, 22, 28);

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
    text(score, 10, 20) 
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
  }
}

function displayGameOverScreen() {
  fill(255);
  textAlign(CENTER);
  textSize(32);
  text('GAMEOVER', width/2, height/2);
  text(score, width/2, height/2 + 40);
  button.style("display", "block");
}

function restart() {
  bird.pos = createVector(120, height / 2 - 100);
  pipes = [];
  pipes.push(new Pipe(width + 40));
  score = 0;
  spawnCounter = 0;
  gameState = "playing";
  button.style("display", "none");
}

/* ----------------- Classes ----------------- */
class Bird {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);
    this.r = 16;
    this.gravity = 0.45;
    this.flapStrength = -8.0;
  }

  applyForce(fy) {
    this.acc.y += fy;
  }

  flap() {
    // A negative y velocity moves the bird upward
    this.vel.y = this.flapStrength;
  }

  update() {
    this.applyForce(this.gravity);
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(0);

    // Keep the bird within the canvas vertically
    if (this.pos.y < this.r) {
      this.pos.y = this.r;
      this.vel.y = 0;
    }

    // Touching the ground is game over — same as hitting a pipe
    if (this.pos.y > height - this.r) {
      this.pos.y = height - this.r;
      this.vel.y = 0;
      gameState = "gameover";
    }
  }

  show() {
    fill(255, 205, 80);
    circle(this.pos.x, this.pos.y, this.r * 2);
    fill(40);
    circle(this.pos.x + 6, this.pos.y - 4, 4);
  }
}