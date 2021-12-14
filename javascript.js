var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

var enterPressed = false;

var rightPressed = false;
var leftPressed = false;
var downPressed = false;
var upPressed = false;

var rightPressedShoot = false;
var leftPressedShoot = false;
var downPressedShoot = false;
var upPressedShoot = false;


document.addEventListener("DOMContentLoaded", startup);

function startup() {
  document.addEventListener("keydown", keyDownHandler, false);
  document.addEventListener("keyup", keyUpHandler, false);
  draw();
}

function keyDownHandler(e) {
  switch (e.code) {
    case "Enter": enterPressed = true; break;

    case "KeyD": rightPressed = true; break;
    case "KeyA": leftPressed = true;  break;
    case "KeyW": upPressed = true;    break;
    case "KeyS": downPressed = true;  break;

    case "Right": case "ArrowRight": rightPressedShoot = true; break;
    case "Left":  case "ArrowLeft":  leftPressedShoot = true;  break;
    case "Up":    case "ArrowUp":    upPressedShoot = true;    break;
    case "Down":  case "ArrowDown":  downPressedShoot = true;  break;
  }
}

function keyUpHandler(e) {
  switch (e.code) {
    case "Enter": enterPressed = false; break;

    case "KeyD": rightPressed = false; break;
    case "KeyA": leftPressed = false;  break;
    case "KeyW": upPressed = false;    break;
    case "KeyS": downPressed = false;  break;

    case "Right": case "ArrowRight": rightPressedShoot = false; break;
    case "Left":  case "ArrowLeft":  leftPressedShoot = false;  break;
    case "Up":    case "ArrowUp":    upPressedShoot = false;    break;
    case "Down":  case "ArrowDown":  downPressedShoot = false;  break;
  }
}

function crowMove() {

    if (rightPressed & !(upPressed || downPressed || leftPressed)) {
      crow.speedx = crowSpeed;
      crow.speedy = 0;
      crow.side = "right";
    } else if (leftPressed & !(upPressed || downPressed || rightPressed)) {
      crow.speedx = -crowSpeed;
      crow.speedy = 0;
      crow.side = "left";
    } else if (upPressed & !(leftPressed || rightPressed || downPressed)) {
      crow.side = "up";
      crow.speedy = -crowSpeed;
      crow.speedx = 0;
    } else if (downPressed & !(leftPressed || rightPressed || upPressed)) {
      crow.side = "down";
      crow.speedy = crowSpeed;
      crow.speedx = 0;
    } else if (rightPressed & upPressed & !(downPressed || leftPressed)) {
      crow.speedx =  crowSpeed;
      crow.speedy =  -crowSpeed;
      crow.side = "right-up";
    } else if (rightPressed & downPressed & !(upPressed || leftPressed)) {
      crow.speedx =  crowSpeed;
      crow.speedy =  crowSpeed;
      crow.side = "right-down";
    } else if (leftPressed & upPressed & !(downPressed || rightPressed)) {
      crow.speedx =  -crowSpeed;
      crow.speedy =  -crowSpeed;
      crow.side = "left-up";
    } else if (leftPressed & downPressed & !(upPressed || rightPressed)) {
      crow.speedx =  -crowSpeed;
      crow.speedy =  crowSpeed;
      crow.side = "left-down";
    } else {
      crow.speedy = 0;
      crow.speedx = 0;
    }
}

function drawWalls() {

  ctx.beginPath();
  ctx.lineCap = "round";
  ctx.strokeStyle = "#AAA";
  ctx.lineWidth = 3;
  ctx.lineJoin = "round";
  ctx.strokeRect(wallsX, wallsY, canvas.width - 2*wallsX, canvas.height - 2*wallsY);
  ctx.closePath();
}

function crowWallsCollision() {

  if (crow.y + crow.speedy <= wallsY) {
    crow.y = wallsY;
  } else if (crow.y + crow.height + crow.speedy >= canvas.height - wallsY) {
    crow.y = canvas.height - wallsY - 1 - crow.height;
  }

  if (crow.x + crow.speedx <= wallsX) {
    crow.x = wallsX + 1;
  } else if (crow.x + crow.width + crow.speedx >= canvas.width - wallsX) {
    crow.x = canvas.width - wallsX - crow.width - 1;
  }

}

function crowDraw() {
  ctx.beginPath();
  ctx.lineTo(crow.x, crow.y+crow.height)
  ctx.lineTo(crow.x + crow.width, crow.y+crow.height)
  ctx.lineTo(crow.x + 0.5*crow.width, crow.y)
  ctx.fillStyle = "#CCC";
  ctx.fill();
}

