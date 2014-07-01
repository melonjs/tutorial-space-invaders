game.TitleScreen = me.ScreenObject.extend({

    /**    
     *  action to perform on state change
     */
    onResetEvent : function() {
        
        // title screen
        me.game.world.addChild(
            new me.SpriteObject (
                0,0, 
                me.loader.getImage('title_screen')
            ),
            1
        );
    },

    /**    
     *  action to perform when leaving this screen (state change)
     */
    onDestroyEvent : function() {
    }
});
