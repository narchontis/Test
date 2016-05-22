var bubbles = [];
var BALLOUNES = 1;
function setup() {
   createCanvas(600, 400);
   for (var i = 0; i < BALLOUNES; i++) {
     var x = random(width);
     var y = height / 2;
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
    bubbles[i].noiseX();
    bubbles[i].display();
  }

}
