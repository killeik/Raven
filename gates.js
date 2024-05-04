export default class Gates {
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

    draw(map_l1) {
        if (map_l1.left_room_exists()) {
            this.draw_left(map_l1);
        }

        if (map_l1.up_room_exists()) {
            this.draw_up(map_l1);
        }

        if (map_l1.down_room_exists()) {
            this.draw_down(map_l1);
        }

        if (map_l1.right_room_exists()) {
            this.draw_right(map_l1);
        }
    }

    draw_left(map_l1) {
        noFill();
        stroke("#CCC");
        strokeWeight(this.l_height / 10);
        strokeJoin(ROUND);
        rect(this.l_x1, this.l_y1, this.l_width, this.l_height, 0, this.l_height / 3, this.l_height / 3, 0);

        if (!map_l1.left_room_empty()) {
            quad(this.l_x1, this.l_y1 + (this.l_height / 2),
                this.l_x1 + (this.l_width / 2), this.l_y1,
                this.l_x1 + this.l_width, this.l_y1 + (this.l_height / 2),
                this.l_x1 + (this.l_width / 2), this.l_y1 + this.l_height);
        }
    }

    draw_up(map_l1) {
        noFill();
        stroke("#CCC");
        strokeWeight(this.u_height / 10);
        strokeJoin(ROUND);
        rect(this.u_x1, this.u_y1, this.u_width, this.u_height, 0, 0, this.u_height / 3, this.u_height / 3);

        if (!map_l1.up_room_empty()) {
            quad(this.u_x1, this.u_y1 + (this.u_height / 2),
                this.u_x1 + (this.u_width / 2), this.u_y1,
                this.u_x1 + this.u_width, this.u_y1 + (this.u_height / 2),
                this.u_x1 + (this.u_width / 2), this.u_y1 + this.u_height);
        }
    }
    draw_right(map_l1) {
        noFill();
        stroke("#CCC");
        strokeWeight(this.r_height / 10);
        strokeJoin(ROUND);
        rect(this.r_x1, this.r_y1, this.r_width, this.r_height, this.r_height / 3, 0, 0, this.r_height / 3);

        if (!map_l1.right_room_empty()) {
            quad(this.r_x1, this.r_y1 + (this.r_height / 2),
                this.r_x1 + (this.r_width / 2), this.r_y1,
                this.r_x1 + this.r_width, this.r_y1 + (this.r_height / 2),
                this.r_x1 + (this.r_width / 2), this.r_y1 + this.r_height);
        }

    }
    draw_down(map_l1) {
        noFill();
        stroke("#CCC");
        strokeWeight(this.d_height / 10);
        strokeJoin(ROUND);
        rect(this.d_x1, this.d_y1, this.d_width, this.d_height, this.d_height / 3, this.d_height / 3, 0, 0);

        if (!map_l1.down_room_empty()) {
            quad(this.d_x1, this.d_y1 + (this.d_height / 2),
                this.d_x1 + (this.d_width / 2), this.d_y1,
                this.d_x1 + this.d_width, this.d_y1 + (this.d_height / 2),
                this.d_x1 + (this.d_width / 2), this.d_y1 + this.d_height);
        }

    }

    move(map_l1, crow, gameCondition) {
        if (map_l1.left_room_exists()) {
            if (this.l_x2 >= crow.x &
                this.l_x1 <= crow.x + crow.width &
                this.l_y2 >= crow.y &
                this.l_y1 <= crow.y + crow.height) {
                crow = this.move_left(crow, map_l1);
                gameCondition = "prepare_lvl";
                return crow, gameCondition;
            }
        }

        if (map_l1.up_room_exists()) {
            if (this.u_x2 >= crow.x &
                this.u_x1 <= crow.x + crow.width &
                this.u_y2 >= crow.y &
                this.u_y1 <= crow.y + crow.height) {
                crow = this.move_up(crow, map_l1);
                gameCondition = "prepare_lvl";
                return crow, gameCondition;
            }
        }

        if (map_l1.down_room_exists()) {
            if (this.d_x2 >= crow.x &
                this.d_x1 <= crow.x + crow.width &
                this.d_y2 >= crow.y &
                this.d_y1 <= crow.y + crow.height) {
                crow = this.move_down(crow, map_l1);
                gameCondition = "prepare_lvl";                
                return crow, gameCondition;
            }
        }

        if (map_l1.right_room_exists()) {
            if (this.r_x2 >= crow.x &
                this.r_x1 <= crow.x + crow.width &
                this.r_y2 >= crow.y &
                this.r_y1 <= crow.y + crow.height) {
                crow = this.move_right(crow, map_l1);
                gameCondition = "prepare_lvl";                
                return crow, gameCondition;
            }

        }
        return crow, gameCondition
    }

    move_left(crow, map_l1) {
        crow.x = this.r_x1 - (this.r_width * 0.5) - (crow.width * 0.5);
        crow.y = this.r_y1 + (this.r_height * 0.5) - (crow.height * 0.5);
        map_l1.crow_moved_left()
        return crow
    }
    move_up(crow, map_l1) {
        crow.x = this.d_x1 + (this.d_width * 0.5) - (crow.width * 0.5);
        crow.y = this.d_y1 - (this.d_height * 0.5) - (crow.height * 0.5);
        map_l1.crow_moved_up();
        return crow

    }
    move_down(crow, map_l1) {
        crow.x = this.u_x1 + (this.u_width * 0.5) - (crow.width * 0.5);
        crow.y = this.u_y2 + (this.u_height * 0.5) - (crow.height * 0.5);
        map_l1.crow_moved_down();
        return crow
    }
    move_right(crow, map_l1) {
        crow.x = this.l_x2 + (this.l_width * 0.5) - (crow.width * 0.5);
        crow.y = this.l_y1 + (this.l_height * 0.5) - (crow.height * 0.5);
        map_l1.crow_moved_right();
        return crow

    }
}
