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

var timer;
var bullet;
var enemy;
var crow;

var canvas;
var scaleSize;
var walls;
var enemiesAlreadySpawned;

var gameCondition;

var tutorial;
var menu_btns;
var win;
var loose;

var fredoka_medium;
var noto_sans_bold;

var config_current;

function setup() {
  fredoka_medium = loadFont("fonts/Fredoka/Fredoka-Medium.ttf")
  noto_sans_bold = loadFont("fonts/Noto_Sans/NotoSans-Bold.ttf")

  canvas = Window.SetCanvas();
  var cnv = createCanvas(canvas.width, canvas.height);
  cnv.style('display', 'block');
  cnv.style('margin', 'auto');
  scaleSize = Window.SetScale(canvas);

  win = new WinScreen(canvas);
  lose = new LoseScreen(canvas);
  tutorial = new Tutorial(canvas);
  menu_btns = new MenuButtons(canvas);
}

function windowResized() {
  canvas = Window.SetCanvas();
  scaleSize = Window.SetScale(canvas);
  resizeCanvas(canvas.width, canvas.height);

  win = new WinScreen(canvas);
  lose = new LoseScreen(canvas);
  tutorial = new Tutorial(canvas);
  menu_btns = new MenuButtons(canvas);
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

function prepareGameLoop() {
  crow = new Crow((canvas.width / 2 / scaleSize), (canvas.height / 2 / scaleSize), 3, 5);
  walls = new Walls(canvas, scaleSize);
  timer = {
    bullet: Date.now(),
    lastHit: Date.now()
  }
  enemiesAlreadySpawned = 0;
  bullet = [];
  enemy = [];

  config_current = {
    enemiesAtOnce: Math.round(random(config.l1.enemiesAtOnceMin, config.l1.enemiesAtOnceMax)),
    enemiesAtAll: Math.round(random(config.l1.enemiesAtAllMin, config.l1.enemiesAtAllMax))
  }
  console.log(config_current)

  gameCondition = "game";
}


function gameLoop() {
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

  if (enemy.length < config_current.enemiesAtOnce & enemiesAlreadySpawned < config_current.enemiesAtAll) {
    enemiesAlreadySpawned += 1;
    let enemyHealth = random(config.l1.enemyHealthMin, config.l1.enemyHealthMax);
    let enemySpeed = random(config.l1.enemySpeedMin, config.l1.enemySpeedMax);

    let cords = Enemy.randomInWalls(walls);
    enemy.push(new Enemy(cords.x, cords.y, enemyHealth, enemySpeed));
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

    if (Date.now() - timer.lastHit > config.damageCooldown) {
      if (enemy[i].crowCollision(crow)) {
        crow.health -= 1;
        timer.lastHit = Date.now();
      }
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

  Interface.leftBlock(walls);
  Interface.rightBlock(walls);
  Interface.crowHealth(walls, crow.healthMax, crow.health);
  walls.Draw();

  if (crow.health <= 0) {
    gameCondition = "lose";
  }
  if (enemy.length === 0) {
    gameCondition = "win";
  }
}


function mainMenu() {
  background('#1a1c1d');
  menu_btns.draw();
  tutorial.draw(button);
  // gameCondition = "prepare";
}

function loseScreen() {
  background('#1a1c1d');
  let killed_enemies = enemiesAlreadySpawned - enemy.length;
  lose.draw(button, killed_enemies, config.enemiesAtAllMax);
}

function winScreen() {
  background('#1a1c1d');
  win.draw(button, config_current.enemiesAtAll, crow);
}

function draw() {
  switch (gameCondition) {
    case "prepare": prepareGameLoop(); break;
    case "game": gameLoop(); break;
    case "menu": mainMenu(); break;
    case "lose": loseScreen(); break;
    case "win": winScreen(); break;
    default: mainMenu(); break;
  }

}
``