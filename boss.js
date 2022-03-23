class Boss {
    constructor(walls, health, speed) {
        this.health = health;
        this.MaxHealth = health;
        this.alive = true;
        this.height = 100;
        this.width = 50;
        this.speed = speed;
        this.x = walls.mid_x - (this.width / 2);
        this.y = walls.mid_y - (this.height / 2);
    }
    get mid_x() {
        return this.x + (this.width / 2)
    }
    get mid_y() {
        return this.y + (this.height / 2)
    }

    moveToCrow(crow) {
        let vectorToCrow = createVector((crow.mid_x - this.mid_x), (crow.mid_y - this.mid_y));
        let normVecToCrow = vectorToCrow.normalize();
        this.x += this.speed * normVecToCrow.x;
        this.y += this.speed * normVecToCrow.y;
    }


    draw() {
        fill('#CCC');
        stroke("#CCC");
        strokeWeight(3);
        quad(this.x, this.y + (this.height / 4),
            this.x + (this.width / 2), this.y,
            this.x + this.width, this.y + (this.height / 4),
            this.x + (this.width / 2), this.y + this.height)

        quad(this.x - (0.5 * this.width), this.y - (0.25 * this.height),
            this.x + (this.width / 2), this.y + (this.height / 4),
            this.x + (1.5 * this.width), this.y  - (0.25 * this.height),
            this.x + (this.width / 2), this.y)

    }

    crowCollision(crow) {
        if (this.x + this.width >= crow.x &
            this.x <= crow.x + crow.width &
            this.y + this.height >= crow.y &
            this.y <= crow.y + crow.height) {
            return true;
        } else {
            return false
        }
    }
}
