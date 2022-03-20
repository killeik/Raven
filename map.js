class Map {
    constructor(raws, columns) {
        this.raws = raws;
        this.columns = columns;

        this.crow_raw = Math.round((this.raws - 1) / 2);
        this.crow_column = Math.round((this.columns - 1) / 2);
        this.table = [];
    }


    generate() {
        for (let i = 0; i < this.columns; i++) {
            this.table.push([]);
            for (let j = 0; j < this.raws; j++) {
                this.table[i].push();
                this.table[i][j] = new Room;
            }
        }
        this.table[Math.round((this.columns - 1) / 2)][Math.round((this.raws - 1) / 2)].exists = true;

        this.left_branch();
        this.right_branch();
        let room_exists = this.count_rooms_exists();
        if (room_exists < 7) {
            this.up_branch();
        }
    }

    left_branch() {
        let current_room = {
            raw: (Math.round((this.raws - 1) / 2)),
            column: Math.round((this.columns - 1) / 2) - 1
        }
        let dir;
        this.table[current_room.column][current_room.raw].exists = true;

        for (; ;) {

            dir = random(["left", "up", "down"]);
            switch (dir) {
                case "left": current_room.column -= 1; break;
                case "up": current_room.raw -= 1; break;
                case "down": current_room.raw += 1; break;
            }
            if (!this.table[current_room.column]) break;
            if (!this.table[current_room.column][current_room.raw]) break;

            this.table[current_room.column][current_room.raw].exists = true;
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

        for (; ;) {

            dir = random(["right", "up", "down"]);
            switch (dir) {
                case "right": current_room.column += 1; break;
                case "up": current_room.raw -= 1; break;
                case "down": current_room.raw += 1; break;
            }
            if (!this.table[current_room.column]) break;
            if (!this.table[current_room.column][current_room.raw]) break; 7

            this.table[current_room.column][current_room.raw].exists = true;
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

        for (; ;) {

            dir = random(["right", "up", "left"]);
            switch (dir) {
                case "right": current_room.column += 1; break;
                case "up": current_room.raw -= 1; break;
                case "left": current_room.column -= 1; break;
            }
            if (!this.table[current_room.column]) break;
            if (!this.table[current_room.column][current_room.raw]) break;

            this.table[current_room.column][current_room.raw].exists = true;
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

    draw() {
        let column_width = width / this.columns;
        let raw_height = height / this.raws;
        for (let i = 0; i < this.columns; i++) {
            for (let j = 0; j < this.raws; j++) {
                if (this.table[i][j].exists) {
                    fill('white');
                    stroke("black");
                    strokeWeight(3);
                    strokeJoin(ROUND);
                    rect(column_width * i, raw_height * j, column_width, raw_height)
                }
                if (this.table[i][j].boss_room) {
                    fill('red');
                    stroke("black");
                    strokeWeight(3);
                    strokeJoin(ROUND);
                    rect(column_width * i, raw_height * j, column_width, raw_height)
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