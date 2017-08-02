function Person() {
  this.pos = createVector(50, height);
  this.vel = createVector(5, 0);
  this.acc = createVector(0, 0);

  this.applyForce = function(force) {
    this.acc.add(force);
  }

  this.update = function() {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.set(0, 0);
  }


  this.display = function(img) {
    //fill(255);
    //stroke(255);
    //image(img, this.pos.x, this.pos.y);

    image(img, this.pos.x, this.pos.y-60);

  }

  this.edges = function() {
    if (this.pos.y > height) {
      this.vel.y *= 0;
      this.pos.y = height;
    }
  }
}
