window.gatedown = window.gatedown || {};
window.gatedown.src = window.gatedown.src || {};
window.gatedown.app = window.gatedown.app || {};


window.gatedown.src.Director = function() {

};
window.gatedown.config = {
  width: 800,
  height: 600,
  fps: 20
}
window.gatedown.src.Director.prototype = {
  backgroundColor: '#CCCCCC',
  start: function() {
    // Start crafty and set a background color so that we can see it's working
    Crafty.init(window.gatedown.config.width, window.gatedown.config.height);
    Crafty.background(this.backgroundColor);
    this.missionControl = new window.gatedown.src.MissionControl();
    Crafty.scene('Planet')

  }
}
