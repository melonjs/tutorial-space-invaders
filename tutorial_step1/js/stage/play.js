import * as me from 'https://cdn.jsdelivr.net/npm/melonjs@10/dist/melonjs.module.js';
import PlayerEntity from "../renderables/player.js";
import EnemyEntity from './../renderables/enemy.js';

class PlayScreen extends me.Stage {
    /**
     *  action to perform on state change
     */
    onResetEvent() {

        me.game.world.addChild(new me.ColorLayer("background", "#000000"), 0);

        this.player = new PlayerEntity();
        this.enemy = new EnemyEntity(50, 50);

        me.game.world.addChild(this.player, 1);
        me.game.world.addChild(this.enemy, 2);

    }
};

export default PlayScreen;
