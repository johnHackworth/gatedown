Crafty.c('ShipStatusWindow', {
  pause: false,
  backgroundColor: 'transparent',
  init: function() {
    this.modalW = this.requires('ModalWindow')
    this.modalW.setOptions({
      pause: false,
      backgroundColor: 'transparent'
    });
  },

  destroyWindow: function() {
    Crafty.pause();
    for(var i = 0, l = this.drawnTexts.length; i < l; i++) {
      this.drawnTexts[i].destroy();
    }
    this.destroy();
  },
  say: function(text) {
    this.addText(text, 200, 320, '#FF9900', {size: '16px'});
  }
});
