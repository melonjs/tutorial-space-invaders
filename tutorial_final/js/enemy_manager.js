game.EnemyManager = me.ObjectContainer.extend({
  init: function () {
    this.parent(0, 32, 9 * 64 - 32, 4 * 64 - 32);
    this.z = 2;
    this.time = me.timer.getTime();
    this.vel = 16;
  },
  createEnemies: function () {
    for (var i = 0; i < 9; i++) {
      for (var j = 0; j < 4; j++) {
        this.addChild(me.pool.pull("enemy", i * 64, j * 64));
      }
    }
  },

  update: function (time) {
    this.parent(time);

    if ((this.vel > 0 && this.right >= me.game.viewport.width) || (this.vel < 0 && this.left <= 0)) {
      this.vel *= -1;
      this.pos.y += 16;
    }

    if (me.timer.getTime() - this.time >= 1000) {
      this.pos.x += this.vel;
      this.time = me.timer.getTime();
    }
  }
});