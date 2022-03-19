class Map {
    constructor(raws, columns) {
        this.raws = raws;
        this.columns = columns;

        this.crow_raw = Math.round(raws / 2);
        this.crow_column = Math.round(raws / 2);
        this.table = [];
    }

    generate() {
        for (let i = 0; i < this.raws; i++) {
            this.table.push([]);
            for (let j = 0; j < this.columns; j++) {
                this.table[i].push();
                this.table[i][j] = new Room;
            }
        }
    }
    left_room_exists() {
        if (!this.table[this.crow_raw][this.crow_column - 1]) {
            return false;
        }
        if (!this.table[this.crow_raw][this.crow_column - 1].exists) {
            return false;
        };
        return true;
    }
    up_room_exists() {
        if (!this.table[this.crow_raw - 1]) {
            return false;
        }
        if (!this.table[this.crow_raw - 1][this.crow_column].exists) {
            return false;
        };
        return true;
    }
    down_room_exists() {
        if (!this.table[this.crow_raw + 1]) {
            return false;
        }
        if (!this.table[this.crow_raw + 1][this.crow_column].exists) {
            return false;
        };
        return true;
    }
    right_room_exists() {
        if (!this.table[this.crow_raw][this.crow_column + 1]) {
            return false;
        }
        if (!this.table[this.crow_raw][this.crow_column + 1].exists) {
            return false;
        };
        return true;
    }

    crow_moved_left() {
        this.crow_column -= 1;
    }
    crow_moved_up() {
        this.crow_raw -= 1;
    }
    crow_moved_down() {
        this.crow_raw += 1;

    }
    crow_moved_right() {
        this.crow_column += 1;
    }
}