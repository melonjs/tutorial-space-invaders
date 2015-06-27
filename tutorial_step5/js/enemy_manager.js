game.EnemyManager = me.Container.extend({
    init: function () {
        this._super(me.Container, "init", [0, 32, this.COLS * 64 - 32, this.ROWS * 64 - 32]);
        this.COLS = 9;
        this.ROWS = 4;
        this.vel = 16;
        this.childBounds = this.getBounds().clone();
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

    onActivateEvent: function () {
        var _this = this;
        this.timer = me.timer.setInterval(function () {
            var bounds = _this.childBounds;

            if ((_this.vel > 0 && (bounds.right + _this.vel) >= me.game.viewport.width) ||
                (_this.vel < 0 && (bounds.left + _this.vel) <= 0)) {
                _this.vel *= -1;
                _this.pos.y += 16;
                if (_this.vel > 0) {
                    _this.vel += 5;
                }
                else {
                    _this.vel -= 5;
                }
                game.playScreen.checkIfLoss(bounds.bottom);
            }
            else {
                _this.pos.x += _this.vel;
            }
        }, 1000);
    },

    onDeactivateEvent: function () {
        me.timer.clearInterval(this.timer);
    },

    removeChildNow: function (child) {
        this._super(me.Container, "removeChildNow", [child]);
        this.resizeChildBounds();
    },

    resizeChildBounds: function () {
        this.childBounds.pos.set(Infinity, Infinity);
        this.childBounds.resize(-Infinity, -Infinity);
        for (var i = this.children.length, child; i--, (child = this.children[i]);) {
            if (child.isRenderable) {
                this.childBounds.union(child);
            }
        }
    },

    update: function (time) {
        if (this.children.length === 0 && this.createdEnemies) {
            game.playScreen.reset();
        }
        this._super(me.Container, "update", [time]);
        this.updateChildBounds();
    }
});
