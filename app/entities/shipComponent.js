Crafty.c('ShipComponent', {
  init: function() {
    this.requires('Entity, Solid, Collision')
      // .color('#FFFFFF')
      .stopOnSolids()
      .hitByBullet()
    this.initBindings();
    this.counter = 0;
  },
  velocity: 1,
  position: [0,0],
  heading: 0,
  initBindings: function() {
    this.bind("EnterFrame", this.tick.bind(this));
  },
  tick: function() {
    this.counter++;

    var cosHeading = (Math.cos(this.toRadians(this.heading)));
    var sinHeading = (Math.sin(this.toRadians(this.heading)));
    if(this.owner && this.owner.x) {
      this.attr({
        x: this.owner.x + this.position[0] * cosHeading - this.position[1] * sinHeading,
        y: this.owner.y + this.position[0] * sinHeading + this.position[1] * cosHeading,
        heading: this.owner.heading,
        rotation: this.owner.rotation
      })
    }
  },
  stopOnSolids: function() {
    return this;
  },
  hitByBullet: function() {
    this.onHit('Bullet', this.bulletImpact.bind(this));
  },
  bulletImpact: function(bullets) {
    for(var i = 0, l = bullets.length; i < l; i++) {
      if(bullets[i].obj.owner != this) {
        console.log('POOOOM')
      }
    }

  },

  // Stops the movement
  stopMovement: function(elements) {
    if(this.hit('Solid')) {
      this.velocity = -1;
    } else {
      this.velocity = 0;
    }
    if (this._movement) {
      this.x -= this._movement.x;
      this.y -= this._movement.y;
    }
  },
  toRadians: function(degrees) {
    return degrees * Math.PI / 180
  }
});

