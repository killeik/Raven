var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

//Key event listener
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

var rightPressed = false;
var leftPressed = false;
var downPressed = false;
var upPressed = false;

var rightPressedShoot = false;
var leftPressedShoot = false;
var downPressedShoot = false;
var upPressedShoot = false;

function keyDownHandler(e) {
  if (e.code == "KeyD") {
    rightPressed = true;
  } else if (e.code == "KeyA") {
    leftPressed = true;
  } else if (e.code == "KeyW") {
    upPressed = true;
  } else if (e.code == "KeyS") {
    downPressed = true;
  }
  if (e.key == "Right" || e.key == "ArrowRight") {
    rightPressedShoot = true;
  } else if (e.key == "Left" || e.key == "ArrowLeft") {
    leftPressedShoot = true;
  } else if (e.key == "Up" || e.key == "ArrowUp") {
    upPressedShoot = true;
  } else if (e.key == "Down" || e.key == "ArrowDown") {
    downPressedShoot = true;
  }
}

function keyUpHandler(e) {
  if (e.code == "KeyD") {
    rightPressed = false;
  } else if (e.code == "KeyA") {
    leftPressed = false;
  } else if (e.code == "KeyW") {
    upPressed = false;
  } else if (e.code == "KeyS") {
    downPressed = false;
  }
  if (e.key == "Right" || e.key == "ArrowRight") {
    rightPressedShoot = false;
  } else if (e.key == "Left" || e.key == "ArrowLeft") {
    leftPressedShoot = false;
  } else if (e.key == "Up" || e.key == "ArrowUp") {
    upPressedShoot = false;
  } else if (e.key == "Down" || e.key == "ArrowDown") {
    downPressedShoot = false;
  }
}


//touchpad support
function startup() {
  canvas.addEventListener("touchstart", handleStart, false);
  canvas.addEventListener("touchend", handleEnd, false);
  canvas.addEventListener("touchcancel", handleCancel, false);
  canvas.addEventListener("touchmove", handleMove, false);
}

document.addEventListener("DOMContentLoaded", startup);

var ongoingTouches = [];

function handleStart(evt) {
  evt.preventDefault();
  var touches = evt.changedTouches;
  if (touches[i].pageX < canvas.width * 0.4) {
    leftPressed = true;
    rightPressed = false;
  } else if (touches[i].pageX > canvas.width * 0.6) {
    rightPressed = true;
    leftPressed = false;
  } else {
    rightPressed = false;
    leftPressed = false;
  }

  if (touches[i].pageY < canvas.height * 0.4) {
    upPressed = true;
    downPressed = false;
  } else if (touches[i].pageY > canvas.height * 0.6) {
    upPressed = false;
    downPressed = true;
  } else {
    upPressed = false;
    downPressed = false;
  }
  for (var i = 0; i < touches.length; i++) {
    // console.log("touchstart:" + i + ',' + touches[i].pageX + ','  +touches[i].pageY);

    ongoingTouches.push(copyTouch(touches[i]));
  }
}

function handleMove(evt) {
  evt.preventDefault();
  var touches = evt.changedTouches;

  for (var i = 0; i < touches.length; i++) {
    var idx = ongoingTouchIndexById(touches[i].identifier);
    if (touches[i].pageX < canvas.width * 0.3) {
      leftPressed = true;
      rightPressed = false;
    } else if (touches[i].pageX > canvas.width * 0.7) {
      rightPressed = true;
      leftPressed = false;
    } else {
      rightPressed = false;
      leftPressed = false;
    }

    if (touches[i].pageY < canvas.height * 0.3) {
      upPressed = true;
      downPressed = false;
    } else if (touches[i].pageY > canvas.height * 0.7) {
      upPressed = false;
      downPressed = true;
    } else {
      upPressed = false;
      downPressed = false;
    }
    if (idx >= 0) {
      // console.log("continuing touch "+ idx + ',' + touches[i].pageX + ','  +touches[i].pageY);
      ongoingTouches.splice(idx, 1, copyTouch(touches[i])); // swap in the new touch record
    } else {
      console.log("can't figure out which touch to continue");
    }
  }
}

function handleEnd(evt) {
  evt.preventDefault();
  var touches = evt.changedTouches;

  for (var i = 0; i < touches.length; i++) {
    var idx = ongoingTouchIndexById(touches[i].identifier);
    rightPressed = false;
    leftPressed = false;
    upPressed = false;
    downPressed = false;
    if (idx >= 0) {
      // console.log('touchend:'+i + ',' + touches[i].pageX + ','  +touches[i].pageY)
    } else {
      console.log("can't figure out which touch to end");
    }
  }
}

function handleCancel(evt) {
  evt.preventDefault();
  // console.log("touchcancel.");
  var touches = evt.changedTouches;
  rightPressed = false;
  leftPressed = false;
  upPressed = false;
  downPressed = false;
  for (var i = 0; i < touches.length; i++) {
    var idx = ongoingTouchIndexById(touches[i].identifier);
    ongoingTouches.splice(idx, 1); // remove it; we're done
  }
}

function ongoingTouchIndexById(idToFind) {
  for (var i = 0; i < ongoingTouches.length; i++) {
    var id = ongoingTouches[i].identifier;

    if (id == idToFind) {
      return i;
    }
  }
  return -1; // not found
}

