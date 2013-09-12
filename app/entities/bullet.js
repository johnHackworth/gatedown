Crafty.c('Bullet', {
  tileWidth: 5,
  tileHeight: 3,
  w: 3,
  h: 1,
  init: function(options) {
    this.requires('Entity, Color, Collision')
      .color('#00FFFF')
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
  shoot: function(owner, activateBulletAfter) {
    this.attr({
      heading: owner.heading,
      x: owner.x,
      y: owner.y,
      rotation: owner.heading,
      owner: owner,
      activateBulletAfter: activateBulletAfter
    });
    return this;
  },
  tick: function() {
    if(this.hit('solid')) {
      console.log('hit solid')
    }
    if(this.activateBulletAfter && this.counter && this.counter >= this.activateBulletAfter) {
      if(this.hit('Ship')) {
        this.stopMovement();
      }
    }
    this.counter++;
    this.inertia();
    if(this.counter > 100) {
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

