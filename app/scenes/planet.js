window.gatedown = window.gatedown || {};
window.gatedown.src = window.gatedown.src || {};
window.gatedown.app = window.gatedown.app || {};
window.gatedown.app.scenes = window.gatedown.app.scenes || {};

window.gatedown.app.scenes.planet = {};

Crafty.scene('Planet', (function() {
  var self = this;
  this.TOTAL_WIDTH = 50000;
  this.TOTAL_HEIGHT = 50000;

  this.bg = Crafty.e("2D, Canvas, Image")
             .attr({x:0-this.TOTAL_WIDTH / 2, y: 0-this.TOTAL_HEIGHT/2, w: this.TOTAL_WIDTH, h:this.TOTAL_HEIGHT})
             // .image("http://fc09.deviantart.net/fs71/i/2011/078/a/a/simplistic_space_background_by_swordkirby9999-d3c04tz.jpg", "repeat");
             .image("http://localhost:8000/assets/stars.jpg", "repeat")
  this.showHelpWindow = function() {
    if(self.helpWindow) {
      self.helpWindow.destroy();
      delete self.helpWindow;
    }
    self.helpWindow = Crafty.e("HelpWindow");
  }

  this.control = window.gatedown.app.director.missionControl;
  this.control.clearAreaMission(1)

  setTimeout(function() {
    self.missionWindow = Crafty.e('missionWindow');
    self.missionWindow.initialize({
      texts:[],
      primaryObjetive: self.control.primaryObjetive.text,
      secondaryObjetive: self.control.secondaryObjetive.text
    })
  }, 2000);

  this.keyListener = Crafty.e("KeyListener");
  this.keyListener.set(this);

  this.radar = Crafty.e("Radar")
    .at(window.gatedown.config.width - 70, window.gatedown.config.height - 70)
    .scale(100)
    .text('Long distance')
    .followShips(window.gatedown.app.director.missionControl.ships,
      window.gatedown.app.director.missionControl.playerShip
    );

  this.radar2 = Crafty.e("Radar")
    .at(70, window.gatedown.config.height - 70)
    .scale(10)
    .text('Short distance')
    .followShips(window.gatedown.app.director.missionControl.ships,
      window.gatedown.app.director.missionControl.playerShip);
    window.radar = this.radar;
  this.radio = Crafty.e("Radio")
  this.radio.subscribeChannel(2);
  this.radio.subscribeChannel(0);
  setTimeout(function() {
    self.radar._draw();
    self.radar2._draw();
  },500)

}).bind(window.gatedown.app.scenes.planet ),
function() {

});
