import * as me from 'https://cdn.jsdelivr.net/npm/melonjs@10.1.0/dist/melonjs.module.js';


class EnemyManager extends me.Container {
    static COLS = 9;
    static ROWS = 4;

    constructor() {
        super(32, 32, EnemyManager.COLS * 64 - 32, EnemyManager.ROWS * 64 - 32);


        this.vel = 16;
    }


    /**
     *
     */
    createEnemies() {
        for (let i = 0; i < EnemyManager.COLS; i++) {
            for (let j = 0; j < EnemyManager.ROWS; j++) {
                this.addChild(me.pool.pull("enemy", i * 64, j * 64));
            }
        }
    }




    onActivateEvent() {
        this.timer = me.timer.setInterval(() => {

            let bounds = this.getBounds();
            console.log(bounds);

            if ((this.vel > 0 && (bounds.right + this.vel) >= me.game.viewport.width) ||
                (this.vel < 0 && (bounds.left + this.vel) <= 0)) {
                this.vel *= -1;
                this.pos.y += 16;
                if (this.vel > 0) {
                    this.vel += 5;
                }
                else {
                    this.vel -= 5;
                }

                // again, I wish I could do me.state.get(me.state.PLAY).checkIfLoss()
                // this is bugging out on bounds.bottom, because bounds.bottom === Infinity when it is moving down?
                me.state.current().checkIfLoss(bounds.bottom); // <<<
            }
            else {
                this.pos.x += this.vel;
            }


        }, 250);
    }


    onDeactivateEvent() {
        me.timer.clearInterval(this.timer);
    }
}

export default EnemyManager;