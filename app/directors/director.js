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
window.gatedown.app.enemy = function(faction) {
  return faction == 1? 2: 1;
}
window.gatedown.app.angles = function(ang1, ang2) {
  if(ang1 === ang2) {
    return 0;
  }
  if(
    ((ang1 - ang2) + 360) % 360 > 180
  ) {
    return -1;
  } else {
    return 1;
  }
}
window.gatedown.src.Director.prototype = {
  backgroundColor: '#CCCCCC',
  start: function() {
    // Start crafty and set a background color so that we can see it's working
    Crafty.init(window.gatedown.config.width, window.gatedown.config.height);
    Crafty.background(this.backgroundColor);
    this.missionControl = new window.gatedown.src.MissionControl();
    Crafty.scene('Planet')
  },
  missionNames: [
    'shootDownSatellite',
    'asteroidHuntMission',
    'clearAreaMission',
    'scortFreighterMission'
  ],
  nextMission: function() {
    return this.missionNames[Math.floor(Math.random() * this.missionNames.length)]
  }
}
