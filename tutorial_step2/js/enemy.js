game.Enemy = me.Entity.extend({
    init: function (x, y) {
        this._super(me.Entity, "init", [x, y, {
            image: "ships",
            width: 32,
            height: 32
        }]);
        this.chooseShipImage();
    },

    chooseShipImage: function () {
        var frame = ~~(Math.random() * 3);
        this.renderable.addAnimation("idle", [frame], 1);
        this.renderable.setCurrentAnimation("idle");
    },

    update: function (dt) {
        this._super(me.Entity, "update", [dt]);
        return true;
    }
});