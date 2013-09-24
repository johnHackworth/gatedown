Crafty.sprite(20, 'assets/explosion1.png', {
  sprExplosion: [0, 3]
}, 0, 3);
Crafty.c('Explosion', {
  init: function() {
    this.requires('Entity, sprExplosion, SpriteAnimation')
      .animate('bigExplosion', 0, 0, 3)
      .animate('smallExplosion', 0, 0, 1);
    this.initBindings();
    this.counter = 0;
  },
  position: [0,0],
  heading: 0,
  initBindings: function() {
    this.bind("EnterFrame", this.tick.bind(this));
  },
  tick: function() {
    this.counter++;
    if(!this.isPlaying('bigExplosion') && !this.isPlaying('smallExplosion')) {
      this.visible = false;
    }
  },
  goodExplode: function(at) {
    var options = {
      maxParticles: 120,
      size: 6,
      sizeRandom: 4,
      speed: 1,
      speedRandom: 1.2,
      // Lifespan in frames
      lifeSpan: 29,
      lifeSpanRandom: 7,
      // Angle is calculated clockwise: 12pm is 0deg, 3pm is 90deg etc.
      angle: 0,
      angleRandom: 34,
      startColour: [255, 131, 0, 1],
      startColourRandom: [48, 50, 45, 0],
      endColour: [245, 35, 0, 0],
      endColourRandom: [60, 60, 60, 0],
      // Only applies when fastMode is off, specifies how sharp the gradients are drawn
      sharpness: 20,
      sharpnessRandom: 10,
      // Random spread from origin
      spread: 10,
      // How many frames should this last
      duration: 20,
      // Will draw squares instead of circle gradients
      fastMode: true,
      gravity: { x: 0, y: 0.1 },
      // sensible values are 0-3
      jitter: 0
    }

    Crafty.e("2D,Canvas,Particles").particles(options).attr({x: at[0], y: at[1]});
  },
  explode: function(at) {
    this.at(at[0],at[1])
    this.visible = true;
    this.animate('bigExplosion', 4, 1)  ;
  },
  sparks: function(at) {
    this.at(at[0],at[1])
    this.visible = true;
    this.animate('smallExplosion', 4, 1);
  },
  goodsparks: function(at) {
    var options = {
      maxParticles: 20,
      size: 4,
      sizeRandom: 2,
      speed: 1,
      speedRandom: 1.2,
      // Lifespan in frames
      lifeSpan: 10,
      lifeSpanRandom: 5,
      // Angle is calculated clockwise: 12pm is 0deg, 3pm is 90deg etc.
      angle: 0,
      angleRandom: 34,
      startColour: [255, 131, 131, 1],
      startColourRandom: [48, 50, 45, 0],
      endColour: [245, 50, 50, 0],
      endColourRandom: [60, 60, 60, 0],
      // Only applies when fastMode is off, specifies how sharp the gradients are drawn
      sharpness: 20,
      sharpnessRandom: 10,
      // Random spread from origin
      spread: 5,
      // How many frames should this last
      duration: 5,
      // Will draw squares instead of circle gradients
      fastMode: true,
      gravity: { x: 0, y: 0.1 },
      // sensible values are 0-3
      jitter: 0
    }

    Crafty.e("2D,Canvas,Particles").particles(options).attr({x: at[0], y: at[1]});
  },
  smoke: function(at) {
    var options = {
      maxParticles: 5,
      size: 2,
      sizeRandom: 2,
      speed: 1,
      speedRandom: 1.2,
      // Lifespan in frames
      lifeSpan: 5,
      lifeSpanRandom: 2,
      // Angle is calculated clockwise: 12pm is 0deg, 3pm is 90deg etc.
      angle: 0,
      angleRandom: 34,
      startColour: [150, 50, 0, 1],
      startColourRandom: [48, 50, 45, 0],
      endColour: [100, 50, 0, 0],
      endColourRandom: [60, 60, 60, 0],
      // Only applies when fastMode is off, specifies how sharp the gradients are drawn
      sharpness: 5,
      sharpnessRandom: 5,
      // Random spread from origin
      spread: 3,
      // How many frames should this last
      duration: 4,
      // Will draw squares instead of circle gradients
      fastMode: true,
      gravity: { x: 0, y: 0.1 },
      // sensible values are 0-3
      jitter: 0
    }

    // Crafty.e("2D,Canvas,Particles").particles(options).attr({x: at[0], y: at[1]});
  }
});

