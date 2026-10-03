// DM2008 — Activity 2b [Guided]
// Pattern Making (40 min)
//
// Use a for loop to draw a repeating row of shapes.
// Add a condition to introduce variation — alternating color, size, or spacing.
// Then add one interaction (mouse or key) that changes the rule.
//
// Stretch: try a second row, or turn your row into a 2D grid.

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(0);
  

  for (let i = 0; i < width; i += 50) {
    // % (modulo) alternates between 0 and non-zero — good for switching every other shape
    if (mouseIsPressed) {
      for(let i = 170; i < 240; i += 10){
        stroke(355);
        strokeWeight(1);

        line(0, i, 400, i);
      }
      //music lines(done by hand)
      strokeWeight(3);
      line(40,140, 40, 200);
      line(90,140, 90, 200);
      line(40,140, 90, 140);
      
      line(140,140, 140, 200);

      line(195,200, 195, 260);
      
      line(240,140, 240, 200);
      line(290,140, 290, 200);
      line(240,140, 290, 140);

      line(340,200, 340, 260);
      line(390,200, 390, 260);
      
    } else if (i % 100 == 0) {
      strokeWeight(1);
      stroke(0);
      fill(0);
    } else {
      strokeWeight(1);
      stroke(0);
      fill(355);
    }

    ellipse(i + 25, height / 2, 40);
  }
}