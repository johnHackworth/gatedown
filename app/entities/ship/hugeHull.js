Crafty.c('HugeHull', {

  init: function() {
    this.requires('Entity, Color, Solid, Collision')
      .stopOnSolids()
      .hitByBullet();
    this.initBindings();

    this.counter = 0;
    this.explosion = Crafty.e('Explosion');
    this.path = [];
  },
  initBindings: function() {
    this.bind("Draw", this.tick.bind(this));
  },
  tick: function() {
    this.counter++;
    this.heading = this.counter / 10;
    this.origin("center")
    this.rotation = this.heading;

    if(this.hullIntegrity <= 1 && this.counter % 20 == 0) {
      this.explosion.smoke([this.x, this.y]);
    } else if(this.hullIntegrity <= 2 && this.counter % 20 == 0) {
      this.explosion.lightSmoke([this.x, this.y]);
    }
    if(this.turrets) {
      for(var i = this.turrets.length; i; i--) {
        this.turrets[i-1].gunner && this.turrets[i-1].gunner.action();
      }
    }
  },
  stopOnSolids: function() {
    this.onHit('Ship', this.crashOnSolid.bind(this));
    return this;
  },
  hitByBullet: function() {
    return this;
  },
  bulletImpact: function(bullets) {
    for(var i = 0, l = bullets.length; i < l; i++) {
      var bullet = Crafty(bullets[i]);
      if(bullet.owner != this) {
        if(!this.lastImpact ||this.counter - this.lastImpact > 0) {
          this.hullIntegrity--;
          this.trigger('hit');
          this.lastImpact = this.counter;

          if(this.hullIntegrity <= 0) {
            this.explosion.explodeDouble([bullet.x,bullet.y]);
            this.trigger('destroySpaceship');
            this.destroy();
          } else {
            this.explosion.sparks([bullet.x, bullet.y]);
          }
        }
      }
    }

  },
  crashOnSolid: function(elements) {
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

