game.EnemyManager = me.Container.extend({
    init: function () {
        this.COLS = 9;
        this.ROWS = 4;
        this._super(me.Container, "init", [0, 32, this.COLS * 64 - 32, this.ROWS * 64 - 32]);
        this.childBounds = this.getBounds().clone();
        this.timer = me.timer.getTime();
        this.vel = 16;
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
            var right = _this.pos.x + bounds.right;
            var left = _this.pos.x;

            if ((_this.vel > 0 && (right + _this.vel) >= me.game.viewport.width) || (_this.vel < 0 && (left + _this.vel) <= 0)) {
                _this.vel *= -1;
                _this.pos.y += 16;
                if (_this.vel > 0) {
                    _this.vel += 5;
                }
                else {
                    _this.vel -= 5;
                }
            }
            else {
                _this.pos.x += _this.vel;
            }
            game.playScreen.checkIfLoss(_this.pos.y + _this.childBounds.bottom);
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
    }
});