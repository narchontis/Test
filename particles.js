// Daniel Shiffman
// https://www.kadenze.com/courses/the-nature-of-code
// http://natureofcode.com/
// Session 2: Array of Particles, multiple forces

function Particle(x, y, m) {
  this.pos = createVector(x, y);
  this.vel = createVector(0, 0);
  this.acc = createVector(0, 0);
  this.mass = m;

  this.applyForce = function(force) {
    var f = force.copy();
    f.div(this.mass);
    this.acc.add(f);
  }

  this.update = function() {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.set(0, 0);
  }

  this.display = function() {
    fill(255, 150);
    stroke(255);
    ellipse(this.pos.x, this.pos.y, this.mass*10, this.mass*10);
  }

  this.edges = function() {
    if (this.pos.y > height) {
      this.vel.y *= -1;
      this.pos.y = height;
    }

    if (this.pos.x > width) {
      this.vel.x *= -1;
      this.pos.x = width;
    }
  }
}



var particles = [];

function setup() {
  createCanvas(640, 360);
}

function mousePressed() {
  var p = new Particle(mouseX, mouseY, random(2,4));
  particles.push(p);
}

function keyPressed() {
  if (key == ' ') {
    particles.splice(0, 1);
  }

}

function draw() {
  background(51);
  var wind = createVector(0.1, 0);

  for (var i = 0; i < particles.length; i++) {
    var gravity = createVector(0, 0.2 * particles[i].mass);
    particles[i].applyForce(gravity);

    // Wind is applied only if mouse is pressed
    if (mouseIsPressed) {
      particles[i].applyForce(wind);
    }

    particles[i].update();
    particles[i].edges();
    particles[i].display();
  }
}