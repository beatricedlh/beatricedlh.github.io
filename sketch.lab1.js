function setup() {
    createCanvas(windowWidth, windowHeight);
    background(255);
}

function draw() {
    background(255);
    stroke(0);
    fill(244);

    for (let y = 0; y < height; y += 30) {
        for (let x = 0; x < width; x += 30) {
            rect(x, y, 20, 20, 5);
        }
    }

    fill(244);
    stroke(0);
    rect(mouseX - 10, mouseY - 10, 20, 20, 5);
}