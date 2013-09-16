Crafty.sprite('assets/ship1.png', {sprShip: [0,0,20,15]})
Crafty.sprite('assets/ship2.png', {sprShip2: [0,0,20,15]})


Crafty.c('Ship', {
  init: function() {
    this.requires('Entity, Color, Solid, Keyboard, Collision, sprShip')
      .color('transparent')
      .resize(20,15)
      .stopOnSolids()
      .hitByBullet()
    this.initBindings();
    this.counter = 0;
    this.components = {};
    this.initComponent('Engine', [-6, 5]);
    this.explosion = Crafty.e('Explosion');
    this.path = [];
  },
  velocity: 1,
  hullIntegrity: 10,
  maxVelocity: 2,
  heading: 0,
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

    if(!this.playerControlled) {
      this.think();
      this.maniobrate();
    } else {

      this.checkKeyboardEvents();
      this.cameraCenter();
    };

    // this.path.push(this.rotatedPosition([0,7]));
    if(this.path.length > 50) {
      this.path.splice(0,1);
      // this.drawPath();
    }

  },
  drawPath: function() {
    // console.log(this.path);
      var ctx = Crafty.canvas.context;
      ctx.save();

      ctx.beginPath();
      ctx.lineWidth = 5;
      ctx.lineCap = 'round';
      var random = Math.floor(Math.random() * 5);


      var random2 = Math.floor(Math.random() * 1);
      ctx.moveTo(this.path[0 + random][0] , this.path[0 + random][1]);

      ctx.quadraticCurveTo(this.path[20][0],
          this.path[20][1],
          this.path[35 + random2][0],
          this.path[35 + random2][1]);

      ctx.strokeStyle = 'rgba(255, 255, 255, 0.9)';
      ctx.stroke();
      ctx.closePath();
      ctx.restore();
  },
  stopOnSolids: function() {
    this.onHit('Ship', this.stopMovement.bind(this));

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
        if(bullet[i] && bullet[i].obj && bullet[i].obj.destroy) {
          bullet[i].obj.destroy();
        }
        console.log('POOOOM')
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
  chooseHeading: function() {
    return Math.floor(Math.random() * 360)
  },
  inertia: function() {
    var newX = this.x + (Math.cos(this.toRadians(this.heading)) * this.velocity);
    var newY = this.y + (Math.sin(this.toRadians(this.heading)) * this.velocity);
    this.x = newX;
    this.y = newY;
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
      this.velocity++;
    } else if (e.key == Crafty.keys['DOWN_ARROW']) {
      this.velocity--;
    }
  },
  checkKeyboardEvents: function() {
    if(this.playerControlled) {
      if(this.isDown('LEFT_ARROW') && this.counter % 1 == 0) {
        this.turn(-1 * this.velocity);
      }
      if (this.isDown('RIGHT_ARROW') && this.counter % 1 == 0) {
        this.turn(1 * this.velocity);
      }

      if (this.isDown('UP_ARROW') && this.counter % 10 == 0) {
        this.accelerate()
      }
      if (this.isDown('DOWN_ARROW') && this.counter % 10 == 0) {
        this.deccelerate();
      }

      if (this.isDown('SPACE')) {
        this.shoot();
      }
    }
  },
  accelerate: function() {
    this.velocity++;
    if(this.velocity > this.maxVelocity) {
      this.velocity--;
    };
    this.trigger('accelerate');
  },
  deccelerate: function() {
    this.trigger('brake');
    this.velocity--;
    if(this.velocity < 0) {
      this.velocity = 0;
    }
  },
  cameraCenter: function() {
    if(this.playerControlled) {
      Crafty.viewport.x = this.x * -1 + (1/Crafty.viewport._zoom) * gatedown.config.width / 2;
      Crafty.viewport.y = this.y * -1 + (1/Crafty.viewport._zoom) * gatedown.config.height / 2;

    }
  },
  think: function() {
    if(this.counter && this.counter % 5 == 0) {
      this.pilot.action();

    //   this.intendedDirection = this.chooseHeading();
    }
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
        if(this.intendedDirection - this.heading <= 5) {
          this.heading = this.intendedDirection;
        } else {
          this.heading = this.heading + 5;
        }
      } else {
        if(this.heading - this.intendedDirection <= 5) {
          this.heading = this.intendedDirection;
        } else {
          this.heading = this.heading - 5;
        }
      }
    } else {
      if(this.heading < this.intendedDirection) {
        this.heading = this.heading - 5;
      } else {
        this.heading = this.heading + 5;
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
    if(!this.lastShot || this.counter - this.lastShot > 20) {
      console.log('piuuuung')
      this.lastShot = this.counter;
      var activateBulletAfter = 15;
      window.bullet = Crafty.e('Bullet').shoot(this, activateBulletAfter).color('#FF0000');
      window.ship = this;
      console.log(bullet.x, ship.x);
    }
  }
});

Crafty.c('EnemyShip', {
  init: function() {
    this.requires('Ship, sprShip2')
    this.path = [];
  }
});
