import * as me from 'https://cdn.jsdelivr.net/npm/melonjs@10.1.0/dist/melonjs.module.js';

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
};


// Note : Jay Inheritance to be replaced with standard ES6 inheritance in melonjs 10+
class Laser extends me.Entity {
    constructor(x, y) {
        super(x, y, { width: CONSTANTS.LASER.WIDTH, height: CONSTANTS.LASER.HEIGHT });


        this.z = 5;
        this.body.vel.set(0, 300);
        this.body.force.set(0, 300);
        this.body.collisionType = me.collision.types.PROJECTILE_OBJECT;

        this.body.ignoresGravity = true;

        this.renderable = new LaserRenderable();
        this.alwaysUpdate = true;
    }

    /**
     *
     * @param dt
     * @returns {boolean}
     */
    update(dt) {
        super.update(dt);

        this.body.vel.y -= this.body.force.y * dt / 1000;

        if (this.pos.y + this.height <= 0) {
            me.game.world.removeChild(this);
        }

        return true;
    }
}

export default Laser;