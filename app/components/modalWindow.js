Crafty.c('ModalWindow', {
  backgroundColor: 'rgba(255,255,255,0.5)',
  pause: false,
  init: function() {
    this.requires('2d, Canvas, Text, Color')
    this.initialize();
    this.ready = true;
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
  addText: function(text, x, y, color, style) {
    style = style? style: {};
    this.texts.push( {
      text:text,
      x:x,
      y:y,
      color: color,
      style: style
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
    var color = '#333333';
    var textColor = color;
    for(var i = 0, l = this.texts.length; i < l; i++) {
      textColor = this.texts[i].color ? this.texts[i].color : color;
      this.drawnTexts[i].text(this.texts[i].text)
        .textColor(textColor)
        .textFont(this.texts[i].style)
        .at(this.x + this.texts[i].x, this.y + this.texts[i].y)

    }
  },
  clear: function() {
    this.texts = [];
    for(var i = 0, l = this.drawnTexts.length; i < l; i++) {
      this.drawnTexts[i].destroy();
    }
    this.drawnTexts = [];
  }
});
