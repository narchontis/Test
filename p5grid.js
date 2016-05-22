var scl = 20;

function setup() {
  createCanvas(600, 600, WEBGL);
  var w = 600;
  var h = 600;
  cols = w / scl;
  rows = h / scl
}

function draw() {
  background(0);

  for (var x = 0; x < cols; x++) {
    for (var y = 0; y < rows; y++) {
      stroke(255);
      noFill();
      rect(x*scl, y*scl, scl, scl )
    }
  }

}
