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
        this.draw_left();
        this.draw_up();
        this.draw_right();
        this.draw_down();
    }

    draw_left() {
        noFill();
        stroke("#CCC");
        strokeWeight(this.l_height / 10);
        strokeJoin(ROUND);
        rect(this.l_x1, this.l_y1, this.l_width, this.l_height, 0, this.l_height / 3, this.l_height / 3, 0);
    }
    draw_up() {
        noFill();
        stroke("#CCC");
        strokeWeight(this.u_height / 10);
        strokeJoin(ROUND);
        rect(this.u_x1, this.u_y1, this.u_width, this.u_height, 0, 0, this.u_height / 3, this.u_height / 3);
    }
    draw_right() {
        noFill();
        stroke("#CCC");
        strokeWeight(this.r_height / 10);
        strokeJoin(ROUND);
        rect(this.r_x1, this.r_y1, this.r_width, this.r_height, this.r_height / 3, 0, 0, this.r_height / 3);

    }
    draw_down() {
        noFill();
        stroke("#CCC");
        strokeWeight(this.d_height / 10);
        strokeJoin(ROUND);
        rect(this.d_x1, this.d_y1, this.d_width, this.d_height, this.d_height / 3, this.d_height / 3, 0, 0);

    }

    move(crow) {
        this.collision_left(crow);
        this.collision_up(crow);
        this.collision_down(crow);
        this.collision_right(crow);
    }
    collision_left(crow) {
        if (this.l_x2 >= crow.x &
            this.l_x1 <= crow.x + crow.width &
            this.l_y2 >= crow.y &
            this.l_y1 <= crow.y + crow.height) {
            this.move_left(crow);
        }
    }
    collision_up(crow) {
        if (this.u_x2 >= crow.x &
            this.u_x1 <= crow.x + crow.width &
            this.u_y2 >= crow.y &
            this.u_y1 <= crow.y + crow.height) {
            this.move_up(crow);
        }
    }
    collision_down(crow) {
        if (this.d_x2 >= crow.x &
            this.d_x1 <= crow.x + crow.width &
            this.d_y2 >= crow.y &
            this.d_y1 <= crow.y + crow.height) {
            this.move_down(crow);
        }
    }
    collision_right(crow) {
        if (this.r_x2 >= crow.x &
            this.r_x1 <= crow.x + crow.width &
            this.r_y2 >= crow.y &
            this.r_y1 <= crow.y + crow.height) {
            this.move_right(crow);
        }
    }
    move_left() {
        crow.x = this.r_x1 + (this.r_width * 0.5) - (crow.width * 0.5);
        crow.y = this.r_y1 + (this.r_height * 0.5) - (crow.height * 0.5);
        gameCondition = "prepare_lvl";
    }
    move_up() {
        crow.x = this.d_x1 + (this.d_width * 0.5) - (crow.width * 0.5);
        crow.y = this.d_y1 + (this.d_height * 0.5) - (crow.height * 0.5);
        gameCondition = "prepare_lvl";
    }
    move_down() {
        crow.x = this.u_x1 + (this.u_width * 0.5) - (crow.width * 0.5);
        crow.y = this.u_y1 + (this.u_height * 0.5) - (crow.height * 0.5);
        gameCondition = "prepare_lvl";
    }
    move_right() {
        crow.x = this.l_x1 + (this.l_width * 0.5) - (crow.width * 0.5);
        crow.y = this.l_y1 + (this.l_height * 0.5) - (crow.height * 0.5);
        gameCondition = "prepare_lvl";
    }
}