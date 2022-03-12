class Interface {
    static leftBlock(walls) {
        noFill();
        stroke("#CCC");
        strokeWeight(5);
        strokeJoin(ROUND);
        rect(walls.x1 / 10, walls.y1, walls.x1 - (walls.x1 / 10), walls.y2 - walls.y1, walls.x1 / 5, 0, 0, walls.x1 / 5);
    }
    static crowHealth(walls, healthMax, health) {
        //health block separation
        stroke("#CCC");
        strokeWeight(3);
        line(walls.x1 / 10, walls.y1 * 3, walls.x1, walls.y1 * 3);

        fill("#CCC");
        textFont(fredoka_medium, 30)
        strokeWeight(0);
        textAlign(CENTER, CENTER)
        text('health:', walls.x1 / 1.8, walls.y1 * 1.5);

        //health bar outter
        noFill();
        stroke("#CCC");
        strokeWeight(3)
        strokeJoin(ROUND);
        rect(walls.x1 / 6, walls.y1 * 2, walls.x1 / 1.3, walls.y1 * 0.8, walls.x1 / 12);

        //health bar inner
        if (health > 0) {
            fill("#CCC")
            stroke("#CCC");
            strokeWeight(3);
            strokeJoin(ROUND);
            rect(walls.x1 / 5, walls.y1 * 2.1, walls.x1 / 1.42 / healthMax * health, walls.y1 * 0.6, walls.x1 / 18)
        }
    }

    static rightBlock(walls) {
        noFill();
        stroke("#CCC");
        strokeWeight(5);
        strokeJoin(ROUND);
        rect(walls.x2, walls.y1, walls.x1 - (walls.x1 / 10), walls.y2 - walls.y1, 0, walls.x1 / 5, walls.x1 / 5, 0);
    }
}
