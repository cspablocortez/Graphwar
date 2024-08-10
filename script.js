let func = ''; 
let input; 
let button; 


function setup() {
    createCanvas(600, 500);

    input = select('#functionInput');
    button = select('#plotButton');
    button.mousePressed(sanitizeInput); 
    
}
  
  function draw() {

    stroke(255);
    line(0, height / 2, width, height / 2);                   // X-axis
    line(width / 2, 0, width / 2, height);                    // Y-axis

    if (func) {
      plot();
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