function copyTouch({ identifier, pageX, pageY }) {
  return { identifier, pageX, pageY };
}

var CrowX = 0.5 * canvas.width;
var CrowY = 0.5 * canvas.height;

var CrowSide = "right";
var CrowSpeedX = 0;
var CrowSpeedY = 0;

function CrowMove() {
  //right-left axis
  var CrowSpeed = 3;

  //console.log("CrowSide =", CrowSide ,"\n rightPressed = ", rightPressed, "leftPressed = ", leftPressed, "\n upPressed = ", upPressed, "downPressed =", downPressed)

  if (rightPressed & !(upPressed || downPressed || leftPressed)) {
    CrowSpeedX = CrowSpeed;
    CrowSpeedY = 0;
    CrowSide = "right";
  } else if (leftPressed & !(upPressed || downPressed || rightPressed)) {
    CrowSpeedX = -CrowSpeed;
    CrowSpeedY = 0;
    CrowSide = "left";
  } else if (upPressed & !(leftPressed || rightPressed || downPressed)) {
    CrowSide = "up";
    CrowSpeedY = -CrowSpeed;
    CrowSpeedX = 0;
  } else if (downPressed & !(leftPressed || rightPressed || upPressed)) {
    CrowSide = "down";
    CrowSpeedY = CrowSpeed;
    CrowSpeedX = 0;
  } else if (rightPressed & upPressed & !(downPressed || leftPressed)) {
    CrowSpeedX = 0.8 * CrowSpeed;
    CrowSpeedY = 0.8 * -CrowSpeed;
    CrowSide = "right-up";
  } else if (rightPressed & downPressed & !(upPressed || leftPressed)) {
    CrowSpeedX = 0.8 * CrowSpeed;
    CrowSpeedY = 0.8 * CrowSpeed;
    CrowSide = "right-down";
  } else if (leftPressed & upPressed & !(downPressed || rightPressed)) {
    CrowSpeedX = 0.8 * -CrowSpeed;
    CrowSpeedY = 0.8 * -CrowSpeed;
    CrowSide = "left-up";
  } else if (leftPressed & downPressed & !(upPressed || rightPressed)) {
    CrowSpeedX = 0.8 * -CrowSpeed;
    CrowSpeedY = 0.8 * CrowSpeed;
    CrowSide = "left-down";
  } else {
    CrowSpeedY = 0;
    CrowSpeedX = 0;
  }

}

var wallsY = 40;
var wallsX = 150;

function DrawWalls() {

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

function CollisionWalls() {
  if (CrowY + CrowSpeedY <= wallsY) {
    CrowY = wallsY;
    console.log("Up");
  } else if (CrowY + CrowHeight + CrowSpeedY >= canvas.height - wallsY) {
    CrowY = canvas.height - wallsY - 1 - CrowHeight;
    console.log("Down");
  } else { }

  if (CrowX + CrowSpeedX <= wallsX) {
    CrowX = wallsX + 1;
    console.log("Left");
  } else if (CrowX + CrowWidth + CrowSpeedX >= canvas.width - wallsX) {
    CrowX = canvas.width - wallsX - CrowWidth - 1;
    console.log("Right");
  } else { }

}
var CrowWidth = 20;
var CrowHeight = 40;

function CrowDraw() {
  ctx.beginPath();
  ctx.lineTo(CrowX, CrowY+CrowHeight)
  ctx.lineTo(CrowX + CrowWidth, CrowY+CrowHeight)
  ctx.lineTo(CrowX + (CrowWidth/2), CrowY)
  ctx.fillStyle = "#CCC";
  ctx.fill();
}


function CrowShoot(){
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
     bullets.push([CrowX +(CrowWidth/2), CrowY + (CrowHeight/2), bulletSpeedX, bulletSpeedY]);
   }
}
var i;
function bulletLogic (){
  for(i=0 ; i < bullets.length; i++){
    bullets[i][0]+=bullets[i][2];
    bullets[i][1]+=bullets[i][3];

    ctx.beginPath();
    ctx.arc(bullets[i][0], bullets[i][1], bulletRadius, 0, 2 * Math.PI)
    ctx.fillStyle = "#CCC";
    ctx.fill();

    if(CrowY + CrowSpeedY <= wallsY) {
  }else if (CrowY + CrowHeight + CrowSpeedY >= canvas.height - wallsY) {

  }else if (CrowX + CrowSpeedX <= wallsX) {
  }else if (CrowX + CrowWidth + CrowSpeedX >= canvas.width - wallsX) {
  }
    if (bullets[i][0] + bulletRadius >= canvas.width - wallsX || bullets[i][0] - bulletRadius<= wallsX ||
    bullets[i][1] + bulletRadius >= canvas.height - wallsY || bullets[i][1]  - bulletRadius<= wallsY){
      bullets.splice(i, 1);
    }
  }
}

function draw() {

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  CrowMove();

  CrowShoot();

  CollisionWalls();

  CrowX += CrowSpeedX;
  CrowY += CrowSpeedY;

  DrawWalls();

  CrowDraw();

  requestAnimationFrame(draw);
}

draw();

// var interval= setInterval(draw, 100)
