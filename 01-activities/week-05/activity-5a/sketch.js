// DM2008 — Activity 5a [Guided]
// Colliding Circles (30 min)
//
// A vector stores position and movement together — cleaner than separate x and y variables.
// Your job is to get two balls moving, then detect and respond to their collision.
//
// Suggested order:
// 1. Create two Ball objects in setup()
// 2. Check the distance between them in draw()
// 3. Trigger a visual response when they collide
// 4. Implement edge behaviour in move() — wrap or bounce, your choice
//
// Stretch: add a third ball, or make the collision response affect both balls.

let balls = [];

function setup() {
  createCanvas(400, 400);
  for (let i = 0; i < 5; i++) {
    balls.push(new Ball(random(0, 100), (100, 200)));
  }
}

function draw() {
  background(230);

  // Check collision between the two balls
  // dist() measures the distance between their centers
  // They overlap when that distance is less than the sum of their radii

  for (let i = 0; i < balls.length; i++) {
    balls[i].move();
    // balls[i].show();
    balls[i].checkCollision(balls);
  }
}

class Ball {
  constructor(x, y) {
    // pos and vel are vectors — they store x and y together as one object
    this.pos = createVector(x, y);
    this.vel = createVector(random(-1, 5), random(-1, 5));
    this.r = 30;
  }

  move() {
    // Adding the velocity vector to position moves the ball each frame
    this.pos.add(this.vel);

    // Handle edges — could you make this bounce instead of wrap?
    if (this.pos.x > width) {
      this.vel.x *= -1;
    }
    if (this.pos.x < 0) {
      this.vel.x *= -1;
    }
    if (this.pos.y > height) {
      this.vel.y *= -1;
    }
    if (this.pos.y < 0) {
      this.vel.y *= -1;
    }
  }

  // show(checkCollision) {
  //colliding is true or false — try using it in an if/else to change fill or size
  // ellipse(this.pos.x, this.pos.y, this.r * 2);
  // }

  checkCollision(others) {
    
    for (let i = 0; i < others.length; i++) {
      // Make sure we do not compare the ball to itself
      if (others[i] !== this) {
        let other = others[i];
        let d = dist(this.pos.x, this.pos.y, other.pos.x, other.pos.y);
        if (d < this.r + other.r) {
          push();
          fill("#f0ff24");
          strokeWeight(1);
          stroke(51);
          ellipse(this.pos.x, this.pos.y, this.r * 2); // highlight on collision
          pop();
        }
      } else {
        fill("#8f8f8f");
        strokeWeight(1);
        stroke(51);
        ellipse(this.pos.x, this.pos.y, this.r * 2);
      }
    }
  }
}
