Crafty.c('Hull1', {
  maxVelocity: 6,
  init: function() {
    this.requires('Entity, Color, Solid, Keyboard, Collision')
      .stopOnSolids()
      .hitByBullet();
    this.initBindings();
    this.counter = 0;
    this.explosion = Crafty.e('Explosion');
    this.path = [];
  },
  setMaxvelocity: function(mv) {
    this.maxVelocity = mv;
  },
  initBindings: function() {
    this.bind("EnterFrame", this.tick.bind(this));
  },
  tick: function() {
    this.counter++;
    var pos = this.rotatedPosition();

    this.inertia();

    if(this.centered) {
      this.cameraCenter();
    }

    if(!this.outOfControl) {

      if(!this.playerControlled) {
        this.think();
        this.maniobrate();
      }
    } else {
      this.outOfControl--;
      this.maniobrate();
      if(!this.outOfControl) {
        this.turningRadius = this.baseTurningRadius;
      }
    }

    if(this.hullIntegrity <= 1 && this.counter % 20 == 0 && this.velocity > 2) {
      this.explosion.smoke(this.rotatedPosition([0,3]));
    } else if(this.hullIntegrity <= 2 && this.counter % 20 == 0 && this.velocity > 2) {
      this.explosion.lightSmoke(this.rotatedPosition([0,3]));
    }

  },
  centerOfAction: function() {
    this.centered = true;
  },
  stopOnSolids: function() {
    this.onHit('Ship', this.crashOnSolid.bind(this));
    this.onHit('Asteroid', this.crashOnAsteroid.bind(this));

    return this;
  },
  hitByBullet: function() {
    // this.onHit('Bullet', this.bulletImpact.bind(this));
  },
  bulletImpact: function(bullets) {
    for(var i = 0, l = bullets.length; i < l; i++) {
      var bullet = Crafty(bullets[i]);
      if(bullet.owner != this) {
        if(!this.lastImpact ||this.counter - this.lastImpact > 20) {
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
      }
    }

  },

  // Stops the movement
  stopMovement: function(elements) {
    this.trigger('brake')
    if(this.hit('Ship')) {
      this.velocity = -1;
    } else {
      this.velocity = 0;
    }
    if (this._movement) {
      this.x -= this._movement.x;
      this.y -= this._movement.y;
    }
  },
  crashOnAsteroid: function(elements) {
    var angleToAsteroid = this.getAngleTo(elements[0].obj)
    this.heading = (((this.rotation + angleToAsteroid) % 360) -180) % 360
    if((this.heading - this.rotation) % 360 > 180) {
      this.heading += 180;
      this.velocity = this.velocity /2 * -1;
    } else {
      this.velocity = this.velocity /2;
    }
    this.rotation = this.heading;
    this.intendedDirection = this.rotation;
    this.x = this._x;
    this.y = this._y;
    // this.hullIntegrity -= 0.25;
    this.explosion.sparks(this.rotatedPosition([0,3]));
  },
  crashOnSolid: function(elements) {
    if(this.outOfControl) {
      return;
    }
    if(this.hit('Ship')) {
      var ship = elements[0].obj;
      var shipDirection = ship.getAngleTo(this)
      var modifAngle = ((this.heading - shipDirection)) % 360;
      this.intendedHeading = ((this.heading + modifAngle)) % 360;
      this.outOfControl = 30;
      this.turningRadius = 15;
       if(Math.abs(modifAngle) < 30) {
         this.velocity = -1 ;
      } else if(Math.abs(modifAngle) < 90) {
        this.velocity = this.velocity - ship.velocity / 2;
      } else if(Math.abs(modifAngle) < 120) {
        this.velocity = this.velocity - ship.velocity / 4;
      } else if(Math.abs(modifAngle) < 140) {
        this.velocity = this.velocity - ship.velocity / 5;
      } else {
        this.velocity = this.velocity - ship.velocity / 6;
      }
    }
    if (this._movement) {
      this.x -= this._movement.x;
      this.y -= this._movement.y;
    }
  },
  crashedOnShip: function(ship) {
    if(this.outOfControl) {
      return;
    }
    var ship = elements[0].obj;
    var shipDirection = this.getAngleTo(ship)
    var modifAngle = ((this.heading - shipDirection)) % 360;
    this.intendedHeading = ((this.heading + modifAngle)) % 360;
    this.outOfControl = 5;
    this.turningRadius = 10;
     if(Math.abs(modifAngle) < 30) {
       this.velocity = this.velocity + (ship.velocity - this.velocity)
    } else if(Math.abs(modifAngle) < 90) {
      this.velocity = this.velocity + 2* (ship.velocity - this.velocity) / 3
    } else if(Math.abs(modifAngle) < 120) {
      this.velocity = this.velocity + 2* (ship.velocity - this.velocity) / 3
    } else if(Math.abs(modifAngle) < 140) {
      this.velocity =  this.velocity + 2* (ship.velocity - this.velocity) / 3
    } else {
      this.velocity = this.velocity + 2* (ship.velocity - this.velocity) / 3
    }
  },
  chooseHeading: function() {
    return Math.floor(Math.random() * 360)
  },
  getNewPosition: function() {
    var newX = this.x + (Math.cos(this.toRadians(this.heading)) * this.velocity);
    var newY = this.y + (Math.sin(this.toRadians(this.heading)) * this.velocity);
    return [newX, newY]
  },
  inertia: function() {
    var newPosition = this.getNewPosition()
    this.x = newPosition[0];
    this.y = newPosition[1];
  },
  turn: function(amount) {
    this.heading += amount;
    if(this.heading < 0) {
      this.heading = 360 + this.heading;
    }
    if(this.heading >= 360) {
      this.heading = this.heading - 360;
    }
    this.rotation = this.heading;
  },
  humanPlayer: function() {
    this.playerControlled = true;
    window.player = this;
    // this.bind('KeyDown', this.keyMapping.bind(this));
  },
  keyMapping: function(e) {
    if(e.key == Crafty.keys['LEFT_ARROW']) {
      this.turn(-1);
    } else if (e.key == Crafty.keys['RIGHT_ARROW']) {
      this.turn(1);
    } else if (e.key == Crafty.keys['UP_ARROW']) {
      this.velocity += this.acceleration;
    } else if (e.key == Crafty.keys['DOWN_ARROW']) {
      this.velocity -= this.acceleration;
    }
  },
  checkKeyboardEvents: function() {
    if(this.playerControlled) {
      if(this.isDown('LEFT_ARROW') && this.counter % 1 == 0) {
        this.turn(-4);
      }
      if (this.isDown('RIGHT_ARROW') && this.counter % 1 == 0) {
        this.turn(4);
      }

      if (this.isDown('UP_ARROW') && this.counter % 10 == 0) {
        this.accelerate()
      }
      if (this.isDown('DOWN_ARROW') && this.counter % 10 == 0) {
        this.deccelerate();
      }

      if (this.isDown('SPACE')) {
        this.pilot.shoot();
      }

      if(this.isDown('Z')) {
        this.pilot.breakFormation();
      }

      if(this.isDown('X')) {
        this.pilot.joinFormation();
      }
    }
  },
  accelerate: function() {
    this.velocity += this.acceleration;
    if(this.velocity > this.maxVelocity) {
      this.velocity = this.maxVelocity;
    };
    this.trigger('accelerate');
  },
  deccelerate: function() {
    this.trigger('brake');
    this.velocity -= this.acceleration;
    if(this.velocity < 0) {
      this.velocity = 0;
    }
  },
  brake: function() {
    this.trigger('brake');
    this.velocity -= 3*this.acceleration;
    if(this.velocity < 0) {
      this.velocity = 0;
    }
  },
  cameraCenter: function() {
    // if(this.playerControlled) {

      Crafty.viewport.x = this.x * -1 + 1 * gatedown.config.width / 2;
      Crafty.viewport.y = this.y * -1 + 1 * gatedown.config.height / 2;

    // }
  },
  think: function() {
    this.pilot.action();
  },
  maniobrate: function() {
    if(!this.intendedDirection || this.intendedDirection == this.heading) return;
    this.getNewHeading();
    // var rightTurn = false;
    // if(
    //   (this.intendedDirection < 180 && this.direction > 180) ||
    //   (this.intendedDirection > 180 && this.direction < 180)
    // ) rightTurn = true;

    // if(rightTurn) {
    //   this.turn(1);
    // } else {
    //   this.turn(-1);
    // }
  },
  getNewHeading: function() {
    if(
        Math.abs(this.intendedDirection - this.heading) <= 180
      ) {
      if(this.heading < this.intendedDirection) {
        if(this.intendedDirection - this.heading <= this.turningRadius) {
          this.heading = this.intendedDirection;
        } else {
          this.heading = this.heading + this.turningRadius;
        }
      } else {
        if(this.heading - this.intendedDirection <= this.turningRadius) {
          this.heading = this.intendedDirection;
        } else {
          this.heading = this.heading - this.turningRadius;
        }
      }
    } else {
      if(this.heading < this.intendedDirection) {
        this.heading = this.heading - this.turningRadius;
      } else {
        this.heading = this.heading + this.turningRadius;
      }

    }
    if(this.heading < 0) {
      this.heading = 360 + this.heading;
    }
    if(this.heading > 359) {
      this.heading = this.heading % (360);
    }
    this.rotation = this.heading;
  }
});

