game.PlayScreen = me.ScreenObject.extend({
    /**    
     *  action to perform on state change
     */
    onResetEvent: function() {
        me.game.world.addChild(new me.ColorLayer("background", "#000000", 0));
        this.player = me.pool.pull("player");
        me.game.world.addChild(this.player, 1);

        me.input.bindKey(me.input.KEY.LEFT, "left");
        me.input.bindKey(me.input.KEY.RIGHT, "right");
        me.input.bindKey(me.input.KEY.A, "left");
        me.input.bindKey(me.input.KEY.D, "right");
        me.input.bindKey(me.input.KEY.SPACE, "shoot", true);
    },
    
    
    /**    
     *  action to perform when leaving this screen (state change)
     */
    onDestroyEvent: function() {
        me.input.unbindKey(me.input.KEY.LEFT);
        me.input.unbindKey(me.input.KEY.RIGHT);
        me.input.unbindKey(me.input.KEY.A);
        me.input.unbindKey(me.input.KEY.D);
        me.input.unbindKey(me.input.KEY.SPACE);
    }
});
