Crafty.c('KeyListener', {
  counter: 0,
  init: function() {
    this.requires('Keyboard');

  },
  set: function(scene) {
    this.scene = scene;
    this.control = scene.control;
    this.bind('EnterFrame',this.checkKeyboardEvents.bind(this));
  },
  checkKeyboardEvents: function() {
    this.counter++;
    if(this.isDown('LEFT_ARROW') && this.counter % 1 == 0) {
      this.control.playerShip.turn(-4);
    }
    if (this.isDown('RIGHT_ARROW') && this.counter % 1 == 0) {
      this.control.playerShip.turn(4);
    }

    if (this.isDown('UP_ARROW') && this.counter % 10 == 0) {
      this.control.playerShip.accelerate()
    }
    if (this.isDown('DOWN_ARROW') && this.counter % 10 == 0) {
      this.control.playerShip.deccelerate();
    }

    if (this.isDown('SPACE')) {
      this.control.playerShip.pilot.shoot();
    }

    if(this.isDown('Z')) {
      this.control.playerShip.pilot.breakFormation();
    }

    if(this.isDown('X')) {
      this.control.playerShip.pilot.joinFormation();
    }
    if(this.isDown('H')) {
      this.scene.showHelpWindow();;
    }
    if(this.isDown()) {
      console.log('isdown')
    }

  }
});
