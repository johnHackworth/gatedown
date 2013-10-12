window.gatedown = window.gatedown || {};
window.gatedown.src = window.gatedown.src || {};
window.gatedown.app = window.gatedown.app || {};
window.gatedown.app.scenes = window.gatedown.app.scenes || {};

window.gatedown.app.scenes.selectMision = {};

Crafty.scene('SelectMission', (function() {

  this.bg = Crafty.e("2D, Canvas, Image")
             .image("http://localhost:8000/assets/stars.jpg", "repeat")

}).bind(window.gatedown.app.scenes.selectMision ),
function() {

});
