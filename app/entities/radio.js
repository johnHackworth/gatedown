Crafty.c("Radio", {
  channels:[],
  init: function() {
    this.requires('2D, Canvas')
    this.xPos = 20;
    this.yPos = 20;
    this.ready = true;
    this.context = Crafty.canvas.context;
    this.messages = [];
    this.texts = [];
    this.bind("EnterFrame", this.tick.bind(this));
    Crafty.bind("radioMessage", this.receive.bind(this));
    for(var i = 0; i < 10; i++) {
      this.texts[i] = Crafty.e('Text, Entity')
    }
  },
  at: function(x,y) {
    this.xPos = x;
    this.yPos = y;
    return this;
  },
  receive: function(message) {
    if(this.channels.indexOf(message.channel) >= 0) {
      this.messages.unshift(message);
    }
  },
  subscribeChannel: function(channelNumber) {
    this.channels.push(channelNumber);
  },
  tick: function(ctx) {
    this.x = this.xPos - Crafty.viewport.x;
    this.y = this.yPos - Crafty.viewport.y;
    var i = 0;
    while(i<10) {
      if(this.messages[i]) {
        this.texts[i].text(this.messages[i].origin.name + ': ' + this.messages[i].text)
          .textColor('#FFFFFF', 0.1 * (10/(i+1)))
          .at(this.x, this.y + i*15)
      }
      i++;
    }
  }

});
