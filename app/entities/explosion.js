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
  explode: function(at) {
    this.at(at[0],at[1])
    this.visible = true;
    this.animate('bigExplosion', 4, 1)  ;
  },
  sparks: function(at) {
    this.at(at[0],at[1])
    this.visible = true;
    this.animate('smallExplosion', 4, 1);
  }
});

