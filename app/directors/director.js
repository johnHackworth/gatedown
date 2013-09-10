window.gatedown = window.gatedown || {};
window.gatedown.src = window.gatedown.src || {};
window.gatedown.app = window.gatedown.app || {};


window.gatedown.src.Director = function() {

};

window.gatedown.src.Director.prototype = {
  backgroundColor: '#333333',
  start: function() {
    // Start crafty and set a background color so that we can see it's working
    Crafty.init(480, 320);
    Crafty.background(this.backgroundColor);
    Crafty.scene('Planet')
  }
}
