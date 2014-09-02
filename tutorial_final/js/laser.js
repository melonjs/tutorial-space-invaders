game.Laser = me.Renderable.extend({
    init: function (x, y) {
        this._super(me.Renderable, "init", [x, y, game.Laser.width, game.Laser.height]);
        this.z = 5;
    },

    draw: function (renderer) {
        renderer.fillRect(this.pos.x, this.pos.y, this.width, this.height, '#5EFF7E');
    },

    update: function (time) {
        this.pos.y -= 750 * me.timer.getDelta() / 1000;
        if (this.pos.y + this.height <= 0) {
            me.game.world.removeChild(this);
        }
    }
});

game.Laser.width = 5;
game.Laser.height = 28;