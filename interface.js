class Interface {
    static mainInterfaceBlock(ctx) {
        ctx.beginPath();
        ctx.lineWidth = 5;
        ctx.strokeRect(5, 40, 135, canvas.height - 80);
        ctx.closePath();
    }
    static crowHealthBlock(ctx, healthMax, health) { //health block separation
        ctx.beginPath();
        ctx.lineWidth = 3;
        ctx.strokeRect(5, 40, 135, 80);
        ctx.closePath();

        ctx.font = '24px sans-serif';
        ctx.fillText('HEALTH', 25, 70);

        //health bar outter
        ctx.beginPath();
        ctx.lineWidth = 2;
        ctx.strokeRect(17, 80, 110, 30);
        ctx.closePath();

        //health bar inner
        if (health > 0) {
            ctx.beginPath();
            ctx.fillRect(20, 82, 104 / healthMax * health, 26);
            ctx.closePath();
        }
    }
}
