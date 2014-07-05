game.Laser = me.Renderable.extend({
    init: function (x, y) {
        this.parent(new me.Vector2d(x, y), game.Laser.width, game.Laser.height);
        this.z = 5;
    },

    draw: function (context) {
        context.fillStyle = '#5EFF7E';
        context.fillRect(this.pos.x, this.pos.y, this.width, this.height);
    },

    update: function (time) {
        this.parent(time);

        this.pos.y -= 750 * me.timer.getDelta() / 1000;
        if (this.pos.y + this.height <= 0) {
            me.game.world.removeChild(this);
        }
    }
});

game.Laser.width = 5;
game.Laser.height = 28;