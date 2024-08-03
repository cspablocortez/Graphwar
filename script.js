function setup() {
    createCanvas(600, 400);
    background("#264cbf");
  }
  
  function draw() {
    if (mouseIsPressed) {
      fill(0);
    } else {
      fill(255);
    }
    ellipse(mouseX, mouseY, 10, 10);
  }