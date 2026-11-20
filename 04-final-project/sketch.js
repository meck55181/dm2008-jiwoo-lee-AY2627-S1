// Serial connection
let port;
let connectBtn;
let wasOpened = false;

// Sensor and Animation
let sensorVal = 0;
let circleSize = 50;
let targetSize = 50;

// Direction buttons
let prevLeft = 1;
let prevRight = 1;
let prevUp = 1;
let prevDown = 1;

// Thresholds
const PRESS_THRESHOLD = 150;
const RELEASE_THRESHOLD = 80;

// Timing: dot or dash + pause for one letter input
const DOT_TIME = 300;
const LETTER_GAP = 800; // ?ntc: pause for one letter input


// Morse Code
const morseCode = {
  ".---": "E",
  "--.-": "T",
  "-.--": "A",
  "-.-.": "O",
  ".--.": "I",
  "-..-": "N",
  "--..": "S",
  "-...": "R",
  "..-.": "H",
  ".-..": "D",
  "...-": "L",
  "....": "U",
  "---": "C",
  "--.": "M",
  "-.-": "F",
  ".--": "Y",
  "-..": "W",
  ".-.": "G",
  "..-": "P",
  "...": "B",
  "--": "V",
  ".-": "K",
  "-.": "X",
  "..": "Q",
  "-": "J",
  ".": "Z"
};
let morse = "";

// Press state
let lastRelease = 0;
let pressStart = 0;
let isPressed = false;

// Grid + Selected cell
const COLS = 12;
const ROWS = 12;
let grid = [];
let cursorX = 0;
let cursorY = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);

  port = createSerial();

  connectBtn = createButton("Connect to Arduino");
  connectBtn.position(20, 20);
  connectBtn.mousePressed(connectBtnClick);

  for (let y = 0; y < ROWS; y++) {
    grid[y] = [];

    for (let x = 0; x < COLS; x++) {
      grid[y][x] = "";
    }
  }
}

function draw() {
  background(230);

  updateConnectBtn();

  if (port.opened()) {
    let data = port.readUntil("\n");

    if (data && data.trim() !== "") {
      let values = data.trim().split(",");

      if (values.length === 5) {
        let val = Number(values[0]);
        let left = Number(values[1]);
        let right = Number(values[2]);
        let up = Number(values[3]);
        let down = Number(values[4]);

        if ([val, left, right, up, down].every(Number.isFinite)) {
          sensorVal = val;

          if (!isPressed && val >= PRESS_THRESHOLD) {
            setPressed(true);
          } else if (isPressed && val <= RELEASE_THRESHOLD) {
            setPressed(false);
          }

          if (left === 0 && prevLeft === 1) {
            cursorX = max(0, cursorX - 1);
          }

          if (right === 0 && prevRight === 1) {
            cursorX = min(COLS - 1, cursorX + 1);
          }

          if (up === 0 && prevUp === 1) {
            cursorY = max(0, cursorY - 1);
          }

          if (down === 0 && prevDown === 1) {
            cursorY = min(ROWS - 1, cursorY + 1);
          }

          prevLeft = left;
          prevRight = right;
          prevUp = up;
          prevDown = down;
        }
      }
    }
  }


  targetSize = isPressed ? 200 : 100;
  circleSize = lerp(circleSize, targetSize, 0.1);

  noStroke();
  fill(200, 61, 50);

  ellipse(width * 0.25, height / 2, circleSize);

  decodeMorse();

  fill(200, 61, 50);
  textSize(24);
  textAlign(CENTER);

  text(morse, width * 0.25, height / 2 + 150);

  drawGrid();

  fill(80);
  textSize(14);
  textAlign(LEFT);

  text("Sensor: " + sensorVal, 20, 75);
}

function drawGrid() {

  let cellSize = min(
    (width * 0.45) / COLS,
    (height * 0.75) / ROWS
  );

  let startX = width * 0.5;
  let startY = (height - cellSize * ROWS) / 2;

  for (let y = 0; y < ROWS; y++) {
    for (let x = 0; x < COLS; x++) {

      let px = startX + x * cellSize;
      let py = startY + y * cellSize;

      if (x === cursorX && y === cursorY) {
        fill(255, 210, 200);
      } else {
        fill(255);
      }

      stroke(80);
      strokeWeight(1);

      rect(px, py, cellSize, cellSize);

      noStroke();
      fill(30);
      textAlign(CENTER, CENTER);
      textSize(cellSize * 0.55);

      text(
        grid[y][x],
        px + cellSize / 2,
        py + cellSize / 2
      );
    }
  }
}

function setPressed(value) {

  if (isPressed === value) return;

  isPressed = value;

  if (isPressed) {
    pressStart = millis();
  } else {

    let duration = millis() - pressStart;

    if (duration < DOT_TIME) {
      morse += ".";
    } else {
      morse += "-";
    }

    lastRelease = millis();
  }
}

function keyPressed() {

  if (keyCode === 32 && !port.opened()) {
    setPressed(true);
    return false;
  }

  if (keyIsDown(LEFT_ARROW)) {
    cursorX = max(0, cursorX - 1);
    return false;
  }

  if (keyIsDown(RIGHT_ARROW)) {
    cursorX = min(COLS - 1, cursorX + 1);
    return false;
  }

  if (keyIsDown(UP_ARROW)) {
    cursorY = max(0, cursorY - 1);
    return false;
  }

  if (keyIsDown(DOWN_ARROW)) {
    cursorY = min(ROWS - 1, cursorY + 1);
    return false;
  }

  if (keyIsDown(BACKSPACE) || keyIsDown(DELETE)) {
    grid[cursorY][cursorX] = "";
    return false;
  }

  if (key === "r" || key === "R") {
    resetGrid();
    return false;
  }
}

function keyReleased() {

  if (keyCode === 32 && !port.opened()) {
    setPressed(false);
    return false;
  }
}

function decodeMorse() {

  if (!isPressed && morse !== "" &&
      millis() - lastRelease > LETTER_GAP) {

    let letter = morseCode[morse] || "?";

    grid[cursorY][cursorX] = letter;

    morse = "";
  }
}

function resetGrid() {

  for (let y = 0; y < ROWS; y++) {
    for (let x = 0; x < COLS; x++) {
      grid[y][x] = "";
    }
  }

  cursorX = 0;
  cursorY = 0;

  morse = "";
}

function connectBtnClick() {

  if (!port.opened()) {
    port.open(9600);
  } else {
    port.close();
  }
}

function updateConnectBtn() {

  let isOpened = port.opened();

  if (isOpened === wasOpened) return;
  wasOpened = isOpened;

  connectBtn.html(
    isOpened ? "Disconnect Arduino" : "Connect to Arduino"
  );

  if (isOpened) {
    connectBtn.addClass("connected");
  } else {
    connectBtn.removeClass("connected");
    if (isPressed) setPressed(false);
  }
}
