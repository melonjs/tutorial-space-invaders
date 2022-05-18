import * as me from 'https://cdn.jsdelivr.net/npm/melonjs@10/dist/melonjs.module.js';

class PlayScreen extends me.Stage {
    /**
     *  action to perform on state change
     */
    onResetEvent() {

        me.game.world.addChild(new me.ColorLayer("background", "#000000"), 0);

        me.game.world.addChild(me.pool.pull("player"), 1);
        me.game.world.addChild(me.pool.pull("enemy", 50, 50), 2);

    }
};

export default PlayScreen;
