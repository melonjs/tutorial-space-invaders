game.EnemyManager = me.Container.extend({
  init: function () {
    this._super(me.Container, "init", [0, 32, 9 * 64 - 32, 4 * 64 - 32]);
    this.z = 2;
    this.timer = me.timer.getTime();
    this.vel = 16;
  },
  createEnemies: function () {
    for (var i = 0; i < 9; i++) {
      for (var j = 0; j < 4; j++) {
        this.addChild(me.pool.pull("enemy", i * 64, j * 64));
      }
    }
    this.createdEnemies = true;
  },

  onActivateEvent: function () {
    var _this = this;
    this.timer = me.timer.setInterval(function () {
      _this.pos.x += _this.vel;
    }, 1000);
  },

  onDeactivateEvent: function () {
    me.timer.clearInterval(this.timer);
  },

  update: function (time) {
    var bounds = this.getBounds();
    var right = this.pos.x + bounds.right;
    var left = this.pos.x + bounds.left;

    if ((this.vel > 0 && (right + this.vel) >= me.game.viewport.width) || (this.vel < 0 && (left + this.vel) <= 0)) {
      this.vel *= -1;
      this.pos.y += 16;
      if (this.vel > 0) {
        this.vel += 5;
      }
      else {
        this.vel -= 5;
      }
    }

    if (this.children.length === 0 && this.createdEnemies) {
      game.playScreen.reset();
    }

    game.playScreen.checkIfLoss(this.pos.y + bounds.bottom);

    this._super(me.Container, "update", [time]);
  }
});