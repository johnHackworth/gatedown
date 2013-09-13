Crafty.sprite('assets/engine.png', {sprEngine: [10,0, 5, 5]})

Crafty.c('Engine', {
  init: function() {
    this.requires('ShipComponent, sprEngine')
    .resize(5,5);
  }
});
