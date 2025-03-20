var popcornSound;
var kernelImages = [];
var bucketImg;

function preload() {
  popcornSound = createAudio('/images/pop.mp3');
  bucketImg = '/images/popcorn.png';

  kernelImages = [
    '/images/kernel1.png',
    '/images/kernel2.png',
    '/images/kernel3.png',
    '/images/kernel4.png',
    '/images/kernel5.png'
  ];
}

function setup() {
    createCanvas(windowWidth - 75, windowHeight - 75);
    background('245');

    var c = select('canvas');
    c.addClass('canvas');

    var bucket = createImg(bucketImg);
    bucket.size(200, 200);
    bucket.position(20, height - 160);
}

function mousePressed() {
    var randomIndex = floor(random(0, kernelImages.length));
    var chosenKernel = kernelImages[randomIndex];
  
    var kernel = createImg(chosenKernel);
    kernel.position(mouseX - 50, mouseY - 50);
    kernel.size(175, 175);
  
    kernel.style('transform', `rotate(${random(-30, 30)}deg)`);
  
    kernel.style('transition', 'transform 0.15s ease');
    kernel.style('transform', `scale(1.3) rotate(${random(-30, 30)}deg)`);
  
    setTimeout(() => {
      kernel.style('transform', `scale(1) rotate(${random(-30, 30)}deg)`);
    }, 150);
  
    popcornSound.play();
  }  
