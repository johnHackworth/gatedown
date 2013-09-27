Crafty.c('HugeHull', {

  init: function() {
    this.requires('Entity, Color, Solid, Collision')
      .stopOnSolids()
      .hitByBullet()
    this.initBindings();
    this.counter = 0;
    this.explosion = Crafty.e('Explosion');
    this.path = [];
  },
  initBindings: function() {
    this.bind("EnterFrame", this.tick.bind(this));
  },
  tick: function() {
    this.counter++;

    if(this.hullIntegrity <= 1 && this.counter % 20 == 0) {
      this.explosion.smoke(this.rotatedPosition([0,3]));
    } else if(this.hullIntegrity <= 2 && this.counter % 20 == 0) {
      this.explosion.lightSmoke(this.rotatedPosition([0,3]));
    }

  },
  stopOnSolids: function() {
    this.onHit('Ship', this.crashOnSolid.bind(this));
    return this;
  },
  hitByBullet: function() {
    this.onHit('Bullet', this.bulletImpact.bind(this));
  },
  bulletImpact: function(bullets) {
    for(var i = 0, l = bullets.length; i < l; i++) {
      if(bullets[i].obj.owner != this) {
        if(!this.lastImpact ||this.counter - this.lastImpact > 0) {
          this.hullIntegrity--;
          this.trigger('hit')
          this.lastImpact = this.counter;
          this.explosion.sparks(this.rotatedPosition([0,3]));
          if(this.hullIntegrity <= 0) {
            this.explosion.explode(this.rotatedPosition([0,3]));
            this.trigger('destroyShip');
            this.destroy();
          }
        }


        // this.stopMovement();
        if(bullets[i] && bullets[i].obj && bullets[i].obj.destroy) {
          bullets[i].obj.destroy();
        }
      }
    }

  },
  crashOnSolid: function(elements) {
    console.log('a');
    for(var n in elements) {
      elements[n].obj.attr({velocity: -1});
    }
  },
  crashedOnShip: function(ship) {

  },
  getNewPosition: function() {
  },
  inertia: function() {
  },
  turn: function(amount) {
    this.rotation = this.counter % 360;
  },
  accelerate: function() {
  },
  deccelerate: function() {
  },
  brake: function() {
  },
  cameraCenter: function() {
  },
  think: function() {
    this.pilot.action();
  },
  maniobrate: function() {
  },
  getNewHeading: function() {
  }
});

