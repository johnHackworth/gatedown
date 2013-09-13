window.gatedown = window.gatedown || {};
window.gatedown.src = window.gatedown.src || {};
window.gatedown.app = window.gatedown.app || {};
window.gatedown.app.scenes = window.gatedown.app.scenes || {};

window.gatedown.app.scenes.planet = {};

Crafty.scene('Planet', (function() {

  this.bg = Crafty.e("2D, Canvas, Image")
             .attr({x:-5000, y: -5000, w: 10000, h:10000})
             .image("http://fc09.deviantart.net/fs71/i/2011/078/a/a/simplistic_space_background_by_swordkirby9999-d3c04tz.jpg", "repeat");

  this.playerShip = Crafty.e('Ship').at(0,0);
  this.playerShip.humanPlayer();
  this.otherShip = Crafty.e('EnemyShip').at(30,30);




}).bind(window.gatedown.app.scenes.planet ),
function() {

});
