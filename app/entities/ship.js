Crafty.c('Ship', {
  init: function() {
    this.requires('Entity, Color, Solid, Keyboard')
      .color('#FFFFFF');
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
    this.checkKeyboardEvents();
    this.cameraCenter();
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
      if(this.isDown('LEFT_ARROW') && this.counter % 2 == 0) {
        this.turn(-1 * this.velocity);
      }
      if (this.isDown('RIGHT_ARROW') && this.counter % 2 == 0) {
        this.turn(1 * this.velocity);
      }

      if (this.isDown('UP_ARROW') && this.counter % 10 == 0) {
        this.accelerate()
      }
      if (this.isDown('DOWN_ARROW') && this.counter % 10 == 0) {
        this.deccelerate();
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
      Crafty.viewport.y = (1/Crafty.viewport._zoom) *(this.y * -1 +  gatedown.config.height / 2);

    }
  }
});

