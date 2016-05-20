function Bubble(x,y) {
  this.x = x;
  this.y = y;
  this.color = color(255,100);

  this.display = function(){
    stroke(255);
    fill(this.color);
    ellipse(this.x, this.y, 48, 48);
  }

  this.move = function(){
    this.x += random(-1, 1);
    this.y += random(-1, 1);
  }

  this.clicked = function() {
    var d = dist(this.x, this.y, mouseX, mouseY);
    if (d < 24){
      this.color = color(random(0,255), random(0,255), random(0,255));
    }
  }
}
