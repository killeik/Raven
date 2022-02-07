import Crow from "./crow.js";
import Collision from "./collision.js";
import Enemy from "./enemy.js";
import Bullet from "./bullet.js";
import Draw from "./draw.js";
import config from "./config.js"

var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

document.addEventListener("DOMContentLoaded", startup);

function startup() {
  document.addEventListener("keydown", function(e){keyHandler(e, true)}, false);
  document.addEventListener("keyup", function(e){keyHandler(e, false)}, false);
  draw();
}

var enterPressed = false;

var rightPressed = false;
var leftPressed = false;
var downPressed = false;
var upPressed = false;

var rightPressedShoot = false;
var leftPressedShoot = false;
var downPressedShoot = false;
var upPressedShoot = false;

function keyHandler(e, value) {
  switch (e.code) {
    case "Enter": enterPressed = value; break;

    case "KeyD": rightPressed = value; break;
    case "KeyA": leftPressed = value;  break;
    case "KeyW": upPressed = value;    break;
    case "KeyS": downPressed = value;  break;

    case "Right": case "ArrowRight": rightPressedShoot = value; break;
    case "Left":  case "ArrowLeft":  leftPressedShoot = value;  break;
    case "Up":    case "ArrowUp":    upPressedShoot = value;    break;
    case "Down":  case "ArrowDown":  downPressedShoot = value;  break;
  }
}

function crowWallsCollision() {

  if (Crow.y + Crow.speedy <= config.wallsY) {
    Crow.y = config.wallsY;
  } else if (Crow.y + Crow.height + Crow.speedy >= canvas.height - config.wallsY) {
    Crow.y = canvas.height - config.wallsY - 1 - Crow.height;
  }

  if (Crow.x + Crow.speedx <= config.wallsX) {
    Crow.x = config.wallsX + 1;
  } else if (Crow.x + Crow.width + Crow.speedx >= canvas.width - config.wallsX) {
    Crow.x = canvas.width - config.wallsX - Crow.width - 1;
  }

}

function checkBulletWallCollision(){
  for (let i=0; i < bullets.length; i++){
    if (Collision.boxToBorder(bullets[i].x - bullets[i].radius,
      bullets[i].y - bullets[i].radius,
      2 * bullets[i].radius,
      2 * bullets[i].radius,
      config.wallsX, config.wallsY,
      canvas.width - 2*config.wallsX,
      canvas.height - 2*config.wallsY)
    ){
      bullets[i].exists = false;
    }
  }
}

function checkBulletEnemyCollision(){
  for(let i=0 ; i < bullets.length; i++){
    for (let j=0; j < enemies.length; j++){
      if(Collision.boxToBox(
        bullets[i].x-bullets[i].radius,
        bullets[i].y-bullets[i].radius,
        2 * bullets[i].radius,
        2 * bullets[i].radius,
        enemies[j].x,
        enemies[j].y,
        enemies[j].width,
        enemies[j].height)){
        enemies[j].health -= 1;
        bullets[i].exists = false;
      };
    }
  }
}

function checkCrowEnemyCollision(){
  for (let j=0; j < enemies.length; j++){
    if(Collision.boxToBox(
      Crow.x,
      Crow.y,
      Crow.width,
      Crow.height,
      enemies[j].x,
      enemies[j].y,
      enemies[j].width,
      enemies[j].height)
    ){
      if(Date.now() - damageLastTime > config.damageCooldown){
      damageLastTime = Date.now();
      Crow.health-= 1;
      }
    }
  }
}


function startGame(){
  if (enterPressed){
    gameStarted = true;
    game = true;

    Crow.x = 0.5 * canvas.width;
    Crow.y = 0.5 * canvas.height;
    Crow.healthMax = 5;
    Crow.health = Crow.healthMax;

    enemiesAlreadySpawned = 0;
    bullets = [];
    enemies = [];
  }
}
var bulletLastTime = Date.now();
var damageLastTime = Date.now();

var game = false;
var gameStarted = false;

var bullets = [];
var enemies = [];

var enemiesAlreadySpawned = 0;

Crow.height = 40;
Crow.width = 20;

function draw() {
  //clear canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (game){

  // spawn enemies at random place, with max at once, and max at all restrictions
  if (enemies.length < config.enemiesAtOnceMax & enemiesAlreadySpawned < config.enemiesAtAllMax){
    enemiesAlreadySpawned+=1;
    let cords = Enemy.returnRandomPointsfromPool(
      config.wallsX + config.enemyWidth, canvas.width - config.wallsX - config.enemyWidth,
      config.wallsY + config.enemyHeight, canvas.height - config.wallsY - config.enemyHeight)

    enemies.push(new Enemy(cords.x, cords.y, config.enemyHealth, config.enemyHeight, config.enemyWidth));
  }



  for(let i=0 ; i < enemies.length; i++){
    //using vector from enemy to crow, go directly to crow
    enemies[i].moveToCords(config.enemySpeed, Crow.x, Crow.y);

    //delete enemies with health <=0
    if(enemies[i].health <=0){
      enemies.splice(i,1);
      break;
    }

    Draw.enemy(ctx, enemies[i])
  }


  if(Date.now() - bulletLastTime > config.bulletCooldown){
    //set bulletspeed according to direction of pressed button
    let bulletspeed = Bullet.add(rightPressedShoot, leftPressedShoot, upPressedShoot, downPressedShoot, config.bulletSpeed);
    if(bulletspeed){
      bulletLastTime = Date.now();
      bullets.push(new Bullet(Crow.x+0.5*Crow.width, Crow.y+0.5*Crow.height, bulletspeed.x, bulletspeed.y, 9, true));
    }
  }
  //set bullets[i].exists=false if collision true
  checkBulletWallCollision();

  //set bullets[i].exists=false, enemies[j].health-=1 if collision true
  checkBulletEnemyCollision();

  //if enemy touch crow, crow.health -=1
  checkCrowEnemyCollision();



  //if crow is behind the wall, set the coordinates = wall cords
  crowWallsCollision();

  if (Crow.health <= 0){
    game = false;
  }

  Crow.Move(config.crowSpeed, rightPressed, leftPressed, upPressed, downPressed);

  //move crow with
  Crow.x += Crow.speedx;
  Crow.y += Crow.speedy;

  Draw.walls(ctx, config.wallsX, config.wallsY, canvas.width - 2*config.wallsX, canvas.height - 2*config.wallsY);

  Draw.mainInterfaceBlock(ctx);
  Draw.crowHealthBlock(ctx, Crow.healthMax, Crow.health)
    //delete bullets with .exists=false
  for (let i=0; i < bullets.length; i++){
    if(! bullets[i].exists){
      bullets.splice(i, 1);
      break;
    }
    // Move bullets with their speed
    bullets[i].x += bullets[i].speedx;
    bullets[i].y += bullets[i].speedy;

    //draw
    Draw.bullet(ctx, bullets[i])
  }

  Draw.crow(ctx, Crow);

} else if(! gameStarted){
  startGame();

  Draw.tutorial(ctx);

  Draw.welcomeScreen(ctx);

} else {
  startGame();

  Draw.looseScreen(ctx);

  Draw.tutorial(ctx);
}

  requestAnimationFrame(draw);
}

// var interval= setInterval(draw, 100)
