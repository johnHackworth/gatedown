Crafty.sprite(50, 'assets/proton.png', {
  sprProton: [0, 5],
}, 0, 0);
Crafty.c('Proton', {
  tileWidth: 5,
  tileHeight: 5,
  w: 5,
  h: 5,
  init: function(options) {
    this.requires('Entity, sprProton, Tween, SpriteAnimation, Collision')
      .animate('protonTorpedo', 0, 0, 5)
      .resize(5,5);

    this.animate('protonTorpedo', 5 , -1);
    this.initBindings();
    this.counter = 0;


  },
  velocity: 15,
  maxVelocity: 15,
  maxLive: 80,
  heading: 0,
  power: 5,
  setSpeed: function(v, mv) {
    this.velocity = v;
    this.maxVelocity = mv;
  },
  setLive: function(l) {
    this.maxLive = l;
  },
  initBindings: function() {
    this.bind("EnterFrame", this.tick.bind(this));
    this.onHit("Ship", this.shipHit.bind(this));
    this.onHit("Asteroid", this.destroy.bind(this));
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

    this.inertia();
    if(this.counter > this.maxLive - 10) {
      this.velocity = 0;
      this.tween({w:150, h:150, x:this.x-4, y: this.y-4}, 4);
    }
    if(this.counter > this.maxLive) {
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
  shipHit: function(ships) {
    for(var n in ships) {
      if(ships[n].obj != this.owner) {
        ships[n].obj.bulletImpact(this);
        this.destroy();
        return;
      }
    }
  }
});
