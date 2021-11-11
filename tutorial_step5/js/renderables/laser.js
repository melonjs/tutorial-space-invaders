import * as me from 'https://cdn.jsdelivr.net/npm/melonjs@10.1.0/dist/melonjs.module.js';

import PlayScreen from "../stage/play.js";
import CONSTANTS from '../constants.js';


/**
 *
 */
export class LaserRenderable extends me.Renderable {
    constructor() {
        super(0, 0, CONSTANTS.LASER.WIDTH, CONSTANTS.LASER.HEIGHT);

        this.z = 5;
    }

    destroy() {

    }

    draw(renderer) {
        let color = renderer.getColor();
        renderer.setColor('#5EFF7E');
        renderer.fillRect(0, 0, this.width, this.height);
        renderer.setColor(color);
    }
}


// Note : Jay Inheritance to be replaced with standard ES6 inheritance in melonjs 10+
class Laser extends me.Entity {
    constructor(x, y) {
        super(x, y, { width: CONSTANTS.LASER.WIDTH, height: CONSTANTS.LASER.HEIGHT });


        this.z = 5;

        // this body has a velocity of 0 units horizontal and 16 units vertically
        this.body.vel.set(0, 16);

        // the force to be applied at each update is -8 units vertically (in html, this means towards top of window)
        this.body.force.set(0, -8);

        // cap the velocity of the laser beam to the initial velocity
        this.body.setMaxVelocity(3, 16);

        // this object is officially a projectile
        this.body.collisionType = me.collision.types.PROJECTILE_OBJECT;

        // don't let gravity affect the object
        this.body.ignoreGravity = true;


        this.renderable = new LaserRenderable();
        this.alwaysUpdate = true;
    }

    /**
     *
     * @param dt
     * @returns {boolean}
     */
    update(dt) {
        // because we're using melonjs' physics system, all we need to do is update the object.
        // this call will move the object
        super.update(dt);

        // if the laser is above the screen, remove it from the game world
        if (this.pos.y + this.height <= 0) {
            me.game.world.removeChild(this);
        }

        return true;
    }


    /**
     *
     * @param response
     * @param other
     * @returns {boolean}
     */
    onCollision(response, other) {

        if (other.body.collisionType === me.collision.types.ENEMY_OBJECT) {
            me.game.world.removeChild(this);

            // this works, but I'm not a huge fan of it. enemyManager is only defined on the PlayScreen, so this assumes
            //  that the only time this handler will fire is in the play state. I would prefer something like:
            //
            // me.state.get(me.state.PLAY).enemyManager.removeChild(other);
            //
            // that would ensure that the screen trying to access the enemyManager is always the play screen

            if(me.state.current() instanceof PlayScreen)
                me.state.current().enemyManager.removeChild(other);

            return false;
        }
    }
}

export default Laser;