function crowShoot(){
    if (rightPressedShoot & !(upPressedShoot || downPressedShoot || leftPressedShoot)) {
    bulletsAdd(bulletSpeed, 0);
  } else if (leftPressedShoot & !(upPressedShoot || downPressedShoot || rightPressedShoot)) {
    bulletsAdd(-bulletSpeed, 0);
  } else if (upPressedShoot & !(leftPressedShoot || rightPressedShoot || downPressedShoot)) {
    bulletsAdd(0, -bulletSpeed);
  } else if (downPressedShoot & !(leftPressedShoot || rightPressedShoot || upPressedShoot)) {
    bulletsAdd(0, bulletSpeed);
  } else if (rightPressedShoot & upPressedShoot & !(downPressedShoot || leftPressedShoot)) {
    bulletsAdd(bulletSpeed, -bulletSpeed);
  } else if (rightPressedShoot & downPressedShoot & !(upPressedShoot || leftPressedShoot)) {
    bulletsAdd(bulletSpeed, bulletSpeed);
  } else if (leftPressedShoot & upPressedShoot & !(downPressedShoot || rightPressedShoot)) {
    bulletsAdd(-bulletSpeed, -bulletSpeed);
  } else if (leftPressedShoot & downPressedShoot & !(upPressedShoot || rightPressedShoot)) {
    bulletsAdd(-bulletSpeed, bulletSpeed);
  }
}

function bulletsAdd(bulletSpeedX, bulletSpeedY) {
  if(Date.now() - bulletLastTime > bulletCooldown){
    bulletLastTime = Date.now()
     bullets.push({x:crow.x + 0.5*crow.width,
       y:crow.y + 0.5*crow.height,
       speedx: bulletSpeedX,
       speedy: bulletSpeedY,
       radius: 9,
       exists: true});
   }
}

function checkBulletWallCollision(){
  for (let i=0; i < bullets.length; i++){
    if (bullets[i].x + bullets[i].radius >= canvas.width - wallsX ||
        bullets[i].x - bullets[i].radius <= wallsX ||
        bullets[i].y + bullets[i].radius >= canvas.height - wallsY ||
        bullets[i].y - bullets[i].radius <= wallsY){
          bullets[i].exists = false;
    }
  }
}

function checkBulletEnemyCollision(){
  for(let i=0 ; i < bullets.length; i++){
    for (let j=0; j < enemies.length; j++){
      if(bullets[i].x + bullets[i].radius >= enemies[j].x &
         bullets[i].x - bullets[i].radius <= enemies[j].x + enemies[j].width &
         bullets[i].y + bullets[i].radius >= enemies[j].y  &
         bullets[i].y - bullets[i].radius <= enemies[j].y + enemies[j].height){
        enemies[j].health -= 1;
        bullets[i].exists = false;
      };
    }
  }
}

function checkCrowEnemyCollision(){
  for (let j=0; j < enemies.length; j++){
    if(crow.x + crow.width >= enemies[j].x &
       crow.x <= enemies[j].x + enemies[j].width &
       crow.y + crow.height >= enemies[j].y  &
       crow.y <= enemies[j].y + enemies[j].height){
      if(Date.now() - damageLastTime > damageCooldown){
      damageLastTime = Date.now();
      crow.health-= 1;
      }
    }
  }
}

function deleteBullets(){
  for (let i=0; i < bullets.length; i++){
    if(! bullets[i].exists){
      bullets.splice(i, 1);
    }
  }
}

function bulletsDraw(){
  for (let i=0; i < bullets.length; i++){
  ctx.beginPath();
  ctx.arc(bullets[i].x, bullets[i].y, bullets[i].radius, 0, 2 * Math.PI);
  ctx.fillStyle = "#CCC";
  ctx.fill();
  }
}

function enemiesCreate(){
  if (enemies.length < enemiesAtOnceMax & enemiesAlreadySpawned < enemiesAtAllMax){
    enemiesAlreadySpawned+=1;
    let enemyX = getRandomArbitrary(wallsX + enemyWidth, canvas.width - wallsX - enemyWidth);
    let enemyY = getRandomArbitrary(wallsY + enemyHeight, canvas.height - wallsY - enemyHeight);
    enemies.push({x:enemyX,
      y:enemyY,
      health: enemyHealth,
      height: enemyHeight,
      width:enemyWidth});
  }
};

function getRandomArbitrary(min, max) {
  return Math.round (Math.random() * (max - min) + min);
}

function vectorNormilize(startx, starty, finishx, finishy){
    let x = finishx - startx;
    let y = finishy - starty;
    let length = Math.sqrt((x*x) + (y*y));
    //normalizing vector
    nx = x / length;
    ny = y / length;
    return {nx: nx, ny:ny}
  }

function enemyMove(){
    for(let i=0 ; i < enemies.length; i++){
      vecEnemyToPlayer = vectorNormilize(enemies[i].x, enemies[i].y, crow.x, crow.y)
      enemies[i].x += (enemySpeed * vecEnemyToPlayer.nx);
      enemies[i].y += (enemySpeed * vecEnemyToPlayer.ny);
    }
}

