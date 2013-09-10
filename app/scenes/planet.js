window.gatedown = window.gatedown || {};
window.gatedown.src = window.gatedown.src || {};
window.gatedown.app = window.gatedown.app || {};

Crafty.scene('Planet', function() {
  Crafty.e('2D, Canvas, Text')
    .attr({ x: 30, y: 30, color: '#FFFFFF'})
    .text('attack!');

  Crafty.e('Ship').at(0,0);

}, function() {

});
