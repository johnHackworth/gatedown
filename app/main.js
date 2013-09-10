window.gatedown = window.gatedown || {};
window.gatedown.src = window.gatedown.src || {};
window.gatedown.app = window.gatedown.app || {};

window.onload = function() {
  window.gatedown.app.director = new window.gatedown.src.Director();
  window.gatedown.app.director.start();
}
