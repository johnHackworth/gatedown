Crafty.c('Bullet', {
  tileWidth: 3,
  tileHeight: 1,
  w: 5,
  h: 1,
  init: function(options) {
    this.requires('Entity, Color, Collision')
      .color('#00FFFF')
      .resize(5,1);
    this.initBindings();
    this.counter = 0;


  },
  velocity: 15,
  maxVelocity: 20,
  heading: 0,
  initBindings: function() {
    this.bind("EnterFrame", this.tick.bind(this));
  },
  shoot: function(owner, activateBulletAfter, origin) {
    if(!origin) {
      origin = owner;
    }
    this.attr({
      heading: origin.heading,
      x: origin.x,
      y: origin.y,
      rotation: origin.heading,
      owner: owner,
      activateBulletAfter: activateBulletAfter
    });
    return this;
  },
  tick: function() {

    this.counter++;
    if(this.counter > this.activateBulletAfter) {
      this.active = true;
    }
    if(this.hit('Ship') && this.active) {
      this.destroy();
    }
    this.inertia();
    if(this.counter > 40) {
      this.destroy();
    }
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

