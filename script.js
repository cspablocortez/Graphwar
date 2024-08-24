let func = ''; 
let input; 
let button; 
let history = [];

let player = {
  x: 100,
  y: 100,
  diameter: 15,
  color: "#d8411c",
  label: "Player Name",
  draw: function() {
    fill(this.color);
    stroke("black");
    this.x = random(0, width - (4 * this.diameter));
    this.y = random(0, height - (4 * this.diameter));
    circle(this.x, this.y, this.diameter);
    text(this.label + " (" + floor(this.x) + "," + floor(this.y) + ")" , this.x - (4 * this.diameter), this.y - this.diameter);
  }
}


function setup() {
  createCanvas(600, 500);

  input = select('#functionInput');
  button = select('#plotButton');
  button.mousePressed(sanitizeInput); 

  // 1-3 circles using the circle(X, Y, Diameter);

  setObstacles();
  player.draw();

  console.log("Player X: " + player.x);
  console.log("Player Y: " + player.y);
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
  stroke(0, 0, 0);

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