var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

var rightPressed = false;
var leftPressed = false;
var downPressed = false;
var upPressed = false;

var rightPressedShoot = false;
var leftPressedShoot = false;
var downPressedShoot = false;
var upPressedShoot = false;


class Crow{
  constructor(){
    this.width = 20;
    this.height = 40;

    // Coordinates to drow from
    this.x = 0.5 * canvas.width;
    this.y = 0.5 * canvas.height;

    this.side = "right";
    this.speedx = 0;
    this.speedy = 0;
  }
}
var crow = new Crow();

document.addEventListener("DOMContentLoaded", startup);

function startup() {
  document.addEventListener("keydown", keyDownHandler, false);
  document.addEventListener("keyup", keyUpHandler, false);
  draw();
}

function keyDownHandler(e) {
  switch (e.code) {
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
  var crowSpeed = 2.4;

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

var wallsY = 40;
var wallsX = 150;

function drawWalls() {

  ctx.beginPath();
  // ctx.setLineDash([9, 13]);
  ctx.lineCap = "round";
  ctx.strokeStyle = "#AAA";
  ctx.lineWidth = 3;
  ctx.lineJoin = "round";

  ctx.moveTo(wallsX, wallsY);
  ctx.lineTo(wallsX, canvas.height - wallsY);
  ctx.lineTo(canvas.width - wallsX, canvas.height - wallsY);
  ctx.lineTo(canvas.width - wallsX, wallsY);
  ctx.lineTo(wallsX, wallsY);
  ctx.stroke();
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
class Bullet{
  constructor(bulletx, bullety, speedx, speedy){
    this.x = bulletx;
    this.y = bullety;
    this.speedx = speedx;
    this.speedy = speedy;
    this.radius = 9;
    this.exists = true;
  }
}
  var bulletSpeed = 5;
  var bullets = [];


var bulletLastTime = Date.now();
var bulletCooldown = 300;

function bulletsAdd(bulletSpeedX, bulletSpeedY) {
  if(Date.now() - bulletLastTime > bulletCooldown){
    bulletLastTime = Date.now()
     bullets.push(new Bullet(crow.x + 0.5*crow.width, crow.y + 0.5*crow.height, bulletSpeedX, bulletSpeedY));
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
  for(let i=0 ; i < bullets.length-1; i++){
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
class Enemy{
  constructor(x, y, health){
    this.x = x;
    this.y = y;
    this.health = health;
    this.height = 40;
    this.width = 20;
  }
}

var enemies = [];
var enemiesAtOnceMax = 3;
var enemiesAtAllMax = 8;
var enemiesAlreadySpawned = 0;
function enemiesCreate(){
  if (enemies.length < enemiesAtOnceMax & enemiesAlreadySpawned < enemiesAtAllMax){
    enemiesAlreadySpawned+=1;
    enemyWidth = 20;
    enemyHeight = 40;
    enemyHealth = 3;
    let enemyX = getRandomArbitrary(wallsX + enemyWidth, canvas.width - wallsX - enemyWidth);
    let enemyY = getRandomArbitrary(wallsY + enemyHeight, canvas.height - wallsY - enemyHeight);
    enemies.push(new Enemy(enemyX, enemyY, enemyHealth));
  }
};

function getRandomArbitrary(min, max) {
  return Math.round (Math.random() * (max - min) + min);
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

class Vector{
  constructor(startx, starty, finishx, finishy){
    this.startx = startx;
    this.starty = starty;
    this.finishx = finishx;
    this.finishy = finishy;
    this.x = finishx - startx;
    this.y = finishy - starty;
    this.length = Math.sqrt((this.x*this.x) + (this.y*this.y));
    //normalizing vector
      this.nx = this.x / this.length;
      this.ny = this.y / this.length;
  }
}

function enemyMove(){
  var enemySpeed = 1;
    for(let i=0 ; i < enemies.length; i++){
      vecEnemyToPlayer = new Vector(enemies[i].x, enemies[i].y, crow.x, crow.y)
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
function draw() {
  //clear canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

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

  //delete bullets with .exists=false
  deleteBullets();

  //delete enemies with health <=0
  deleteEnemies();

  //if crow is behind the wall, set the coordinates = wall cords
  crowWallsCollision();

  //move crow with
  crow.x += crow.speedx;
  crow.y += crow.speedy;

  bulletsDraw();

  drawWalls();

  enemiesDraw();

  crowDraw();

  requestAnimationFrame(draw);
}

// var interval= setInterval(draw, 100)
