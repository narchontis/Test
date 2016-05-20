var bubbles = [];

function setup() {
   createCanvas(480, 120);
   for (var i = 0; i < 10; i++) {
     var x = random(width);
     var y = random(height);
     bubbles.push(new Bubble(x,y));
   }
   print("Nick is having some fun with p5 oh yeah.");
}

function draw() {
  background(0);
  for (var i = 0; i < bubbles.length; i++) {
    bubbles[i].move();
    bubbles[i].display();
  }

  if (mouseIsPressed){
      fill(0);
    ellipse(mouseX, mouseY, 80, 80);
  }
}
