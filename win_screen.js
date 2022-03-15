class WinScreen {
    constructor(canvas) {
        this.x1 = canvas.width / 10;
        this.y1 = canvas.height / 18;
        this.x2 = canvas.width * 0.9;
        this.y2 = canvas.height / 18 * 17;

        this.width = this.x2 - this.x1;
        this.height = this.y2 - this.y1;
    }

    draw(button, killed, crow) {
        this.border();
        this.you_win();
        this.enemies_killed(killed);
        this.your_health(crow);
        this.buttonPressed(button);

    }

    border() {
        fill('#1a1c1d');
        stroke("#CCC");
        strokeWeight(this.width / 130);
        strokeJoin(ROUND);
        rect(this.x1, this.y1, this.width, this.height, this.width / 5);
    }

    you_win() {
        fill("#CCC");
        textFont(fredoka_medium, this.width / 10);
        strokeWeight(0);
        textAlign(CENTER, CENTER)
        text('You Win!', this.x1 + (this.width / 2), this.y1 + (this.height / 10));
    }

    enemies_killed(killed) {
        fill("#CCC");
        textFont(fredoka_medium, this.width / 20);
        strokeWeight(0);
        textAlign(CENTER, CENTER)
        text('Enemies killed:', this.x1 + (this.width / 4), this.y1 * 5);
        text(killed.toString() + "/" + killed.toString(), this.x1 + (this.width / 4), this.y1 * 6.3);
    }

    your_health() {
        fill("#CCC");
        textFont(fredoka_medium, this.width / 20);
        strokeWeight(0);
        textAlign(CENTER, CENTER)
        text('Your health:', this.x1 + (this.width / 4), this.y1 * 8);
        text(crow.health.toString() + "/" + crow.healthMax.toString(), this.x1 + (this.width / 4), this.y1 * 9);
    }

    buttonPressed(button) {
        if (button.enter) {
            gameCondition = "menu";
        }
    }
}