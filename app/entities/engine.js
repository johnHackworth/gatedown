Crafty.sprite(5, 'assets/engine.png', {
  sprEngine: [0, 2]
}, 0, 2);

Crafty.c('Engine', {
  init: function() {
    var self = this;
    this.requires('ShipComponent, sprEngine, SpriteAnimation')
      .resize(5,5)
      .animate('motorRunning',    0, 0, 3)
      .animate('motorSlow',    0, 0, 1);
    this.animate('motorSlow', 8 , -1);
    this.onOwner = function() {
        this.owner.bind('accelerate', this.accelerate.bind(this));
        this.owner.bind('brake', this.accelerate.bind(this));
      }
  },

  accelerate: function() {
    if(this.owner.velocity <= 2) {
      this.animate('motorSlow', 8, -1);
    } else {
      this.animate('motorRunning', 8, -1);
    }

  }
});
