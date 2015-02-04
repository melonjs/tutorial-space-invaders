game.Laser = me.Entity.extend({
    init: function (x, y) {
        this._super(me.Entity, "init", [x, y, { width: game.Laser.width, height: game.Laser.height }]);
        this.z = 5;
        this.body.addShape(new me.Rect(0, 0, this.width, this.height));
        this.body.updateBounds();
        this.body.setVelocity(0, 30);
        this.body.collisionType = me.collision.types.PROJECTILE_OBJECT;
        this.renderable = new (me.Renderable.extend({
            init: function () {
                this._super(me.Renderable, "init", [0, 0, game.Laser.width, game.Laser.height]);
            },
            destroy: function () {},
            draw: function (renderer) {
                var color = renderer.globalColor;
                renderer.setColor('#5EFF7E');
                renderer.fillRect(0, 0, this.width, this.height);
                renderer.setColor(color);
            }
        }));
        this.alwaysUpdate = true;
    },

    onCollision: function (res, other) {
        if (other.name === "ship") {
            me.game.world.removeChild(this);
            me.game.world.removeChild(other);
            return false;
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