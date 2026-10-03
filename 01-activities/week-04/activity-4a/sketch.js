// DM2008 — Activity 4a [Guided]
// Bake a Cookie (30 min)
//
// A class is a blueprint — Cookie describes what every cookie has and can do.
// Your job is to complete the class, then add movement and a flavor randomizer.
//
// Suggested order:
// 1. Add the missing properties to the constructor (sz, x, y)
// 2. Fix show() so it uses this.flavor, this.x, this.y, this.sz
// 3. Implement move() and randomFlavor()
// 4. Wire them up in keyPressed() and mousePressed()
//
// Stretch: add a second cookie with different starting values.

let cookie;
let flavorList;

function setup() {
  createCanvas(400, 400);
  noStroke();
  cookie = new Cookie("blueberry", 80, width / 2, height / 2);
  flavorList = ["chocolate", "vanilla", "blueberry"];
}

function draw() {
  background(230);
  cookie.show();
}

class Cookie {
  constructor(flavor, sz, x, y) {
    this.flavor = flavor;
    this.sz = sz;
    this.x = x;
    this.y = y;
  }

  show() {
    // Fix this method — it should use this.flavor, this.x, this.y, this.sz
    switch (this.flavor) {
      case "chocolate":
        fill("#5e3712");
        break;
      case "vanilla":
        fill("#eeeb9b");
        break;
      case "blueberry":
        fill("#5846b4")
        break;
      default:
        fill("#000000");
    }
    ellipse(this.x, this.y, this.sz);
  }

  // Add a move() method — update this.x or this.y based on which key is pressed
  move() {
    this.x = random(width);
    this.y = random(height);
  }

  // Add a randomFlavor() method — set this.flavor to one of at least 3 options
  randomFlavor() {
    this.flavor = random(flavorList);
  }
}

// Call cookie.move() when an arrow key is pressed
function keyPressed() {
  if (key === UP_ARROW) {
    cookie.move();
  } 
}

// Call cookie.randomFlavor() when the mouse is clicked
function mousePressed() {
  cookie.randomFlavor();
}