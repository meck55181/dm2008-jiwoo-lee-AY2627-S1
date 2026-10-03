// DM2008 — Activity 1a
// Simple Creatures (20 min)

// Run the sketch, then click on the preview to enable keyboard
// Use the 'Option' ('Alt' on Windows) key to view or hide the grid
// Use the 'Shift' key to change overlays between black & white
// Write the code for your creature within the space provided

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background("#b5eaf2");

  fill(0);
  rect(150, 150, 100, 100);

  fill(0);
  triangle(70, 250, 150, 150, 150, 250);
  
  fill(0);
  triangle(250, 205, 280, 300, 300, 250);
  triangle(250, 205, 280, 150, 300, 150);

  fill(255);
  ellipse(130, 200, 8, 8);

  fill("#ff7300");
  triangle(170, 220, 170, 200, 190, 220);
  rect(200, 150, 8, 100);
  rect(220, 150, 8, 100);
  
  
  helperGrid(); // do not edit or remove this line
}
