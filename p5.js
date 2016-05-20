var bubbles = [];

function setup() {
   createCanvas(800, 600);
   for (var i = 0; i < 1000; i++) {
     var x = random(width);
     var y = random(height);
     bubbles.push(new Bubble(x,y));
   }
   print("Nick is having some fun with p5 oh yeah.");
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
