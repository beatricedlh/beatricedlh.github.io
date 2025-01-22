let x = 0;

function setup() {
  let canvas = createCanvas(300, 25);
  canvas.parent("simple-animation");
}

function draw() {
  background(255);

  fill(255);
  stroke(0);
  ellipse(x, height / 2, 10, 10)

  x = (x + 2) % width;
}