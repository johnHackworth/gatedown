Crafty.c('missionWindow', {
  pause: true,
  backgroundColor: 'rgba(255,255,255,0.99 )',
  init: function() {
  },
  initialize: function(options) {
    var w = gatedown.config.width;
    var h = gatedown.config.height;
    this.options = options;
    this.modalW = this.requires('ModalWindow')
    // this.z = 9999999999999;
    this.addText('Mission Briefing', w/2 -100, 20, '#880000', {size: '30px'});
    for(var i in this.options.texts) {
      this.addText(this.options.texts[i], 100, 50 + i*15);
    }
    this.addText('Primary objetive', 100, 150, '#111111', {size: '20px'});
    this.addText(this.options.primaryObjetive,100, 180);

    this.addText('Secondary objetive', 100, 220, '#111111', {size: '20px'});
    this.addText(this.options.secondaryObjetive,100, 250);

    this.modalW.setOptions({
      pause: true,
      backgroundColor: 'rgba(255,235,155,0.6)'
    });
    setTimeout(this.keyDown.bind(this), 100);
  },
  keyDown: function() {
    this.bind('KeyDown', this.destroyWindow.bind(this));
  },
  destroyWindow: function() {
    Crafty.pause();
    for(var i = 0, l = this.drawnTexts.length; i < l; i++) {
      this.drawnTexts[i].destroy();
    }
    this.destroy();
  }
});
