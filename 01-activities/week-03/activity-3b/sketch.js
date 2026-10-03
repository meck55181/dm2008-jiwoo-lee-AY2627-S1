// DM2008 — Activity 3b
// One Function Wonder (20 min)
//
// Write a function that draws a shape or group of shapes.
// It should take at least one parameter — try x, y, size, or color.
// Call it several times with different values to create variation.
//
// Ideas: a simple face, a flower, a house, an icon.
// Example: myShape(100, 200, 50); myShape(300, 200, 80);
//
// Stretch: call your function inside a for loop to create a repeating pattern.

function setup() {
  createCanvas(400, 400);
  rectMode(CENTER);
  sz = 100;
  rot = 0;
}

function draw() {
  background(220);

  push();
  translate(width, height);
  rotate(rot);
  scale(1, 1);
  fill(100, 200, 250);
  myShape(width / 4, height / 4, sz);
  pop();

  push();
  translate(width, height);
  rotate(rot);
  scale(1, 1);
  fill(100, 200, 250);
  myShape(height / 4, width / 4, sz);
  pop();

  rect(mouseX, mouseY, 5, 5);

  rot = rot + 0.15;
  
}

// Define your function outside draw()
// It can be called from anywhere in your sketch

function myShape(x, y, s) {
  fill(color(0, 100, 0));
  rect(x, y, s, s);
}