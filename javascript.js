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

class Coordinates{
  constructor(cordX, cordY){
    this.x = cordX;
    this.y = cordY;
  }
}


class Crow{
  constructor(cwidth, cheight){
    this.width = 20;
    this.height = 40;
    let crowX = 0.5 * cwidth;
    let crowY = 0.5 * cheight;

    // Coordinates to drow from
    this.pos = new Coordinates(crowX,crowY);
    // Midle Coordinates of figure
    this.posm = new Coordinates(crowX + 0.5*this.width, crowY + 0.5*this.height)

    this.side = "right";
    this.speedx = 0;
    this.speedy = 0;
  }
}
var crow = new Crow(canvas.width, canvas.height);

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
  var crowSpeed = 3;
  var fixCoeff = 0.8;

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
    crow.speedx = fixCoeff * crowSpeed;
    crow.speedy = fixCoeff * -crowSpeed;
    crow.side = "right-up";
  } else if (rightPressed & downPressed & !(upPressed || leftPressed)) {
    crow.speedx = fixCoeff * crowSpeed;
    crow.speedy = fixCoeff * crowSpeed;
    crow.side = "right-down";
  } else if (leftPressed & upPressed & !(downPressed || rightPressed)) {
    crow.speedx = fixCoeff * -crowSpeed;
    crow.speedy = fixCoeff * -crowSpeed;
    crow.side = "left-up";
  } else if (leftPressed & downPressed & !(upPressed || rightPressed)) {
    crow.speedx = fixCoeff * -crowSpeed;
    crow.speedy = fixCoeff * crowSpeed;
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
  if (crow.pos.y + crow.speedy <= wallsY) {
    crow.pos.y = wallsY;
    console.log("Up");
  } else if (crow.pos.y + crow.height + crow.speedy >= canvas.height - wallsY) {
    crow.pos.y = canvas.height - wallsY - 1 - crow.height;
    console.log("Down");
  } else { }

  if (crow.pos.x + crow.speedx <= wallsX) {
    crow.pos.x = wallsX + 1;
    console.log("Left");
  } else if (crow.pos.x + crow.width + crow.speedx >= canvas.width - wallsX) {
    crow.pos.x = canvas.width - wallsX - crow.width - 1;
    console.log("Right");
  } else { }

}


function crowDraw() {
  ctx.beginPath();
  ctx.lineTo(crow.pos.x, crow.pos.y+crow.height)
  ctx.lineTo(crow.pos.x + crow.width, crow.pos.y+crow.height)
  ctx.lineTo(crow.posm.x, crow.pos.y)
  ctx.fillStyle = "#CCC";
  ctx.fill();
}


function crowShoot(){
  var bulletDirection;

    if (rightPressedShoot & !(upPressedShoot || downPressedShoot || leftPressedShoot)) {
    bulletDirection = "right";
  } else if (leftPressedShoot & !(upPressedShoot || downPressedShoot || rightPressedShoot)) {
    bulletDirection = "left";
  } else if (upPressedShoot & !(leftPressedShoot || rightPressedShoot || downPressedShoot)) {
    bulletDirection = "up";
  } else if (downPressedShoot & !(leftPressedShoot || rightPressedShoot || upPressedShoot)) {
    bulletDirection = "down";
  } else if (rightPressedShoot & upPressedShoot & !(downPressedShoot || leftPressedShoot)) {
    bulletDirection = "right-up";
  } else if (rightPressedShoot & downPressedShoot & !(upPressedShoot || leftPressedShoot)) {
    bulletDirection = "right-down";
  } else if (leftPressedShoot & upPressedShoot & !(downPressedShoot || rightPressedShoot)) {
    bulletDirection = "left-up";
  } else if (leftPressedShoot & downPressedShoot & !(upPressedShoot || rightPressedShoot)) {
    bulletDirection = "left-down";
  } else {
    bulletDirection = "";
  }

  createBullet(bulletDirection);
  bulletLogic ();
}

  var bulletSpeed = 5 ;
  var bulletRadius = 9;
  var bullets = [];

function createBullet(dir){

  switch (dir) {
    case "right":
      bulletsAdd(bulletSpeed, 0)
      break;
    case "left":
      bulletsAdd(-bulletSpeed, 0)
      break;
    case "up":
      bulletsAdd(0, -bulletSpeed)
      break;
    case "down":
      bulletsAdd(0, bulletSpeed)
      break;
    case "right-up":
      bulletsAdd(bulletSpeed, -bulletSpeed)
      break;
    case "right-down":
      bulletsAdd(bulletSpeed, bulletSpeed)
      break;
    case "left-up":
      bulletsAdd(-bulletSpeed, -bulletSpeed)
      break;
    case "left-down":
      bulletsAdd(-bulletSpeed, bulletSpeed)
      break;}
}

bulletLastTime = Date.now();

function bulletsAdd(bulletSpeedX, bulletSpeedY) {
  if(Date.now() - bulletLastTime > 300){
    bulletLastTime = Date.now()
     bullets.push([crow.posm.x, crow.posm.y, bulletSpeedX, bulletSpeedY]);
   }
}

function bulletLogic (){
  for(i=0 ; i < bullets.length; i++){
    bullets[i][0]+=bullets[i][2];
    bullets[i][1]+=bullets[i][3];


    if (bullets[i][0] + bulletRadius >= canvas.width - wallsX || bullets[i][0] - bulletRadius<= wallsX ||
    bullets[i][1] + bulletRadius >= canvas.height - wallsY || bullets[i][1]  - bulletRadius<= wallsY){
      bullets.splice(i, 1);
    }else{
    ctx.beginPath();
    ctx.arc(bullets[i][0], bullets[i][1], bulletRadius, 0, 2 * Math.PI)
    ctx.fillStyle = "#CCC";
    ctx.fill();
    }
  }
}


function enemiesDraw(){
  var enemies = [
    [200, 100, 3],
    [600, 400, 3],
    [200, 300, 3],
    [700, 100, 3],
    [1000, 600, 3]
  ];
  var enemiesHeight = 40;
  var enemiesWidth = 20;

  var enemiesX = 200;
  var enemiesY = 100;

  for(i=0 ; i < enemies.length; i++){
    ctx.beginPath();
    ctx.moveTo(enemies[i][0], enemies[i][1]+ (enemiesHeight/2));
    ctx.lineTo(enemies[i][0] + (enemiesWidth/2), enemies[i][1]);
    ctx.lineTo(enemies[i][0] + enemiesWidth, enemies[i][1] + (enemiesHeight/2));
    ctx.lineTo(enemies[i][0] +(enemiesWidth/2), enemies[i][1] + enemiesHeight);
    ctx.closePath();
    ctx.fillStyle = "#CCC";
    ctx.fill();
  }
}


function draw() {

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  enemiesDraw();

  crowMove();

  crowShoot();

  collisionWalls();

  crow.pos.x += crow.speedx;
  crow.posm.x += crow.speedx;
  crow.pos.y += crow.speedy;
  crow.posm.y += crow.speedy;

  drawWalls();

  crowDraw();

  requestAnimationFrame(draw);
}

// var interval= setInterval(draw, 100)
