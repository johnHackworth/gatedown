Crafty.c('ModalWindow', {
  backgroundColor: 'rgba(255,255,255,0.5)',
  pause: false,
  init: function() {
    this.requires('2d, Canvas, Text, Color')
    this.initialize();
    // this.ready = false;
  },
  initialize: function() {
    this.color(this.backgroundColor);
    this.width = 600;
    this.height = 400;
    this.bind('EnterFrame', this.tick.bind(this));
    this.texts = [];
    this.drawnTexts = [];
    if(this.pause) {
      Crafty.pause();
    }
  },
  setOptions: function(options) {
    if(options.backgroundColor) {
      this.backgroundColor = options.backgroundColor;
      this.color(this.backgroundColor);
    }
    if(options.pause) {
      this.pause = options.pause;
      if(this.pause) {
        Crafty.pause();
        this.tick();
      }
    }
  },
  addText: function(text, x, y) {
    this.texts.push( {
      text:text,
      x:x,
      y:y
    })

    this.drawnTexts.push(Crafty.e('Text, Entity'))
  },
  at: function(x,y) {
    this.xPos = x;
    this.yPos = y;
    return this;
  },
  tick: function(ctx) {
    this.x = 0 - Crafty.viewport.x;
    this.y = 0 - Crafty.viewport.y;
    this.w = this.width;
    this.h = this.height;
    var i = 0;
    var color = '#BB3333';
    for(var i = 0, l = this.texts.length; i < l; i++) {
      this.drawnTexts[i].text(this.texts[i].text)
        .textColor(color)
        .at(this.x + this.texts[i].x, this.y + this.texts[i].y)
    }
  }

});
