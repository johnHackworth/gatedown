Crafty.sprite('assets/little_ship1.png', {sprShip: [0,0,10,9]})
Crafty.sprite('assets/little_ship2.png', {sprShip2: [0,0,15,11]})


Crafty.c('Ship', {
  acceleration: 1,
  turningRadius: 8,
  baseTurningRadius: 8,
  outOfControl: 0,
  init: function() {
    this.requires('Entity, Color, Solid, Keyboard, Collision, sprShip')
      .color('transparent')
      .resize(10,9)
      .stopOnSolids()
      .hitByBullet()
    this.initBindings();
    this.counter = 0;
    this.components = {};
    this.initComponent('Engine', [-5, 2]);
    this.explosion = Crafty.e('Explosion');
    this.path = [];
  },
  velocity: 0 ,
  hullIntegrity: 3,
  maxVelocity: 8,
  heading: 0,
  centered: false,
  initComponent: function(component, position) {
    this.components[component.toLowerCase()] = Crafty.e(component);
    this.components[component.toLowerCase()].assignOwner(this);
    this.components[component.toLowerCase()].position = position;
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
      } else {
        this.checkKeyboardEvents();
      };
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
  drawPath: function() {
    // console.log(this.path);
      // var ctx = Crafty.canvas.context;
      // ctx.save();

      // ctx.beginPath();
      // ctx.lineWidth = 5;
      // ctx.lineCap = 'round';
      // var random = Math.floor(Math.random() * 5);


      // var random2 = Math.floor(Math.random() * 1);
      // ctx.moveTo(this.path[0 + random][0] , this.path[0 + random][1]);

      // ctx.quadraticCurveTo(this.path[20][0],
      //     this.path[20][1],
      //     this.path[35 + random2][0],
      //     this.path[35 + random2][1]);

      // ctx.strokeStyle = 'rgba(255, 255, 255, 0.9)';
      // ctx.stroke();
      // ctx.closePath();
      // ctx.restore();
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
        if(!this.lastImpact ||this.counter - this.lastImpact > 20) {
          this.hullIntegrity--;
          this.lastImpact = this.counter;
          this.explosion.sparks(this.rotatedPosition([0,3]));
          if(this.hullIntegrity <= 0) {
            this.explosion.explode(this.rotatedPosition([0,3]));
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
  crashOnSolid: function(elements) {
    if(this.outOfControl) {
      return;
    }
    if(this.hit('Ship')) {
      var ship = elements[0].obj;
      var shipDirection = ship.getAngleTo(ship)
      var modifAngle = ((this.heading - shipDirection)) % 360;
      this.intendedHeading = ((this.heading + modifAngle)) % 360;
      this.outOfControl = 30;
      this.turningRadius = 15;
       if(Math.abs(modifAngle) < 30) {
         this.velocity = -1 ;
      } else if(Math.abs(modifAngle) < 90) {
        this.velocity = 3 * this.velocity / 5
      } else if(Math.abs(modifAngle) < 120) {
        this.velocity = ship.velocity / 6 + this.velocity;
      } else if(Math.abs(modifAngle) < 140) {
        this.velocity =  ship.velocity / 5 + this.velocity;
      } else {
        this.velocity = ship.velocity / 4 + this.velocity;
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
      this.velocity -= this.acceleration;
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
  },


  shoot: function() {
    if(!this.lastShot || this.counter - this.lastShot > 5) {
      this.lastShot = this.counter;
      var activateBulletAfter = 15;
      Crafty.e('Bullet').shoot(this, activateBulletAfter).color('#FF0000');
    }
  }
});

Crafty.c('EnemyShip', {
  init: function() {
    this.requires('Ship, sprShip2')
    this.path = [];
  }
});
