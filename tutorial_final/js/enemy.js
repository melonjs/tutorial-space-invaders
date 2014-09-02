game.Enemy = me.Sprite.extend({
    init: function (x, y) {
        this._super(me.Sprite, "init", [x, y, me.loader.getImage('ships'), 32, 32]);
        this.body = new me.Body(this);
        this.chooseShipImage();
    },

    chooseShipImage: function () {
        var xTile = ~~(Math.random() * 2) * this.width;
        var yTile = ~~(Math.random() * 2) * this.height;

        this.offset.set(xTile, yTile);
    }
});