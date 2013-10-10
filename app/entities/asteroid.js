Crafty.sprite(100,100, 'assets/asteroid.png', {
  sprAsteroid1: [0, 7],
}, 0, 0);

Crafty.c('Asteroid', {
  init: function() {
    var size = Math.random()*100 + 20;
    this.requires('Entity, sprAsteroid1, Solid, SpriteAnimation, Collision')
      .resize(size,size)
      .animate('tingle', 0, 0, 7)
    this.counter = 0;

    this.animate('tingle', 20, -1);
    this.collision(
      new Crafty.circle(size/2,size/2,size -5)
    );
  }

});
