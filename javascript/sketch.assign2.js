// Inspo: https://dev.to/amirhossein_veysi/pixelart-tool-using-p5js-4f3a
// Inspo: https://editor.p5js.org/Cecilezz/sketches/6Zm8mqqrW

let grid = [];
let cols = 40; // Number of columns in the grid
let rows = 40; // Number of rows in the grid
let cellSize = 15; // Size of each cell
let selectedColor = '#000000'; // Sets to black

function setup() {
    // Source: https://p5js.org/reference/p5/createDiv/
    // Source: https://p5js.org/reference/p5.Element/addClass/
    let container = createDiv('').addClass('gridContainer'); // Creates a div for the canvas + names it
    let canvas = createCanvas(cols * cellSize, rows * cellSize);

    // Source: https://p5js.org/reference/p5.Element/parent/
    canvas.parent(container); // Attaches canvas to the div

    for (let i = 0; i < cols; i++) { // Loops through all grid cells and sets them to white
        grid[i] = [];
        for (let j = 0; j < rows; j++) {
        grid[i][j] = '#ffffff';
        }
    }

    interface();
}

function draw() {
    background('#ffffff');
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
        fill(grid[i][j]);
        stroke(0);
        rect(i * cellSize, j * cellSize, cellSize, cellSize);
        }
    }
}

// Source: https://p5js.org/reference/p5.Element/mousePressed/
function mousePressed() {
    // Source: https://p5js.org/reference/p5/floor/
    let x = floor(mouseX / cellSize); // Converts mouse position to grid coordinates (using whole numbers)
    let y = floor(mouseY / cellSize);
    if (x >= 0 && x < cols && y >= 0 && y < rows) {
        grid[x][y] = selectedColor; // Updates cell colour
    }
}

function interface() {
    let sideNav = document.querySelector('.sideNav'); // Side menu div
    
    // Source: https://p5js.org/reference/p5/createColorPicker/
    let colorPicker = createColorPicker('#000000');
    colorPicker.parent(sideNav);
    colorPicker.input(() => selectedColor = colorPicker.value());
  
    // Source: https://p5js.org/reference/p5/createButton/
    let refreshButton = createButton('Refresh'); // Creates a button to clear the grid
    refreshButton.parent(sideNav);
    refreshButton.addClass('refreshBtn');
    refreshButton.mousePressed(() => { // Resets to white
        for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            grid[i][j] = '#ffffff';
        }
        }
    });
  
    let downButton = createButton('Download'); // Creates button to download the grid
    downButton.parent(sideNav);
    downButton.addClass('downloadBtn');

    //Source: https://p5js.org/reference/p5.Image/save/
    downButton.mousePressed(() => {
        saveCanvas('ASSIGNMENT_1_IMG.jpeg'); //
    });
}
