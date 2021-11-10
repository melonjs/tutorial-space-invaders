import * as me from 'https://cdn.jsdelivr.net/npm/melonjs@10.1.0/dist/melonjs.module.js';

// Note : Jay Inheritance to be replaced with standard ES6 inheritance in melonjs 10+
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
