class LoseScreen {
    constructor(canvas) {
        this.x1 = canvas.width / 10;
        this.y1 = canvas.height / 18;
        this.x2 = canvas.width * 0.9;
        this.y2 = canvas.height / 18 * 17;

        this.width = this.x2 - this.x1;
        this.height = this.y2 - this.y1;
    }

    draw(button, killed, enemiesAtAllMax) {
        this.border();
        this.you_lose();
        this.enemies_killed(killed, enemiesAtAllMax);
        this.press_enter(button);

    }

    border() {
        fill('#1a1c1d');
        stroke("#CCC");
        strokeWeight(this.width / 130);
        strokeJoin(ROUND);
        rect(this.x1, this.y1, this.width, this.height, this.width / 5);
    }

    you_lose() {
        fill("#CCC");
        textFont(fredoka_medium, this.width / 10);
        strokeWeight(0);
        textAlign(CENTER, CENTER)
        text('You Lose', this.x1 + (this.width / 2), this.y1 + (this.height / 10));
    }

    enemies_killed(killed, enemiesAtAll) {
        fill("#CCC");
        textFont(fredoka_medium, this.width / 20);
        strokeWeight(0);
        textAlign(CENTER, CENTER)
        text('Enemies killed:', this.x1 + (this.width / 2), this.y1 * 6);
        text(killed.toString() + "/" + enemiesAtAll.toString(), this.x1 + (this.width / 2), this.y1 * 7.5);
    }

    press_enter(button) {
        fill("#CCC");
        textFont(fredoka_medium, this.width / 20);
        strokeWeight(0);
        textAlign(CENTER, CENTER)
        text('Press Enter to return', this.x1 + (this.width / 2), this.height * 0.95);
        if (button.enter) {
            gameCondition = "menu";
        }
    }
}