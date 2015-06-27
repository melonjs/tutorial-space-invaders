game.Player = me.Sprite.extend({
    init: function () {
        var image = me.loader.getImage("player");
        this._super(me.Sprite, "init", [me.game.viewport.width / 2 - image.width / 2, me.game.viewport.height - image.height - 20, { image: image }]);
    }
});