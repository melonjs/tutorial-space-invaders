import * as me from 'https://cdn.jsdelivr.net/npm/melonjs@10/dist/melonjs.module.js';
import EnemyEntity from './../renderables/enemy.js';

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
                var enemy = new EnemyEntity(i * 64, j * 64);
                this.addChild(enemy);
            }
        }
    }

    onActivateEvent() {
        this.timer = me.timer.setInterval(() => {

            let bounds = this.getBounds();

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
            }
            else {
                this.pos.x += this.vel;
            }


        }, 1000);
    }

    onDeactivateEvent() {
        me.timer.clearInterval(this.timer);
    }
}

export default EnemyManager;
