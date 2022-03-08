class Screens {
    static tutorial(ctx) {
        ctx.fillStyle = "#BBB";
        ctx.font = '40px sans-serif';
        ctx.fillText('WASD - control', 450, 350);
        ctx.fillText('Arrows - shoot', 450, 400);
        ctx.fillText('Enter - start', 450, 450);
    }
    static welcomeScreen(ctx) {
        ctx.fillStyle = "#BBB";
        ctx.font = '60px sans-serif';
        ctx.fillText('Welcome, Friend!', 350, 200);
    }
    static looseScreen(ctx) {
        ctx.fillStyle = "#BBB";
        ctx.font = '60px sans-serif';
        ctx.fillText('Looser!', 450, 200);
    }
}