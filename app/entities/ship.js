Crafty.c('Ship', {
  init: function() {
    this.requires('Entity, Color, Solid, Keyboard, Collision')
      .color('#FFFFFF')
      .stopOnSolids()
      .hitByBullet()
    this.initBindings();
    this.counter = 0;
  },
  velocity: 1,
  maxVelocity: 10,
  heading: 0,
  initBindings: function() {
    this.bind("EnterFrame", this.tick.bind(this));
  },
  tick: function() {
    this.counter++;
    this.inertia();
    if(!this.playerControlled) {
      this.think();
      this.maniobrate();
    } else {

      this.checkKeyboardEvents();
      this.cameraCenter();

    }
  },
  stopOnSolids: function() {
    this.onHit('Solid', this.stopMovement.bind(this));

    return this;
  },
  hitByBullet: function() {
    this.onHit('Bullet', this.bulletImpact.bind(this));
  },
  bulletImpact: function(bullets) {
    for(var i = 0, l = bullets.length; i < l; i++) {
      if(bullets[i].obj.owner != this) {
        this.stopMovement();
        console.log('POOOOM')
      }
    }

  },

  // Stops the movement
  stopMovement: function(solid) {
    this.velocity = (this.velocity * -1) / 2;
    if (this._movement) {
      this.x -= this._movement.x;
      this.y -= this._movement.y;
    }
  },
  toRadians: function(degrees) {
    return degrees * Math.PI / 180
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
    }
  },
  deccelerate: function() {
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

    if(this.counter && this.counter % 500 == 0) {

      this.intendedDirection = this.chooseHeading();
    }
  },
  maniobrate: function() {
    if(!this.intendedDirection || this.intendedDirection == this.heading) return;
    var rightTurn = false;
    if(
      (this.intendedDirection < 180 && this.direction > 180) ||
      (this.intendedDirection > 180 && this.direction < 180)
    ) rightTurn = true;

    if(rightTurn) {
      this.turn(1);
    } else {
      this.turn(-1);
    }
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

