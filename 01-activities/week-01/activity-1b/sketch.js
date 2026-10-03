// DM2008 — Activity 1b [Georg Nees]
// Learning By Making (30 min)

let x;
let y;
let w;

function setup() {
  createCanvas(800, 800);
  background(173, 240, 226);
  frameRate(5);
}

function draw() {
  
  x = random(width);
  y = random(height);
  a = random(width);
  b = random(height);
  w = random(10, 80);
  
  // background(240,40);
  
  stroke(0);
  strokeWeight(1);
  fill(232, 34, 16);
  rect(x, y, w, w);
  fill(250, 234, 55);
  ellipse(a, b, w, w);
  triangle(30, 75, 58, 20, 86, 75);

}

function keyPressed() {
  saveCanvas("activity1b-image", "jpg");
}