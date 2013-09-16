window.gatedown = window.gatedown || {};
window.gatedown.src = window.gatedown.src || {};

window.gatedown.src.pilot = function() {
  this.init();
}

window.gatedown.src.pilot.prototype = {
  SHIP_NEARBY: 600,
  hability: 50,
  sight: 50,
  mechanics: 50,
  init: function() {

  },
  assignShip: function(ship) {
    ship.pilot = this;
    this.ship = ship;
  },
  chooseTarget: function() {
    if(!this.ship) return;
    var ships = Crafty('Ship');
    var nearestShip = null;
    var nearestDistance = 10000;
    var otherShip = null;
    for(var i = ships.length - 1; i >= 0; i--) {
      otherShip = Crafty(ships[i]);
      // debugger;
      if(otherShip.faction  != this.ship.faction) {
        if(otherShip.distanceTo(this.ship) < nearestDistance) {
          nearestShip = otherShip
        }
      }
    }
    if(nearestShip) {
      this.attackingTarget = nearestShip;
    }
  },
  action: function() {
    if(!this.attackingTarget) {
      // this.chooseTarget();
    }
    if(this.attackingTarget) {
      this.attack(this.attackingTarget);
    }
  },
  attack: function(target) {
    this.ship.intendedDirection = this.ship.getAngleTo(target);
    // this.ship.accelerate();
    // this.ship.shoot();
  }


}
