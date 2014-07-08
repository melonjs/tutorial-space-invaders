game.Enemy = me.SpriteObject.extend({
    init: function (x, y) {
        this.parent(x, y, me.loader.getImage('ships'), 32, 32);

        this.chooseShipImage();
    },

    chooseShipImage: function () {
        var xTile = ~~(Math.random() * 2) * this.width;
        var yTile = ~~(Math.random() * 2) * this.height;

        this.offset.set(xTile, yTile);
    }
});