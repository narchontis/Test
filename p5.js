var bubbles = [];
var BALLOUNES = 10;
function setup() {
   createCanvas(1200, 800);
   for (var i = 0; i < BALLOUNES; i++) {
     var x = random(width);
     var y = random(height);
     bubbles.push(new Bubble(x,y));
   }
   print("Theo is having some fun.");
}

function mousePressed(){
  for (var i = 0; i < bubbles.length; i++) {
    bubbles[i].clicked();
  }
}

function draw() {
  background(0);
  for (var i = 0; i < bubbles.length; i++) {
    bubbles[i].move();
    bubbles[i].display();
  }

}
