var button = {
  enter: false,

  d: false,
  a: false,
  s: false,
  w: false,

  right: false,
  left: false,
  down: false,
  up: false
}

var timer = {
  bullet: Date.now()
}

var bullet = [];
var enemy = [];

var crow;
var canvas;
var scaleSize;
var walls;
var enemiesAlreadySpawned = 0;

function setup() {
  canvas = Window.SetCanvas();
  var cnv = createCanvas(canvas.width, canvas.height);
  cnv.style('display', 'block');
  cnv.style('margin', 'auto');

  scaleSize = Window.SetScale(canvas);
  crow = new Crow((canvas.width / 2 / scaleSize), (canvas.height / 2 / scaleSize), 3, 5);

  walls = new Walls(canvas, scaleSize);
}

function windowResized() {
  canvas = Window.SetCanvas();
  scaleSize = Window.SetScale(canvas);
  resizeCanvas(canvas.width, canvas.height);
}
function keyPressed() {
  keyHandler(keyCode, true)
  return false; // prevent any default behaviour
}
function keyReleased() {
  keyHandler(keyCode, false)
  return false; // prevent any default behavior
}

function keyHandler(code, value) {
  switch (code) {
    case 13: button.enter = value; break;

    case 68: button.d = value; break;
    case 65: button.a = value; break;
    case 87: button.w = value; break;
    case 83: button.s = value; break;

    case 39: button.right = value; break;
    case 37: button.left = value; break;
    case 38: button.up = value; break;
    case 40: button.down = value; break;
  }
}

function draw() {
  background('#1a1c1d');
  scale(scaleSize);

  crow.Move(button);
  crow.WallCollision(walls);
  crow.Draw();

  if (Date.now() - timer.bullet > config.bulletCooldown) {
    timer.bullet = Date.now();
    let bulletspeed = Bullet.SetSpeed(button, config.bulletSpeed);
    if (bulletspeed) {
      bullet.push(new Bullet(crow.mid_x, crow.mid_y, bulletspeed));
    }
  }

  if (enemy.length < config.enemiesAtOnceMax & enemiesAlreadySpawned < config.enemiesAtAllMax) {
    enemiesAlreadySpawned += 1;

    let cords = Enemy.randomInWalls(walls);
    enemy.push(new Enemy(cords.x, cords.y));
  }

  for (let i = 0; i < enemy.length; i++) {
    enemy[i].moveToCrow(crow);

    if (enemy[i].health <= 0) {
      enemy.splice(i, 1);
      break;
    }

    for (let j = 0; j < bullet.length; j++) {
      bullet[j].enemyCollision(enemy[i]);
    }

    enemy[i].Draw();
  }

  for (let i = 0; i < bullet.length; i++) {
    bullet[i].Move();

    bullet[i].WallCollision(walls);

    if (!bullet[i].exists) {
      bullet.splice(i, 1);
      break;
    }

    bullet[i].Draw();
  }
  Interface.mainBlock(walls);
  Interface.crowHealthBlock(walls,crow.healthMax, crow.health);
  walls.Draw();
}
