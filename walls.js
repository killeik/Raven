export default class Walls {
    constructor(canvas, scl) {
        this.x1 = canvas.width / 9 / scl;
        this.y1 = canvas.height / 18 / scl;
        this.x2 = canvas.width / 9 * 8 / scl;
        this.y2 = canvas.height / 18 * 17 / scl;

        this.width = this.x2 - this.x1;
        this.height = this.y2 - this.y1;
    }
    get mid_x() {
        return this.x1 + (this.width / 2)
    }
    get mid_y() {
        return this.y1 + (this.height / 2)
    }

    Draw() {
        noFill();
        stroke("#CCC");
        strokeWeight(5);
        strokeJoin(ROUND);
        rect(this.x1, this.y1, this.x2 - this.x1, this.y2 - this.y1);
    }
}
