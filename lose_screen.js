class LoseScreen {
    constructor(canvas) {
        this.x1 = canvas.width / 20;
        this.y1 = canvas.height / 18;
        this.x2 = canvas.width / 20 * 19;
        this.y2 = canvas.height / 18 * 17;

        this.width = this.x2 - this.x1;
        this.height = this.y2 - this.y1;
    }

    draw(button) {
        this.Border();
    }
    Border() {
        fill('#1a1c1d');
        stroke("#CCC");
        strokeWeight(this.width / 130);
        strokeJoin(ROUND);
        rect(this.x1, this.y1, this.width, this.height, this.width / 6);
    }

}