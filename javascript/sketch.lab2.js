var shape = {
    x: 0,
    y: 0,
    w: 25,
    h: 25,
    xSpeed: 20,
    ySpeed: 20,
    colour: 235,
    stroke: 0,

    draw: function(){
        fill(this.colour);              
        ellipse(this.x, this.y, this.w, this.h);
    },

    move: function(){
        this.x += this.xSpeed;
        this.y += this.ySpeed;

        if(this.x < 0 || this.x > width - this.w){ 
            this.xSpeed *= -1;
        }

        if(this.y > height - this.h || this.y < 0){
            this.ySpeed *= -1;
        }
    }
};


function setup(){
    createCanvas(windowWidth, windowHeight);
    background(255);
}

function draw(){
    shape.draw();
    shape.move();
}
