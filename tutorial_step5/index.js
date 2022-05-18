import * as me from 'https://cdn.jsdelivr.net/npm/melonjs@10/dist/melonjs.module.js';

import PlayScreen from './js/stage/play.js';
import PlayerEntity from './js/renderables/player.js';
import EnemyEntity from './js/renderables/enemy.js';
import Laser from './js/renderables/laser.js';

import DataManifest from './manifest.js';


me.device.onReady(function () {

    // initialize the display canvas once the device/browser is ready
    if (!me.video.init(800, 600, {parent : "screen", scale : "auto", scaleMethod: "flex-width"})) {
        alert("Your browser does not support HTML5 canvas.");
        return;
    }

    // Initialize the audio.
    me.audio.init("mp3,ogg");

    // allow cross-origin for image/texture loading
    me.loader.crossOrigin = "anonymous";

    // set and load all resources.
    me.loader.preload(DataManifest, function() {
        // set the user defined game stages
        me.state.set(me.state.PLAY, new PlayScreen());

        // add our player entity in the entity pool
        me.pool.register("player", PlayerEntity);
        me.pool.register("enemy", EnemyEntity);
        me.pool.register("laser", Laser);

        // Start the game.
        me.state.change(me.state.PLAY);
    });
});
