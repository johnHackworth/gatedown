window.gatedown = window.gatedown || {};
window.gatedown.src = window.gatedown.src || {};

window.gatedown.src.gunner = function() {
  this.init();
}

window.gatedown.src.gunner.prototype = {
  SHIP_NEARBY: 1000,
  SHOOTING_DISTANCE: 500,
  THINK_DELTA: 5,
  hability: 50,
  sight: 50,
  mechanics: 50,
  counter: 0,
  init: function() {
  },
  assignTurret: function(turret) {
    turret.gunner = this;
    this.turret = turret;
    this.turret.bind('destroyShip', this.notifyDestroy.bind(this));
  },
  notifyDestroy: function() {
  },
  notifyHeavyDamage: function() {
  },
  searchTarget: function() {
    if(!this.turret) return;

    var ships = Crafty('Ship');
    var otherShip = null;
    for(var i = ships.length - 1; i >= 0; i--) {
      otherShip = Crafty(ships[i]);
      // debugger;
      if(otherShip.faction  != this.turret.owner.faction) {

        if(otherShip.distanceTo(this.turret.owner) < this.SHIP_NEARBY) {

          var angle = this.turret.getAngleTo(otherShip);
          if(Math.abs(angle - this.turret.rotation % 360) < 10) {
            this.turret.rotation = angle + Math.random()*10;
            this.shoot();
            return;
          } else {
            // console.log(this.turret.actualHeading());
            this.turret.rotation = this.turret.initialRotation + this.turret.owner.rotation;
            return;
          }
        }
      }
    }
  },
  action: function() {
    this.counter++;
    if(!(this.counter % this.THINK_DELTA == 0)) {
      return;
    }
    this.searchTarget();
  },
  shoot: function() {
    this.turret.shoot();
  },
  sendRadioMessage: function(text ) {
    if(!this.lastMessage ||
      this.lastMessage.message.text != text ||
      this.counter - this.lastMessage.counter > 20
    ) {
      var message = {
        channel: this.ship.faction,
        origin: this,
        text: text
      }
      this.lastMessage = {
        message: message,
        counter: this.counter
      }
      Crafty.trigger('radioMessage', message);
    }
  },
  sendPublicMessage: function(text ) {
    if(!this.lastMessage ||
      this.lastMessage.message.text != text ||
      this.counter - this.lastMessage.counter > 20
    ) {
      var message = {
        channel: 0,
        origin: this,
        text: text
      }
      this.lastMessage = {
        message: message,
        counter: this.counter
      }
      Crafty.trigger('radioMessage', message);
    }
  }




}