function deleteEnemies(){
  for(let i=0; i < enemies.length; i++){
    if(enemies[i].health <=0){
      enemies.splice(i,1);
    }
  }
}

function enemiesDraw(){
  for(let i=0 ; i < enemies.length; i++){
    ctx.beginPath();
    ctx.moveTo(enemies[i].x, enemies[i].y + (enemies[i].height/2));
    ctx.lineTo(enemies[i].x + (enemies[i].width/2), enemies[i].y);
    ctx.lineTo(enemies[i].x + enemies[i].width, enemies[i].y + (enemies[i].height/2));
    ctx.lineTo(enemies[i].x +(enemies[i].width/2), enemies[i].y + enemies[i].height);
    ctx.closePath();
    ctx.fillStyle = "#CCC";
    ctx.fill();
  }
}

function drawInterface(){

  //main interface block
  ctx.beginPath();
  ctx.lineWidth = 5;
  ctx.strokeRect(5, 40, 135, canvas.height - 80);
  ctx.closePath();

  //health block
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
  if(crow.health > 0){
  ctx.beginPath();
  ctx.fillRect(20, 82, 104/crow.healthMax * crow.health, 26);
  ctx.closePath();
  }
}

function startGame(){
  if (enterPressed){
    gameStarted = true;
    game = true;

    crow.x = 0.5 * canvas.width;
    crow.y = 0.5 * canvas.height;
    crow.health = crow.healthMax;

    enemiesAlreadySpawned = 0;
    bullets = [];
    enemies = [];
  }
}

function drawTutorial(){
  ctx.fillStyle = "#BBB";
  ctx.font = '40px sans-serif';
  ctx.fillText('WASD - control', 450, 350);
  ctx.fillText('Arrows - shoot', 450, 400);
  ctx.fillText('Enter - start', 450, 450);
}

function drawWelcomeScreen(){
  ctx.fillStyle = "#BBB";
  ctx.font = '60px sans-serif';
  ctx.fillText('Welcome, Friend!', 350, 200);

}
function drawLooseScreen(){
  ctx.fillStyle = "#BBB";
  ctx.font = '60px sans-serif';
  ctx.fillText('Looser!', 450, 200);
}
var bulletLastTime = Date.now();
var damageLastTime = Date.now();

var game = false;
var gameStarted = false;

var bullets = [];
var enemies = [];

var crow ={
  width : 20,
  height : 40,

  // Coordinates to drow from
  x : 0.5 * canvas.width,
  y : 0.5 * canvas.height,

  side : "right",
  speedx : 0,
  speedy : 0,

  healthMax : 5,
  health : 5,
};
var crowSpeed = 2.4;

var wallsY = 40;

var wallsX = 150;

var bulletSpeed = 5;

var bulletCooldown = 300;

var damageCooldown = 1000;

var enemiesAtOnceMax = 3;

var enemiesAtAllMax = 8;

var enemiesAlreadySpawned = 0;

var enemyWidth = 20;

var enemyHeight = 40;

var enemyHealth = 3;

var enemySpeed = 1;


function draw() {
  //clear canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (game){

  // spawn enemies at random place, with max at once, and max at all restrictions
  enemiesCreate();

  //read (left, up, etc.)Pressed and set crow.speedx/crow.speedy
  crowMove();

  //using vector from enemy to crow, go directly to crow
  enemyMove();

  //read (left, up, etc.)PressedShoot use bulletsAdd(direction)
  crowShoot();

  // Move bullets with their speed
  for(let i=0 ; i < bullets.length; i++){
    bullets[i].x += bullets[i].speedx;
    bullets[i].y += bullets[i].speedy;
  }
  //set bullets[i].exists=false if collision true
  checkBulletWallCollision();

  //set bullets[i].exists=false, enemies[j].health-=1 if collision true
  checkBulletEnemyCollision();

  //if enemy touch crow, crow.health -=1
  checkCrowEnemyCollision();

  //delete bullets with .exists=false
  deleteBullets();

  //delete enemies with health <=0
  deleteEnemies();

  //if crow is behind the wall, set the coordinates = wall cords
  crowWallsCollision();

  if (crow.health <= 0){
    game = false;
  }
  //move crow with
  crow.x += crow.speedx;
  crow.y += crow.speedy;

  drawWalls();

  drawInterface();

  bulletsDraw();

  enemiesDraw();

  crowDraw();

} else if(! gameStarted){
  startGame();

  drawTutorial();

  drawWelcomeScreen();

} else {
  startGame();

  drawLooseScreen();

  drawTutorial();
}

  requestAnimationFrame(draw);
}

// var interval= setInterval(draw, 100)
