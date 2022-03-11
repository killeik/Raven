class Menu {
    constructor(canvas) {
        this.x1 = canvas.width / 40;
        this.y1 = canvas.height / 18;
        this.x2 = canvas.width / 4;
        this.y2 = canvas.height / 18 * 17;

        this.width = this.x2 - this.x1;
        this.height = this.y2 - this.y1;
    }
    buttons(gameCondition) {
        this.buttonsBorder();
        this.buttonStart(gameCondition);
        this.buttonOption();
        this.buttonCredits();
    }
    buttonsBorder() {
        fill('#1a1c1d');
        stroke("#CCC");
        strokeWeight(this.width / 50);
        strokeJoin(ROUND);
        rect(this.x1, this.y1, this.width, this.height, this.width / 4);
    }
    buttonStart() {
        if (mouseX > this.x1 &&
            mouseX < this.x2 &&
            mouseY > this.y1 &&
            mouseY < this.y1 + this.height / 3
        ) {
            noFill();
            stroke("#CCC");
            strokeWeight(this.width / 50);
            strokeJoin(ROUND);
            rect(this.x1, this.y1, this.width, this.height / 3, this.width / 4);
            if (mouseIsPressed === true) {
                gameCondition = "prepare";
            }
        }

        fill("#CCC");
        textSize(this.width / 5);
        strokeWeight(0);
        textAlign(CENTER, CENTER)
        text('Start', this.x1 + (this.width / 2), this.y1 + (this.height / 6));

    }
    buttonOption() {
        if (mouseX > this.x1 &&
            mouseX < this.x2 &&
            mouseY > this.y1 + this.height / 3 &&
            mouseY < this.y1 + this.height / 1.5
        ) {
            noFill();
            stroke("#CCC");
            strokeWeight(this.width / 50);
            strokeJoin(ROUND);
            rect(this.x1, this.y1 + this.height / 3, this.width, this.height / 3, this.width / 4);
        }
        fill("#CCC");
        textSize(this.width / 5);
        strokeWeight(0);
        textAlign(CENTER, CENTER)
        text('Options', this.x1 + (this.width / 2), this.y1 + (this.height / 2));
    }

    buttonCredits() {
        if (mouseX > this.x1 &&
            mouseX < this.x2 &&
            mouseY > this.y1 + this.height / 1.5 &&
            mouseY < this.y1 + this.height
        ) {
            noFill();
            stroke("#CCC");
            strokeWeight(this.width / 50);
            strokeJoin(ROUND);
            rect(this.x1, this.y1 + this.height / 1.5, this.width, this.height / 3, this.width / 4);
        }
        fill("#CCC");
        textSize(this.width / 5);
        strokeWeight(0);
        textAlign(CENTER, CENTER)
        text('Credits', this.x1 + (this.width / 2), this.y1 + (this.height / 6 * 5));
    }

}