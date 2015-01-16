game.Laser = me.Renderable.extend({
    init: function (x, y) {
        this._super(me.Renderable, "init", [x, y, game.Laser.width, game.Laser.height]);
        this.z = 5;
        this.body = new me.Body(this, ([
            new me.Polygon(0, 0, [
                new me.Vector2d(0, 0),
                new me.Vector2d(this.width, 0),
                new me.Vector2d(this.width, this.height),
                new me.Vector2d(0, this.height)
            ])
        ]));
        this.body.updateBounds();
        this.body.setVelocity(0, 20);
        this.body.collisionType = me.collision.types.PROJECTILE_OBJECT;
    },

    draw: function (renderer) {
        var color = renderer.getColor();
        renderer.setColor('#5EFF7E');
        renderer.fillRect(this.pos.x, this.pos.y, this.width, this.height);
        renderer.setColor(color);
    },

    onCollision: function (res, other) {
        console.log(other.name);
        if (other.name === "ship") {
            me.game.world.removeChild(this);
            me.game.world.removeChild(other);
        }
    },

    update: function (time) {
        this._super(me.Renderable, "update", [time]);
        this.body.vel.y -= this.body.accel.y * me.timer.tick;
        if (this.pos.y + this.height <= 0) {
            me.game.world.removeChild(this);
        }

        this.body.update();
        me.collision.check(this);

        return true;
    }
});

game.Laser.width = 5;
game.Laser.height = 28;