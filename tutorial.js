class Tutorial {
    constructor(canvas) {
        this.x1 = canvas.width / 3;
        this.y1 = canvas.height / 18;
        this.x2 = canvas.width / 20 * 19;
        this.y2 = canvas.height / 18 * 17;

        this.width = this.x2 - this.x1;
        this.height = this.y2 - this.y1;
    }
    draw(gameCondition) {
        this.Border();
        this.Tutorial();
        this.WASD();
        this.Arrows();
    }
    Border() {
        fill('#1a1c1d');
        stroke("#CCC");
        strokeWeight(this.width / 130);
        strokeJoin(ROUND);
        rect(this.x1, this.y1, this.width, this.height, this.width / 6);
    }

    Tutorial() {
        fill("#CCC");
        textFont(fredoka_medium, this.width / 10);
        strokeWeight(0);
        textAlign(CENTER, CENTER)
        text('How to play:', this.x1 + (this.width / 2), this.y1 + (this.height / 15));

    }
    WASD() {
        this.W();
        this.A();
        this.S();
        this.D();

        fill("#CCC");
        textFont(fredoka_medium, this.width / 13);
        strokeWeight(0);
        textAlign(CENTER, CENTER)
        text('move', this.x1 + (this.width / 2), this.y1 * 7.5);
    }
    W() {
        fill('#1a1c1d');
        stroke("#CCC");
        strokeWeight(this.width / 170);
        strokeJoin(ROUND);
        rect(this.x1 * 1.55, this.y1 * 5, this.width / 12, this.width / 12, this.width / 40);

        fill("#CCC");
        textFont(fredoka_medium, this.width / 13);
        strokeWeight(0);
        textAlign(CENTER, CENTER)
        text('w', this.x1 * 1.55 + this.width / 24, this.y1 * 5 + this.width / 36)

    }
    A() {
        fill('#1a1c1d');
        stroke("#CCC");
        strokeWeight(this.width / 170);
        strokeJoin(ROUND);
        rect(this.x1 * 1.75, this.y1 * 5, this.width / 12, this.width / 12, this.width / 40);

        fill("#CCC");
        textFont(fredoka_medium, this.width / 13);
        strokeWeight(0);
        textAlign(CENTER, CENTER)
        text('a', this.x1 * 1.75 + this.width / 24, this.y1 * 5 + this.width / 36)
    }
    S() {
        fill('#1a1c1d');
        stroke("#CCC");
        strokeWeight(this.width / 170);
        strokeJoin(ROUND);
        rect(this.x1 * 1.95, this.y1 * 5, this.width / 12, this.width / 12, this.width / 40);

        fill("#CCC");
        textFont(fredoka_medium, this.width / 13);
        strokeWeight(0);
        textAlign(CENTER, CENTER)
        text('s', this.x1 * 1.95 + this.width / 24, this.y1 * 5 + this.width / 36)
    }
    D() {
        fill('#1a1c1d');
        stroke("#CCC");
        strokeWeight(this.width / 170);
        strokeJoin(ROUND);
        rect(this.x1 * 2.15, this.y1 * 5, this.width / 12, this.width / 12, this.width / 40);

        fill("#CCC");
        textFont(fredoka_medium, this.width / 13);
        strokeWeight(0);
        textAlign(CENTER, CENTER)
        text('d', this.x1 * 2.15 + this.width / 24, this.y1 * 5 + this.width / 36)
    }

    Arrows() {
        this.Left();
        this.Up();
        this.Down();
        this.Right();

        fill("#CCC");
        textFont(fredoka_medium, this.width / 13);
        strokeWeight(0);
        textAlign(CENTER, CENTER)
        text('shoot', this.x1 + (this.width / 2), this.y1 * 12.5);
    }
    Left() {
        fill('#1a1c1d');
        stroke("#CCC");
        strokeWeight(this.width / 170);
        strokeJoin(ROUND);
        rect(this.x1 * 1.55, this.y1 * 10, this.width / 12, this.width / 12, this.width / 40);

        fill("#CCC");
        textFont("Source Sans Pro", this.width / 12);
        strokeWeight(3);
        textAlign(CENTER, CENTER)
        text('⭠', this.x1 * 1.55 + this.width / 24, this.y1 * 10 + this.width / 22)
    }
    Up() {
        fill('#1a1c1d');
        stroke("#CCC");
        strokeWeight(this.width / 170);
        strokeJoin(ROUND);
        rect(this.x1 * 1.75, this.y1 * 10, this.width / 12, this.width / 12, this.width / 40);

        fill("#CCC");
        textFont("Source Sans Pro", this.width / 12);
        strokeWeight(3);
        textAlign(CENTER, CENTER)
        text('⭡', this.x1 * 1.75 + this.width / 24, this.y1 * 10 + this.width / 22)

    }
    Down() {
        fill('#1a1c1d');
        stroke("#CCC");
        strokeWeight(this.width / 170);
        strokeJoin(ROUND);
        rect(this.x1 * 1.95, this.y1 * 10, this.width / 12, this.width / 12, this.width / 40);

        fill("#CCC");
        textFont("Source Sans Pro", this.width / 12);
        strokeWeight(3);
        textAlign(CENTER, CENTER)
        text('⭣', this.x1 * 1.95 + this.width / 24, this.y1 * 10 + this.width / 22)
    }
    Right() {
        fill('#1a1c1d');
        stroke("#CCC");
        strokeWeight(this.width / 170);
        strokeJoin(ROUND);
        rect(this.x1 * 2.15, this.y1 * 10, this.width / 12, this.width / 12, this.width / 40);

        fill("#CCC");
        textFont("Source Sans Pro", this.width / 12);
        strokeWeight(3);
        textAlign(CENTER, CENTER)
        text('⭢', this.x1 * 2.15 + this.width / 24, this.y1 * 10 + this.width / 22)
    }
}