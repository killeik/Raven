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
  //right-left axis
  var crowSpeed = 2.4;
<<<<<<< HEAD
=======
  var fixCoeff = 1;
>>>>>>> 045cab9098f11ed174c6528f9d8ebc37e635904c

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

function collisionWalls() {
  if (crow.y + crow.speedy <= wallsY) {
    crow.y = wallsY;
    console.log("Up");
  } else if (crow.y + crow.height + crow.speedy >= canvas.height - wallsY) {
    crow.y = canvas.height - wallsY - 1 - crow.height;
    console.log("Down");
  } else { }

  if (crow.x + crow.speedx <= wallsX) {
    crow.x = wallsX + 1;
    console.log("Left");
  } else if (crow.x + crow.width + crow.speedx >= canvas.width - wallsX) {
    crow.x = canvas.width - wallsX - crow.width - 1;
    console.log("Right");
  } else { }

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
  // var bulletDirection;

    if (rightPressedShoot & !(upPressedShoot || downPressedShoot || leftPressedShoot)) {
    // bulletDirection = "right";
    bulletsAdd(bulletSpeed, 0);
  } else if (leftPressedShoot & !(upPressedShoot || downPressedShoot || rightPressedShoot)) {
    // bulletDirection = "left";
    bulletsAdd(-bulletSpeed, 0);
  } else if (upPressedShoot & !(leftPressedShoot || rightPressedShoot || downPressedShoot)) {
    // bulletDirection = "up";
    bulletsAdd(0, -bulletSpeed);
  } else if (downPressedShoot & !(leftPressedShoot || rightPressedShoot || upPressedShoot)) {
    // bulletDirection = "down";
    bulletsAdd(0, bulletSpeed);
  } else if (rightPressedShoot & upPressedShoot & !(downPressedShoot || leftPressedShoot)) {
    // bulletDirection = "right-up";
    bulletsAdd(bulletSpeed, -bulletSpeed);
  } else if (rightPressedShoot & downPressedShoot & !(upPressedShoot || leftPressedShoot)) {
    // bulletDirection = "right-down";
    bulletsAdd(bulletSpeed, bulletSpeed);
  } else if (leftPressedShoot & upPressedShoot & !(downPressedShoot || rightPressedShoot)) {
    // bulletDirection = "left-up";
    bulletsAdd(-bulletSpeed, -bulletSpeed);
  } else if (leftPressedShoot & downPressedShoot & !(upPressedShoot || rightPressedShoot)) {
    // bulletDirection = "left-down";
    bulletsAdd(-bulletSpeed, bulletSpeed);
  }
  bulletLogic();
}
class Bullet{
  constructor(bulletx, bullety, speedx, speedy){
    this.x = bulletx;
    this.y = bullety;
    this.speedx = speedx;
    this.speedy = speedy;
    this.radius = 9;

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

function bulletLogic (){
  for(i=0 ; i < bullets.length; i++){
    bullets[i].x+=bullets[i].speedx;
    bullets[i].y+=bullets[i].speedy;

    if (bullets[i].x + bullets[i].radius>= canvas.width - wallsX || bullets[i].x - bullets[i].radius<= wallsX ||
    bullets[i].y + bullets[i].radius >= canvas.height - wallsY || bullets[i].y  - bullets[i].radius<= wallsY){
      bullets.splice(i, 1);
    }else{
    ctx.beginPath();
    ctx.arc(bullets[i].x, bullets[i].y, bullets[i].radius, 0, 2 * Math.PI)
    ctx.fillStyle = "#CCC";
    ctx.fill();
    }
  }
}

class Enemy{
  constructor(x,y){
    this.x = x;
    this.y = y;
    this.height = 40;
    this.width = 20;
  }
}

var enemies = [];
var enemiesMax = 5;

function enemiesCreate(){
  if (enemies.length < enemiesMax){
    enemyWidth = 20;
    enemyHeight = 40;
    enemyX = getRandomArbitrary(wallsX + enemyWidth, canvas.width - wallsX - enemyWidth);
    enemyY = getRandomArbitrary(wallsY + enemyHeight, canvas.height - wallsY - enemyHeight);
    enemies.push(new Enemy(enemyX, enemyY));
  }
};

function getRandomArbitrary(min, max) {
  return Math.round (Math.random() * (max - min) + min);
}

function enemiesDraw(){
  for(i=0 ; i < enemies.length; i++){
    ctx.beginPath();
    ctx.moveTo(enemies[i].x, enemies[i].y+ (enemies[i].height/2));
    ctx.lineTo(enemies[i].x + (enemies[i].width/2), enemies[i].y);
    ctx.lineTo(enemies[i].x + enemies[i].width, enemies[i].y + (enemies[i].height/2));
    ctx.lineTo(enemies[i].x +(enemies[i].width/2), enemies[i].y + enemies[i].height);
    ctx.closePath();
    ctx.fillStyle = "#CCC";
    ctx.fill();
  }
}

// function enemyMove(){
//     for(i=0 ; i < enemies.length; i++){
//       enemies[i]
//     }
// }
function draw() {

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  enemiesCreate();

  crowMove();

  crowShoot();

  collisionWalls();

  crow.x += crow.speedx;
  crow.y += crow.speedy;

  drawWalls();

  enemiesDraw();

  crowDraw();

  requestAnimationFrame(draw);
}

// var interval= setInterval(draw, 100)
