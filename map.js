class Map {
    constructor(raws, columns) {
        this.raws = raws;
        this.columns = columns;

        this.crow_raw = Math.round((this.raws - 1) / 2);
        this.crow_column = Math.round((this.columns - 1) / 2);
        this.table = [];

        this.border_x1;
        this.border_x2;
        this.border_y1;
        this.border_y2;

        this.border_width;
        this.border_height;
    }


    generate() {
        // generate table of this.colunns and this.raws
        // every element in table = Room
        // then, by left/right/up branch functuons set the room as existing
        for (let i = 0; i < this.columns; i++) {
            this.table.push([]);
            for (let j = 0; j < this.raws; j++) {
                this.table[i].push();
                this.table[i][j] = new Room;
            }
        }
        // set center (spawn) room as existing
        this.table[Math.round((this.columns - 1) / 2)][Math.round((this.raws - 1) / 2)].exists = true;

        // go left and right to set existings room
        this.left_branch();
        this.right_branch();

        let room_exists = this.count_rooms_exists();
        if (room_exists < 7) {
            this.up_branch();
        }
    }

    left_branch() {
        //set left room from center as existing
        //from left room randomly select one of direction - "left", "up", "down"
        //if room in this direction created in this.table, then set it exists
        //if this room doesn't creaated, go to previosly activated room, and set it as boss_room
        let current_room = {
            raw: (Math.round((this.raws - 1) / 2)),
            column: Math.round((this.columns - 1) / 2) - 1
        }
        let dir;
        this.table[current_room.column][current_room.raw].exists = true;

        let difficulty_counter = 1;

        for (; ;) {

            difficulty_counter += 1;

            dir = random(["left", "up", "down"]);
            switch (dir) {
                case "left": current_room.column -= 1; break;
                case "up": current_room.raw -= 1; break;
                case "down": current_room.raw += 1; break;
            }
            if (!this.table[current_room.column]) break;
            if (!this.table[current_room.column][current_room.raw]) break;

            this.table[current_room.column][current_room.raw].exists = true;
            this.table[current_room.column][current_room.raw].difficulty = difficulty_counter;
        }
        switch (dir) {
            case "left": current_room.column += 1; break;
            case "up": current_room.raw += 1; break;
            case "down": current_room.raw -= 1; break;
        }
        this.table[current_room.column][current_room.raw].boss_room = true;
    }
    right_branch() {
        let current_room = {
            raw: (Math.round((this.raws - 1) / 2)),
            column: Math.round((this.columns - 1) / 2) + 1
        }
        let dir;
        this.table[current_room.column][current_room.raw].exists = true;

        let difficulty_counter = 1;

        for (; ;) {
            
            difficulty_counter += 1;
            dir = random(["right", "up", "down"]);
            switch (dir) {
                case "right": current_room.column += 1; break;
                case "up": current_room.raw -= 1; break;
                case "down": current_room.raw += 1; break;
            }
            if (!this.table[current_room.column]) break;
            if (!this.table[current_room.column][current_room.raw]) break; 7

            this.table[current_room.column][current_room.raw].exists = true;
            this.table[current_room.column][current_room.raw].difficulty = difficulty_counter;

        }
        switch (dir) {
            case "right": current_room.column -= 1; break;
            case "up": current_room.raw += 1; break;
            case "down": current_room.raw -= 1; break;
        }
        this.table[current_room.column][current_room.raw].boss_room = true;
    }
    up_branch() {
        let current_room = {
            raw: Math.round((this.raws - 1) / 2),
            column: (Math.round((this.columns - 1) / 2)) - 1
        }
        let dir;
        this.table[current_room.column][current_room.raw].exists = true;

       
        let difficulty_counter = 1;

        for (; ;) {

            difficulty_counter += 1;
            dir = random(["right", "up", "left"]);
            switch (dir) {
                case "right": current_room.column += 1; break;
                case "up": current_room.raw -= 1; break;
                case "left": current_room.column -= 1; break;
            }
            if (!this.table[current_room.column]) break;
            if (!this.table[current_room.column][current_room.raw]) break;

            this.table[current_room.column][current_room.raw].exists = true;
            this.table[current_room.column][current_room.raw].difficulty = difficulty_counter;

        }
        switch (dir) {
            case "right": current_room.column -= 1; break;
            case "up": current_room.raw += 1; break;
            case "left": current_room.column += 1; break;
        }
        this.table[current_room.column][current_room.raw].boss_room = true;
    }

    count_rooms_exists() {

        let counter = 0;
        for (let i = 0; i < this.columns; i++) {
            for (let j = 0; j < this.raws; j++) {
                if (this.table[i][j].exists) {
                    counter += 1;
                }
            }
        }
        return counter;
    }

    set_border(walls) {
        this.border_x1 = (walls.x1 + 0.5 * walls.width) - 0.5 * walls.height;
        this.border_x2 = (walls.x1 + 0.5 * walls.width) + 0.5 * walls.height;
        this.border_y1 = walls.y1;
        this.border_y2 = walls.y2;

        this.border_width = walls.height;
        this.border_height = walls.height;
    }

    draw() {
        this.draw_border();
        this.draw_rooms();
    }

    draw_border() {
        fill('#1a1c1d');
        stroke("#CCC");
        strokeWeight(this.border_height / 130);
        strokeJoin(ROUND);
        rect(this.border_x1, this.border_y1, this.border_width, this.border_height, this.border_height / 6);
    }

    draw_rooms() {
        let column_width = this.border_width / this.columns;
        let raw_height = this.border_height / this.raws;

        for (let i = 0; i < this.columns; i++) {
            for (let j = 0; j < this.raws; j++) {

                if (this.table[i][j].boss_room) {
                    fill('#63000b');
                    stroke("#CCC");
                    strokeWeight(this.border_height / 130);
                    strokeJoin(ROUND);
                    rect(this.border_x1 + column_width * i, this.border_y1 + raw_height * j, column_width, raw_height, column_width / 6);
                } else if (this.crow_column === i && this.crow_raw === j) {
                    fill('#7f7f7f');
                    stroke("#CCC");
                    strokeWeight(this.border_height / 130);
                    strokeJoin(ROUND);
                    rect(this.border_x1 + column_width * i, this.border_y1 + raw_height * j, column_width, raw_height, column_width / 6);


                } else if (this.table[i][j].exists) {
                    fill('#303233');
                    stroke("#CCC");
                    strokeWeight(this.border_height / 130);
                    strokeJoin(ROUND);
                    rect(this.border_x1 + column_width * i, this.border_y1 + raw_height * j, column_width, raw_height, column_width / 6);
                }

            }
        }
    }

    up_room_exists() {
        if (!this.table[this.crow_column][this.crow_raw - 1]) {
            return false;
        }
        if (!this.table[this.crow_column][this.crow_raw - 1].exists) {
            return false;
        };
        return true;
    }
    left_room_exists() {
        if (!this.table[this.crow_column - 1]) {
            return false;
        }
        if (!this.table[this.crow_column - 1][this.crow_raw].exists) {
            return false;
        };
        return true;
    }
    right_room_exists() {
        if (!this.table[this.crow_column + 1]) {
            return false;
        }
        if (!this.table[this.crow_column + 1][this.crow_raw].exists) {
            return false;
        };
        return true;
    }
    down_room_exists() {
        if (!this.table[this.crow_column][this.crow_raw + 1]) {
            return false;
        }
        if (!this.table[this.crow_column][this.crow_raw + 1].exists) {
            return false;
        };
        return true;
    }

    crow_moved_up() {
        this.crow_raw -= 1;
    }
    crow_moved_left() {
        this.crow_column -= 1;
    }
    crow_moved_right() {
        this.crow_column += 1;

    }
    crow_moved_down() {
        this.crow_raw += 1;
    }

    set_this_room_empty() {
        this.table[this.crow_column][this.crow_raw].empty = true;
    }

    this_room_empty() {
        if (this.table[this.crow_column][this.crow_raw].empty) {
            return true
        } else {
            return false
        }
    }
    this_room_boss(){
        if (this.table[this.crow_column][this.crow_raw].boss_room) {
            return true
        } else {
            return false
        }
    }

    up_room_empty() {
        return this.table[this.crow_column][this.crow_raw - 1].empty;
    }
    left_room_empty() {
        return this.table[this.crow_column - 1][this.crow_raw].empty
    }
    right_room_empty() {
        return this.table[this.crow_column + 1][this.crow_raw].empty
    }
    down_room_empty() {
        return this.table[this.crow_column][this.crow_raw + 1].empty
    }
}