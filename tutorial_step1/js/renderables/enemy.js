import * as me from 'https://cdn.jsdelivr.net/npm/melonjs@10/dist/melonjs.module.js';

class EnemyEntity extends me.Sprite {
    constructor(x, y) {
        super(x, y, {
            image: "ships",
            framewidth: 32,
            frameheight: 32,
        });

        // give the sprite a physics body so it can collide and stuff
        this.body = new me.Body(this);
        this.body.addShape(new me.Rect(0, 0, this.width, this.height));
        this.body.ignoreGravity = true;

        //
        this.chooseShipImage();
    }

    /**
     *
     */
    chooseShipImage() {
        let frame = me.Math.random(0, 4);

        this.addAnimation("idle", [frame], 1);
        this.setCurrentAnimation("idle");
    }
}

export default EnemyEntity;
