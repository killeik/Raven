var button = new Button; 
var timer;
var bullet;
var enemy;
var crow;
var boss;

var canvas;
var scaleSize;
var walls;

var gates;
var map_l1;
var enemiesAlreadySpawned;

var gameCondition;

var tutorial;
var menu_btns;
var win;
var lose;

var fredoka_medium;
var noto_sans_bold;

var config_room;

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
  if (map_l1) { map_l1.set_border(walls) };
}

function keyPressed() {
  button.handler(keyCode, true)
  return false; // prevent any default behaviour
}

function keyReleased() {
  button.handler(keyCode, false)
  return false; // prevent any default behavior
}



function prepareGameLoop() {
  crow = new Crow((canvas.width / 2 / scaleSize), (canvas.height / 2 / scaleSize), config.crowSpeed, config.crowHealth);
  walls = new Walls(canvas, scaleSize);
  gates = new Gates(walls);
  timer = {
    bullet: 0,
    lastHit: 0
  }
  enemiesAlreadySpawned = 0;
  bullet = [];
  enemy = [];

  config_room = {
    enemiesAtOnce: Math.round(random(config.l1.enemiesAtOnceMin, config.l1.enemiesAtOnceMax)),
    enemiesAtAll: Math.round(random(config.l1.enemiesAtAllMin, config.l1.enemiesAtAllMax))
  }
  boss = undefined;
  map_l1 = new Map(5, 5);
  map_l1.generate();
  map_l1.set_border(walls);
  gameCondition = "game";
}

function prepareLevel() {
  enemiesAlreadySpawned = 0;
  bullet = [];
  enemy = [];
  config_room = {
    enemiesAtOnce: Math.round(random(config.l1.enemiesAtOnceMin, config.l1.enemiesAtOnceMax)),
    enemiesAtAll: Math.round(random(config.l1.enemiesAtAllMin, config.l1.enemiesAtAllMax))
  }

  if (map_l1.this_room_boss()) {
    boss = new Boss(walls, 20, 4);
  }

  gameCondition = "game";
}

function gameLoop() {
  background('#1a1c1d');
  scale(scaleSize);

  crow.Move(button);
  crow.WallCollision(walls);
  crow.Draw();
  timer.bullet += 1;
  timer.lastHit += 1;



  if (timer.bullet > config.bulletCooldown) {
    timer.bullet = 0;
    let bulletspeed = Bullet.SetSpeed(button, config.bulletSpeed);
    if (bulletspeed) {
      bullet.push(new Bullet(crow.mid_x, crow.mid_y, bulletspeed));
    }
  }
  if ((!map_l1.this_room_empty()) & enemy.length < config_room.enemiesAtOnce & enemiesAlreadySpawned < config_room.enemiesAtAll) {
    enemiesAlreadySpawned += 1;
    let enemyHealth = random(config.l1.enemyHealthMin, config.l1.enemyHealthMax);
    let enemySpeed = random(config.l1.enemySpeedMin, config.l1.enemySpeedMax);

    let cords = Enemy.randomInWalls(walls, crow);
    enemy.push(new Enemy(cords.x, cords.y, enemyHealth, enemySpeed));
  }

  for (let i = 0; i < enemy.length; i++) {
    enemy[i].moveToCrow(crow);

    if (enemy[i].health <= 0) {
      enemy.splice(i, 1);
      crow.killed_enemies += 1;
      break;
    }

    for (let j = 0; j < bullet.length; j++) {
      bullet[j].enemyCollision(enemy[i]);
    }

    if (timer.lastHit > config.damageCooldown) {
      if (enemy[i].crowCollision(crow)) {
        crow.health -= 1;
        timer.lastHit = 0;
      }
    }

    enemy[i].draw();
  }

  if (boss && boss.alive) {
    boss.moveToCrow(crow);

    if (timer.lastHit > config.damageCooldown) {
      if (boss.crowCollision(crow)) {
        crow.health -= 1;
        timer.lastHit = 0;
      }
    }
    for (let i = 0; i < bullet.length; i++) {
      bullet[i].bossCollision(boss);
    }

    if (boss.health <= 0) {
      boss.alive = false;
    }

    boss.draw();

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
  if (enemy.length === 0 && (!boss || boss.health <= 0)) {
    map_l1.set_this_room_empty();
    gates.draw(map_l1);
    gates.move(map_l1, crow);
    if (boss && boss.health <= 0) {
      gameCondition = "win";
    }
  }
  if (button.m) {
    button.m = false; //stoping cycling through conditions map/game without pressing up button
    gameCondition = "map";
  }
}


function mainMenu() {
  background('#1a1c1d');
  menu_btns.draw();
  tutorial.draw(button);
}

function mapDraw() {
  background('#1a1c1d');
  scale(scaleSize);
  map_l1.draw();
  if (button.enter || button.m) {
      button.m = false; //stoping cycling through conditions map/game without pressing up button
      gameCondition = "game";
    }
}
function loseScreen() {
  background('#1a1c1d');
  let enemiesAtAll = crow.killed_enemies - (enemiesAlreadySpawned - enemy.length) + config_room.enemiesAtAll;
  lose.draw(button, crow.killed_enemies, enemiesAtAll);
}

function winScreen() {
  background('#1a1c1d');
  let enemiesAtAll = crow.killed_enemies - (enemiesAlreadySpawned - enemy.length) + config_room.enemiesAtAll;
  win.draw(button, crow.killed_enemies, enemiesAtAll, crow);
}

function draw() {
  switch (gameCondition) {
    case "prepare": prepareGameLoop(); break;
    case "prepare_lvl": prepareLevel(); break;
    case "game": gameLoop(); break;
    case "menu": mainMenu(); break;
    case "map": mapDraw(); break;
    case "lose": loseScreen(); break;
    case "win": winScreen(); break;
    default: mainMenu(); break;
  }

}