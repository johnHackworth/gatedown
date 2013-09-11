window.gatedown = window.gatedown || {};
window.gatedown.src = window.gatedown.src || {};
window.gatedown.app = window.gatedown.app || {};


window.gatedown.src.Director = function() {

};
window.gatedown.config = {
  width: 500,
  height: 400
}
window.gatedown.src.Director.prototype = {
  backgroundColor: '#333333',
  start: function() {
    // Start crafty and set a background color so that we can see it's working
    Crafty.init(window.gatedown.config.width, window.gatedown.config.height);
    Crafty.background(this.backgroundColor);
    Crafty.scene('Planet')
  }
}
