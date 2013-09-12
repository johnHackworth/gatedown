Crafty.c('Bullet', {
  tileWidth: 5,
  tileHeight: 3,
  w: 3,
  h: 1,
  init: function(options) {
    this.requires('Entity, Color, Solid, Collision')
      .color('#00FFFF')
      .stopOnSolids()
      .resize(5,2);
    this.initBindings();
    this.counter = 0;


  },
  velocity: 12,
  maxVelocity: 10,
  heading: 0,
  initBindings: function() {
    this.bind("EnterFrame", this.tick.bind(this));
  },
  shoot: function(heading, x, y) {
    this.attr({
      heading: heading,
      x: x,
      y: y,
      rotation: heading
    });
    return this;
  },
  tick: function() {
    this.counter++;
    this.inertia();
    if(this.counter > 100) {
      this.destroy();
    }
  },
  stopOnSolids: function() {
    this.onHit('Solid', this.stopMovement);
    return this;
  },

  // Stops the movement
  stopMovement: function(solid) {
    this.destroy();
  },
  toRadians: function(degrees) {
    return degrees * Math.PI / 180
  },
  inertia: function() {
    var newX = this.x + (Math.cos(this.toRadians(this.heading)) * this.velocity);
    var newY = this.y + (Math.sin(this.toRadians(this.heading)) * this.velocity);
    this.x = newX;
    this.y = newY;
  },
});

