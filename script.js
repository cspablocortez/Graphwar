let func = ''; 
let input; 
let button; 
let history = [];


function setup() {
  createCanvas(600, 500);

  input = select('#functionInput');
  button = select('#plotButton');
  button.mousePressed(sanitizeInput); 

  // 1-3 circles using the circle(X, Y, Diameter);

  setObstacles();
}
  
function draw() {

  stroke(255);
  line(0, height / 2, width, height / 2);                   // X-axis
  line(width / 2, 0, width / 2, height);                    // Y-axis

  if (func) {
    history.push(func);
    plot();
  }
}

function setObstacles() {
  let obstacleAmount = random(3, 9);
  fill(10, 113, 53);
  for (let i = 0; i <= obstacleAmount; i++) {
    let x = random(0, width);
    let y = random(0, height);
    let diameter = random(10, 100);

    circle(x, y, diameter);
  }
}

function sanitizeInput() {
  func = input.value().replace('^', '**').replace(/ln/g, 'Math.log'); 
}

function plot() {
  noFill();
  stroke(0, 151, 101);

  beginShape();
  for (let x = -width / 2; x < width / 2; x++) {
      let xCoord = x + width / 2;
      let y;
      try {
          y = eval(func.replace(/x/g, `(${x})`));
          vertex(xCoord, height / 2 - y);
      } catch (e) {
          console.error("Invalid function input", e);
          break;
      }
  }
  endShape();
  
}