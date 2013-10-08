Crafty.sprite(200,300, 'assets/asteroid.png', {
  sprAsteroid1: [0, 7],
}, 0, 0);

Crafty.c('Asteroid', {
  init: function() {
    this.requires('Entity, sprAsteroid1, Solid, SpriteAnimation, Collision')
      .resize(Math.random()*50 + 60,Math.random()*60 + 80)
      .animate('tingle', 0, 0, 7)
    this.counter = 0;

    this.animate('tingle', 20, -1);
    this.collision(
      new Crafty.polygon([10,30], [80,25], [80,0], [120,0], [180,25],
        [180,75], [199,75], [199,105], [180,240], [120,299],
        [50, 299], [50,265],
        [1, 260], [1, 110]
      )
    );
  }

});
