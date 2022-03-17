class Gates {
    constructor(walls) {
        this.l_x1 = walls.x1;
        this.l_y1 = walls.y1 + (0.5 * walls.height) - (0.5 * walls.y1);
        this.l_x2 = walls.x1 + walls.y1;
        this.l_y2 = walls.y1 + (0.5 * walls.height) + (0.5 * walls.y1);

        this.l_width = this.l_x2 - this.l_x1;
        this.l_height = this.l_y2 - this.l_y1;

        this.u_x1 = walls.x1 + (0.5 * walls.width) - (0.5 * walls.y1);
        this.u_y1 = walls.y1;
        this.u_x2 = walls.x1 + (0.5 * walls.width) + (0.5 * walls.y1);
        this.u_y2 = walls.y1 + walls.y1;

        this.u_width = this.u_x2 - this.u_x1;
        this.u_height = this.u_y2 - this.u_y1;


        this.r_x1 = walls.x2 - walls.y1;
        this.r_y1 = walls.y1 + (0.5 * walls.height) - (0.5 * walls.y1);
        this.r_x2 = walls.x2;
        this.r_y2 = walls.y1 + (0.5 * walls.height) + (0.5 * walls.y1);

        this.r_width = this.r_x2 - this.r_x1;
        this.r_height = this.r_y2 - this.r_y1;


        this.d_x1 = walls.x1 + (0.5 * walls.width) - (0.5 * walls.y1);
        this.d_y1 = walls.y2 - walls.y1;
        this.d_x2 = walls.x1 + (0.5 * walls.width) + (0.5 * walls.y1);
        this.d_y2 = walls.y2;

        this.d_width = this.d_x2 - this.d_x1;
        this.d_height = this.d_y2 - this.d_y1;
    }

    draw() {
        noFill();
        stroke("#CCC");
        strokeWeight(this.l_height / 10);
        strokeJoin(ROUND);
        rect(this.l_x1, this.l_y1, this.l_width, this.l_height, 0, this.l_height / 3, this.l_height / 3, 0);

        noFill();
        stroke("#CCC");
        strokeWeight(this.u_height / 10);
        strokeJoin(ROUND);
        rect(this.u_x1, this.u_y1, this.u_width, this.u_height, 0, 0, this.u_height / 3, this.u_height / 3);

        noFill();
        stroke("#CCC");
        strokeWeight(this.r_height / 10);
        strokeJoin(ROUND);
        rect(this.r_x1, this.r_y1, this.r_width, this.r_height, this.r_height / 3, 0, 0, this.r_height / 3);

        noFill();
        stroke("#CCC");
        strokeWeight(this.d_height / 10);
        strokeJoin(ROUND);
        rect(this.d_x1, this.d_y1, this.d_width, this.d_height, this.d_height / 3, this.d_height / 3, 0, 0);
    }

}