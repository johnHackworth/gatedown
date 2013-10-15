Crafty.audio.add("bang", "assets/laser1.mp3");
Crafty.c('Bullet', {
  tileWidth: 3,
  tileHeight: 1,
  w: 5,
  h: 1,
  color: '#00FFFF',
  init: function(options) {
    this.requires('Entity, Color, Collision')
      .color(this.color)
      .resize(5,1);
    this.initBindings();
    this.counter = 0;


  },
  velocity: 20,
  maxVelocity: 20,
  maxLive: 40,
  heading: 0,
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
    Crafty.audio.play("bang")
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

Crafty.c('BulletLong', {
  w: 8,
  h: 2,
  color: '#FF00FF',
  init: function(options) {
    this.requires('Bullet')
      .color(this.color)
      .resize(8,2);
    this.initBindings();
    this.counter = 0;
    this.setSpeed(10, 10)
    this.setLive(60);
  }
})
