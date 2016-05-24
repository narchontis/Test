
var flower;
var bubbles = [];

function preload(){
  flower = loadImage('images/flower0.jpg');
}

function setup() {
  createCanvas(640, 360);
}

function mousePressed(){
  var b = new Bubble(mouseX, mouseY, flower);
  bubbles.push(b);
}

function draw() {
  background(51);
  for (var i = 0; i < bubbles.length; i++) {
    bubbles[i].move();
    bubbles[i].display();
  }

}
