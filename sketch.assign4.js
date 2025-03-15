// Inspo: https://thecodingtrain.com/challenges/169-pi-in-the-sky
// Inspo: https://www.youtube.com/watch?v=YQysSfaLDyo&ab_channel=MindForCode

var raindrops = [];                                               // Stores raindrops
var missedRaindrops = [];                                         // Tracks dodged raindrops
var hitRaindrops = [];                                            // Tracks hit raindrops
var gameData = [];                                                // Stores game stats
var player;
var gameOver = false;                                             // Turns game on (true = game stops)
var playerImg;                                                    // Defines miffy's image
var rainChance = 0.05;                                            // Sets initial rain probability

// Source: https://p5js.org/reference/p5/preload/
function preload(){
  playerImg = loadImage("../images/miffy_choc.png");;             // Loads miffy's image
}

function setup(){
  createCanvas(windowWidth, windowHeight);                        // Sets canvas size to full screen
  player = {
    y: height - 100,                                              // Places miffy at the bottom of the screen
    width: 88.5,                                                  // Defines the size of miffy's image
    height: 144
  };
}

function draw(){
    if (gameOver){                                               // If the game is over, then the gameOver div displays, and the game stops
      document.getElementById("gameOver").style.display = "block";
      return;
    }
  
    background(255);
    
    if (frameCount % 125 === 0){                                  // Increases the rain probability every 125 frames (max of 40%)
      // Source: https://p5js.org/reference/p5/min/
      rainChance = min(rainChance + 0.02, 0.4);
    }

    if (random(1) < rainChance){
      let drop = {
        x: random(width),                                         // Picks a random horizontal position
        y: random(-50, -10),                                      // Places them slighty above the screen
        width: random(3, 10),                                     // Picks a random width
        height: random(20, 30),                                   // Picks a random height
        speed: 2,                                                 // Sets initial speed
        acceleration: 0.4,                                        // Sets gravity acceleration
      };
      raindrops.push(drop);                                       // Adds raindrop to array
    }
  
    for (var i = raindrops.length - 1; i >= 0; i--){
      var drop = raindrops[i];
  
      drop.speed += drop.acceleration;                            // Increases speed (gravity)
      drop.y += drop.speed;                                       // Moves down
  
      fill(245);                                                  // Fill colour
      rect(drop.x, drop.y, drop.width, drop.height, 10);          // Rounded corners
  
      if (isHit(drop, player)){                                   // If miffy is hit, then store the raindrop and stop de game
        hitRaindrops.push(drop);
        gameOver = true;
      }else if (drop.y > height){                                 // Or else, then store the missed raindrop and delete
        missedRaindrops.push(drop);
        raindrops.splice(i, 1);
      }
    }
  
    player.x = mouseX;                                             // Moves miffy left/right using mouse
    imageMode(CENTER);
    image(playerImg, player.x, player.y, player.width, player.height);

    let seconds = Math.floor(frameCount / 60);                     // Converts frames to seconds

    document.getElementById("gameStats").innerHTML =               // Updates gameStats with seconds and dodged raindrops
      "Time Survived: " + seconds + "s | Raindrops Dodged: " + missedRaindrops.length;
  }

function isHit(drop, player){                                      // Calculates if raindrops are hitting miffy (hitbox is roughly circle) 
  let radius = player.width / 2;
  // Source: https://p5js.org/reference/p5/dist/
  return dist(drop.x, drop.y, player.x, player.y) < radius;
}

function keyPressed(){                                              // Refreshes the game when space is hit
  if (key === ' '){
    location.reload();
  }
}
