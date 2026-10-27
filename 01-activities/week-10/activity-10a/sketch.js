let colorBtn, sizeSlider, shapeSelect;
let lightColor = ['black', 'white'];
let light;


function setup() {
  createCanvas(640, 400);
  noStroke();
  textFont("Helvetica, Arial, sans-serif");

  // starting color
  light = lightColor[0];

  // Button: change color
  colorBtn = createButton("Light Switch");
  colorBtn.position(16, 16);
  colorBtn.mousePressed(switchColor);

  function switchColor() {
    if(light === lightColor[0])
      light = lightColor[1];
    else if(light === lightColor[1])
      light = lightColor[0];
  }

  // Slider: controls size
  createP("Surprize Me").position(0, 50).style("margin", "4px 0 0 16px");
  sizeSlider = createSlider(20, 220, 100, 1);
  sizeSlider.position(15, 70);

  // Dropdown: choose shape
  createP("Face Shape").position(0, 100).style("margin", "8px 0 0 16px");
  shapeSelect = createSelect();
  shapeSelect.position(16, 130);
  shapeSelect.option("ellipse");
  shapeSelect.option("rect");
}

function draw() {
  background(light);

  push();
  translate(width * 0.65, height * 0.5);
  let s = sizeSlider.value();

  // face
  fill(0);
  ellipse(0, -20, 190, 150);

  // ears
  triangle(-90, -40, -100, -130, 0, -80);
  triangle(90, -40, 100, -130, 0, -80);
  
  // eyes
  fill("#d0ff8a");
  ellipse(-40, -40, 100, 100); // left eyeball-white
  ellipse(40, -40, 100, 100); // right eyeball-white
  fill(0);
  ellipse(-40, -40, s * 0.4, s * 0.4); // left pupil-black
  ellipse(40, -40, s * 0.4, s * 0.4); // right pupil-black

  // nose
  fill("#ffd6d6");
  triangle(-12, 5, 0, 20, 12, 5);

  // change mouth shape
  let choice = shapeSelect.value();
  if (choice === "ellipse") {
    fill(255);
    ellipse(0, 30, 5, 5);
  } else if (choice === "rect") {
    fill(255);
    rectMode(CENTER);
    rect(0, 30, 5, 5);
  }
  
  pop();
}
