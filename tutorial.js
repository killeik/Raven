export default class Tutorial {
    constructor(canvas, font_fredoka, font_noto) {
        this.x1 = canvas.width / 3;
        this.y1 = canvas.height / 18;
        this.x2 = canvas.width / 20 * 19;
        this.y2 = canvas.height / 18 * 17;

        this.width = this.x2 - this.x1;
        this.height = this.y2 - this.y1;

        this.font_fredoka = font_fredoka;
        this.font_noto = font_noto;
    }
    draw(button) {
        this.Border();
        this.Tutorial();
        this.WASD(button);
        this.Arrows(button);
        this.Map(button);
        this.Return(button);
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
        textFont(this.font_fredoka, this.width / 10);
        strokeWeight(0);
        textAlign(CENTER, CENTER)
        text('How to play:', this.x1 + (this.width / 2), this.y1 + (this.height / 15));

    }
    WASD(button) {
        this.W(button.w);
        this.A(button.a);
        this.S(button.s);
        this.D(button.d);

        
        fill("#CCC");
        textFont(this.font_fredoka, this.width / 13);
        strokeWeight(0);
        textAlign(CENTER, CENTER)
        text('move', this.x1 + (this.width / 2), this.y1 * 7.2);
    }
    W(pressed) {
        if (pressed) {
            fill('#5b6266');
        } else {
            fill('#1a1c1d');
        }
        stroke("#CCC");
        strokeWeight(this.width / 170);
        strokeJoin(ROUND);
        rect(this.x1 * 1.55, this.y1 * 5, this.width / 12, this.width / 12, this.width / 40);

        fill("#CCC");
        textFont(this.font_fredoka, this.width / 13);
        strokeWeight(0);
        textAlign(CENTER, CENTER)
        text('w', this.x1 * 1.55 + this.width / 24, this.y1 * 5 + this.width / 36)

    }
    A(pressed) {
        if (pressed) {
            fill('#5b6266');
        } else {
            fill('#1a1c1d');
        }
        stroke("#CCC");
        strokeWeight(this.width / 170);
        strokeJoin(ROUND);
        rect(this.x1 * 1.75, this.y1 * 5, this.width / 12, this.width / 12, this.width / 40);

        fill("#CCC");
        textFont(this.font_fredoka, this.width / 13);
        strokeWeight(0);
        textAlign(CENTER, CENTER)
        text('a', this.x1 * 1.75 + this.width / 24, this.y1 * 5 + this.width / 36)
    }
    S(pressed) {
        if (pressed) {
            fill('#5b6266');
        } else {
            fill('#1a1c1d');
        }
        stroke("#CCC");
        strokeWeight(this.width / 170);
        strokeJoin(ROUND);
        rect(this.x1 * 1.95, this.y1 * 5, this.width / 12, this.width / 12, this.width / 40);

        fill("#CCC");
        textFont(this.font_fredoka, this.width / 13);
        strokeWeight(0);
        textAlign(CENTER, CENTER)
        text('s', this.x1 * 1.95 + this.width / 24, this.y1 * 5 + this.width / 36)
    }
    D(pressed) {
        if (pressed) {
            fill('#5b6266');
        } else {
            fill('#1a1c1d');
        }
        stroke("#CCC");
        strokeWeight(this.width / 170);
        strokeJoin(ROUND);
        rect(this.x1 * 2.15, this.y1 * 5, this.width / 12, this.width / 12, this.width / 40);

        fill("#CCC");
        textFont(this.font_fredoka, this.width / 13);
        strokeWeight(0);
        textAlign(CENTER, CENTER)
        text('d', this.x1 * 2.15 + this.width / 24, this.y1 * 5 + this.width / 36)
    }

    Arrows(button) {
        this.Left(button.left);
        this.Up(button.up);
        this.Down(button.down);
        this.Right(button.right);

        fill("#CCC");
        textFont(this.font_fredoka, this.width / 13);
        strokeWeight(0);
        textAlign(CENTER, CENTER)
        text('shoot', this.x1 + (this.width / 2), this.y1 * 11.3);
    }
    Left(pressed) {
        if (pressed) {
            fill('#5b6266');
        } else {
            fill('#1a1c1d');
        }
        stroke("#CCC");
        strokeWeight(this.width / 170);
        strokeJoin(ROUND);
        rect(this.x1 * 1.55, this.y1 * 9, this.width / 12, this.width / 12, this.width / 40);

        fill("#CCC");
        textFont(this.font_noto, this.width / 12);
        strokeWeight(this.width / 150);
        textAlign(CENTER, CENTER)
        text('←', this.x1 * 1.55 + this.width / 24, this.y1 * 9 + this.width / 80)
    }
    Up(pressed) {
        if (pressed) {
            fill('#5b6266');
        } else {
            fill('#1a1c1d');
        }
        stroke("#CCC");
        strokeWeight(this.width / 170);
        strokeJoin(ROUND);
        rect(this.x1 * 1.75, this.y1 * 9, this.width / 12, this.width / 12, this.width / 40);

        fill("#CCC");
        textFont(this.font_noto, this.width / 12);
        strokeWeight(this.width / 150);
        textAlign(CENTER, CENTER)
        text('↑', this.x1 * 1.75 + this.width / 24, this.y1 * 9 + this.width / 50)

    }
    Down(pressed) {
        if (pressed) {
            fill('#5b6266');
        } else {
            fill('#1a1c1d');
        }
        stroke("#CCC");
        strokeWeight(this.width / 170);
        strokeJoin(ROUND);
        rect(this.x1 * 1.95, this.y1 * 9, this.width / 12, this.width / 12, this.width / 40);

        fill("#CCC");
        textFont(this.font_noto, this.width / 12);
        strokeWeight(this.width / 150);
        textAlign(CENTER, CENTER)
        text('↓', this.x1 * 1.95 + this.width / 24, this.y1 * 9 + this.width / 50)
    }
    Right(pressed) {
        if (pressed) {
            fill('#5b6266');
        } else {
            fill('#1a1c1d');
        }
        stroke("#CCC");
        strokeWeight(this.width / 170);
        strokeJoin(ROUND);
        rect(this.x1 * 2.15, this.y1 * 9, this.width / 12, this.width / 12, this.width / 40);

        fill("#CCC");
        textFont(this.font_noto, this.width / 12);
        strokeWeight(this.width / 150);
        textAlign(CENTER, CENTER)
        text('→', this.x1 * 2.15 + this.width / 24, this.y1 * 9 + this.width / 80)
    }
    Map(button) {
        fill("#CCC");
        textFont(this.font_fredoka, this.width / 13);
        strokeWeight(0);
        textAlign(CENTER, CENTER)
        text('map', this.x1 + (this.width / 3), this.y1 * 15.2);

        this.M(button.m);
    }

    M(pressed) {
        if (pressed) {
            fill('#5b6266');
        } else {
            fill('#1a1c1d');
        }
        stroke("#CCC");
        strokeWeight(this.width / 170);
        strokeJoin(ROUND);
        rect(this.x1 * 1.55, this.y1 * 13, this.width / 12, this.width / 12, this.width / 40)

        fill("#CCC");
        textFont(this.font_fredoka, this.width / 13);
        strokeWeight(0);
        textAlign(CENTER, CENTER)
        text('m', this.x1 * 1.55 + this.width / 24, this.y1 * 13 + this.width / 40)
    }

    Return(button) {
        fill("#CCC");
        textFont(this.font_fredoka, this.width / 13);
        strokeWeight(0);
        textAlign(CENTER, CENTER)
        text('return', this.x1 + (this.width / 1.5), this.y1 * 15.2);

        this.Enter(button.enter)
    }

    Enter(pressed) {
        if (pressed) {
            fill('#5b6266');
        } else {
            fill('#1a1c1d');
        }
        stroke("#CCC");
        strokeWeight(this.width / 170);
        strokeJoin(ROUND);
        rect(this.x1 * 2, this.y1 * 13, this.width / 4.2, this.width / 12, this.width / 40)

        fill("#CCC");
        textFont(this.font_fredoka, this.width / 13);
        strokeWeight(0);
        textAlign(CENTER, CENTER)
        text('Enter', this.x1 * 2.15 + this.width / 24, this.y1 * 13 + this.width / 36)
    }
}
