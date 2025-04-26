// inspo (loading screen): https://css-loaders.com/classic/
// inspo (mouse trail): https://openprocessing.org/sketch/776272/

// sparkle trail variables
var sparkles = [];
var sparkleChars = ['₊', '˚', '⊹', '⋆'];
var trailActive = false; // false when floating sparkle isnt clicked

// loading screen variables
var loading = true;
var fadeOut = false;
var fadeAlpha = 255; // for fading effect
var loadingText = "⋆₊✧˚⋅˖⊹";
var displayedText = ""; 
var typingSpeed = 10; // controls typing speed
var repeatCount = 0; 
var maxRepeats = 3; // after 3 loops, loading ends
var typingPhase = "typing";
var typingTimer = 0; 
var currentIndex = 0;

// floating sparkle variables
var sparkleImg;
var sparkleDot = {
  x: 0, // position x
  y: 0, // position y
  dx: 2, // speed x
  dy: 1.5, // speed y
  size: 80, // size of sparkle image
  clicked: false // true when floating sparkle is clicked
};
var sparkleDelay = 5000; // wait 5 seconds before showing floating sparkle
var startTime;

// load sparkle image
function preload() {
  sparkleImg = loadImage("images/icon.png");
}

function setup() {
  document.body.style.pointerEvents = "none"; // turns off clicks during loading

  startTime = millis(); // store time since page started
  textAlign(CENTER, CENTER);
  textSize(32);

  // make canvas cover entire page height
  var canvasHeight = max(document.body.scrollHeight, document.documentElement.scrollHeight);
  var canvas = createCanvas(windowWidth, canvasHeight);
  canvas.position(0, 0);
  canvas.style('z-index', '1000');
  canvas.style('pointer-events', 'none');

  noStroke();

  // random starting position (either from top, left, or right)
  var sides = ['left', 'right', 'top'];
  var side = random(sides);

  if (side === 'left') {
    sparkleDot.x = -100;
    sparkleDot.y = random(100, canvasHeight - 100);
  } else if (side === 'right') {
    sparkleDot.x = width + 100;
    sparkleDot.y = random(100, canvasHeight - 100);
  } else if (side === 'top') {
    sparkleDot.x = random(100, width - 100);
    sparkleDot.y = -100;
  }
}

function draw() {
  clear(); // clear the canvas each frame

  // loading screen animation
  if (loading) {
    background(255);

    fill(0);
    textSize(24);

    // type out the loading text one letter at a time
    if (frameCount % typingSpeed === 0) {
      if (typingPhase === "typing") {
        if (currentIndex < loadingText.length) {
          currentIndex++;
        } else {
          typingPhase = "waiting"; // pause after typing all letters
          typingTimer = frameCount;
        }
      }
    }

    // after short pause, reset typing
    if (typingPhase === "waiting" && frameCount - typingTimer > 30) {
      currentIndex = 0;
      typingPhase = "typing";
      repeatCount++;
    }

    // reference: https://www.w3schools.com/jsref/jsref_substring.asp
    // substring shows only part of the full text (from start to currentIndex)
    displayedText = loadingText.substring(0, currentIndex);
    text(displayedText, width / 2, windowHeight / 2);

    if (repeatCount >= maxRepeats) {
      loading = false;
      fadeOut = true;
    }

    return; // stop drawing here until loading is done
  }

  // fading white screen after animation is done
  if (fadeOut) {
    background(255, fadeAlpha);
    fadeAlpha -= 30;
    if (fadeAlpha <= 0) {
      fadeOut = false;
      document.body.style.pointerEvents = "auto"; // turns on clicks after loading
    }
    return;
  }

  // draw sparkle trail (after floating sparkle is clicked)
  for (var i = sparkles.length - 1; i >= 0; i--) {
    var s = sparkles[i];
    fill(0, s.alpha);
    textSize(s.size);
    text(s.char, s.x, s.y);
    s.alpha -= 12; // fade out
    if (s.alpha <= 0) {
      sparkles.splice(i, 1); // remove faded sparkles
    }
  }

  // floating sparkle appears after delay (before clicking)
  if (!sparkleDot.clicked && millis() - startTime > sparkleDelay) {
    push();
    translate(sparkleDot.x + sparkleDot.size / 2, sparkleDot.y + sparkleDot.size / 2);
    rotate(frameCount * 0.05); // slow spinning
    imageMode(CENTER);
    image(sparkleImg, 0, 0, sparkleDot.size, sparkleDot.size);
    pop();

    // move sparkle
    sparkleDot.x += sparkleDot.dx * 1.5;
    sparkleDot.y += sparkleDot.dy * 1.5;

    // bounce off screen edges
    var buffer = 100;
    if (sparkleDot.x < -buffer || sparkleDot.x > width + buffer) {
      sparkleDot.dx *= -1;
    }
    if (sparkleDot.y < -buffer || sparkleDot.y > height + buffer) {
      sparkleDot.dy *= -1;
    }
  }
}

function mouseMoved() {
  // after clicking the floating sparkle, this creates small random sparkles following the mouse
  if (!trailActive) return;

  if (frameCount % 2 === 0) {
    var sparkle = {
      x: mouseX + random(-4, 4),
      y: mouseY + random(-4, 4),
      alpha: 255, // start fully visible
      size: random(14, 20), // random size
      char: random(sparkleChars) // random sparkle symbol
    };
    sparkles.push(sparkle); // add to trail array
  }
}

function mousePressed() {
  // when user clicks on the floating sparkle, activate the sparkle trail
  if (sparkleDot.clicked || millis() - startTime < sparkleDelay) return;

  var d = dist(mouseX, mouseY, sparkleDot.x + sparkleDot.size / 2, sparkleDot.y + sparkleDot.size / 2);
  if (d < sparkleDot.size / 2) {
    sparkleDot.clicked = true;
    trailActive = true;
  }
}

function windowResized() {
  // keep canvas full page size if window size changes
  var canvasHeight = max(document.body.scrollHeight, document.documentElement.scrollHeight);
  resizeCanvas(windowWidth, canvasHeight);
}