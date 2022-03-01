export default class Collision{
  static walls(ctx, left, up, right, down) {
    ctx.beginPath();
    ctx.lineCap = "round";
    ctx.strokeStyle = "#AAA";
    ctx.lineWidth = 3;
    ctx.lineJoin = "round";
    ctx.strokeRect(left, up, right, down);
    ctx.closePath();
  }
  static tutorial(ctx){
    ctx.fillStyle = "#BBB";
    ctx.font = '40px sans-serif';
    ctx.fillText('WASD - control', 450, 350);
    ctx.fillText('Arrows - shoot', 450, 400);
    ctx.fillText('Enter - start', 450, 450);
  }
  static crow(ctx, crow) {
    ctx.beginPath();
    ctx.lineTo(crow.x, crow.y+crow.height)
    ctx.lineTo(crow.x + crow.width, crow.y+crow.height)
    ctx.lineTo(crow.x + 0.5*crow.width, crow.y)
    ctx.fillStyle = "#CCC";
    ctx.fill();
  }
  static bullet(ctx, bullet){
    ctx.beginPath();
    ctx.arc(bullet.x, bullet.y, bullet.radius, 0, 2 * Math.PI);
    ctx.fillStyle = "#CCC";
    ctx.fill();
  }
  static welcomeScreen(ctx){
    ctx.fillStyle = "#BBB";
    ctx.font = '60px sans-serif';
    ctx.fillText('Welcome, Friend!', 350, 200);
  }
  static looseScreen(ctx){
    ctx.fillStyle = "#BBB";
    ctx.font = '60px sans-serif';
    ctx.fillText('Looser!', 450, 200);
  }
  static mainInterfaceBlock(ctx){
    ctx.beginPath();
    ctx.lineWidth = 5;
    ctx.strokeRect(5, 40, 135, canvas.height - 80);
    ctx.closePath();
  }
  static crowHealthBlock(ctx, healthMax, health){ //health block separation
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
    if(health > 0){
    ctx.beginPath();
    ctx.fillRect(20, 82, 104/healthMax * health, 26);
    ctx.closePath();
    }
  }

  static enemy(ctx, enemy){
    ctx.beginPath();
    ctx.moveTo(enemy.x, enemy.y + (enemy.height/2));
    ctx.lineTo(enemy.x + (enemy.width/2), enemy.y);
    ctx.lineTo(enemy.x + enemy.width, enemy.y + (enemy.height/2));
    ctx.lineTo(enemy.x +(enemy.width/2), enemy.y + enemy.height);
    ctx.closePath();
    ctx.fillStyle = "#CCC";
    ctx.fill();
  }
}
