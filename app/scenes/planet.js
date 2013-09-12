window.gatedown = window.gatedown || {};
window.gatedown.src = window.gatedown.src || {};
window.gatedown.app = window.gatedown.app || {};
window.gatedown.app.scenes = window.gatedown.app.scenes || {};

window.gatedown.app.scenes.planet = {};

Crafty.scene('Planet', (function() {
  this.playerShip = Crafty.e('Ship').at(0,0);
  this.playerShip.humanPlayer();
  this.otherShip = Crafty.e('Ship').at(30,30);
}).bind(window.gatedown.app.scenes.planet ),
function() {

});
