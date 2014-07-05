game.Player = me.SpriteObject.extend({
    init: function () {
        var image = me.loader.getImage("player");
        this.parent(me.game.viewport.width / 2 - image.width / 2, me.game.viewport.height - image.height - 20, image);
        this.velx = 250;
        this.maxX = me.game.viewport.width - this.width;
    },

    update: function (time) {
        this.parent(time);
        if (me.input.isKeyPressed("left")) {
          this.pos.x -= this.velx * me.timer.getDelta() / 1000;
        }

        if (me.input.isKeyPressed("right")) {
          this.pos.x += this.velx * me.timer.getDelta() / 1000;
        }

        if (me.input.isKeyPressed("shoot")) {
            me.game.world.addChild(me.pool.pull("laser", this.pos.x + (this.width / 2 - game.Laser.width / 2), this.pos.y - game.Laser.height))
        }

        this.pos.x = this.pos.x.clamp(0, this.maxX);

        return true;
    }
});