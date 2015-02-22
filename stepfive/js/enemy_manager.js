game.EnemyManager = me.Container.extend({
    init: function () {
        this.COLS = 9;
        this.ROWS = 4;
        this._super(me.Container, "init", [0, 32, this.COLS * 64 - 32, this.ROWS * 64 - 32]);
        this.timer = me.timer.getTime();
        this.vel = 0.5;
    },

    addChild: function (child, z) {
        this._super(me.Container, "addChild", [child, z]);
        this.resizeChildBounds();
    },

    createEnemies: function () {
        for (var i = 0; i < this.COLS; i++) {
            for (var j = 0; j < this.ROWS; j++) {
                this.addChild(me.pool.pull("enemy", i * 64, j * 64));
            }
        }
        this.createdEnemies = true;
    },

    removeChildNow: function (child) {
        this._super(me.Container, "removeChildNow", [child]);
        this.resizeChildBounds();
    },

    update: function (time) {
        this.pos.x += this.vel;
        var bounds = this.childBounds;
        var right = this.pos.x + bounds.right;
        var left = this.pos.x + bounds.left;

        if ((this.vel > 0 && (right + this.vel) >= me.game.viewport.width) || (this.vel < 0 && (left + this.vel) <= 0)) {
            this.vel *= -1;
            this.pos.y += 16;
            if (this.vel > 0) {
                this.vel += 0.2;
            }
            else {
                this.vel -= 0.2;
            }
        }

        if ((this.pos.y + this.childBounds.bottom >= game.playScreen.player.pos.y) ||
            (this.children.length === 0 && this.createdEnemies)) {
            game.playScreen.reset.defer(game.playScreen);
            return false;
        }
        else {
            return this._super(me.Container, "update", [time]);
        }
    }
});
