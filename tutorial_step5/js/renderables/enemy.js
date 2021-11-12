import * as me from 'https://cdn.jsdelivr.net/npm/melonjs@10.1.0/dist/melonjs.module.js';

class EnemyEntity extends me.Sprite {
    constructor(x, y) {
        super(x, y, {
            image: "ships",
            width: 32,
            height: 32,

            framewidth: 32,
            frameheight: 32,
        });

        // give the sprite a physics body so it can collide and stuff
        this.body = new me.Body(this);
        this.body.addShape(new me.Rect(0, 0, this.width, this.height));

        this.body.vel.set(0, 0);
        this.body.collisionType = me.collision.types.ENEMY_OBJECT;

        this.body.ignoreGravity = true;

        //
        this.chooseShipImage();
    }

    /**
     *
     * @param dt
     * @returns {boolean}
     */
    update(dt) {
        super.update(dt);

        return true;
    }

    /**
     *
     */
    chooseShipImage() {
        let frame = ~~(Math.random() * 3);

        this.addAnimation("idle", [frame], 1);
        this.setCurrentAnimation("idle");
    }
}

export default EnemyEntity;
