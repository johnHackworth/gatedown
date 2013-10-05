Crafty.sprite(11, 5, 'assets/turret1.png', {
  sprTurret1: [0,0]
});

Crafty.c('Turret1', {
  init: function() {
    var self = this;
    this.requires('Entity, Grid, sprTurret1')
      .resize(11,5)
  },
  set: function(x,y,rotation,owner) {
    this.origin(x,y);
    this.rotation = rotation;
    this.initialRotation = rotation;
    this.heading = rotation;
    this.owner = owner;
    owner.attach(this);
  },
  reset: function() {
    this.rotation = this.initialRotation;
    this.heading = this.initialRotation;
  },
  actualRotation: function() {
    return this.rotation + this.owner.rotation;
  },
  actualHeading: function() {
    return this.heading + this.owner.rotation;
  },
  shoot: function() {
    this.heading = this.rotation;
    if(!this.lastShot || this.counter - this.lastShot > 20) {
      this.lastShot = this.counter;
      var activateBulletAfter = 15;
      Crafty.e('BulletLong').shoot(this.owner, activateBulletAfter, {
        x: this.x - 55,
        y: this.y, //rotatedPosition([0,110  ])[1],
        rotation: this.rotation,
        heading: this.rotation
      }).color('#66FF66');
    }
  }
});
