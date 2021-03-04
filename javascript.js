var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

var CrowRight = new Image();
CrowRight.src = "images/crowRight.png";

var CrowLeft = new Image();
CrowLeft.src = "images/crowLeft.png";

//Key event listener
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

var rightPressed = false;
var leftPressed = false;
var downPressed = false;
var upPressed = false;

function keyDownHandler(e) {
  if (e.key == "Right" || e.key == "ArrowRight" || e.key == "d") {
    rightPressed = true;
  } else if (e.key == "Left" || e.key == "ArrowLeft" || e.key == "a") {
    leftPressed = true;
  } else if (e.key == "Up" || e.key == "ArrowUp" || e.key == "w") {
    upPressed = true;
  } else if (e.key == "Down" || e.key == "ArrowDown" || e.key == "s") {
    downPressed = true;
  }
}

function keyUpHandler(e) {
  if (e.key == "Right" || e.key == "ArrowRight" || e.key == "d") {
    rightPressed = false;
  } else if (e.key == "Left" || e.key == "ArrowLeft" || e.key == "a") {
    leftPressed = false;
  } else if (e.key == "Up" || e.key == "ArrowUp" || e.key == "w") {
    upPressed = false;
  } else if (e.key == "Down" || e.key == "ArrowDown" || e.key == "s") {
    downPressed = false;
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

  // if (rightPressed) {
  //   CrowSpeedX = CrowSpeed;
  //   CrowSide = "right";
  // } else if (leftPressed) {
  //   CrowSpeedX = -CrowSpeed;
  //   CrowSide = "left";
  // } else {
  //   CrowSpeedX = 0;
  // }

  // if (upPressed) {
  //   CrowSpeedY = -CrowSpeed;
  // } else if (downPressed) {
  //   CrowSpeedY = CrowSpeed;
  // } else {
  //   CrowSpeedY = 0;
  // }

  if (rightPressed & !(upPressed || downPressed)) {
    CrowSpeedX = CrowSpeed;
    CrowSide = "right";
  } else if (leftPressed & !(upPressed || downPressed)) {
    CrowSpeedX = -CrowSpeed;
    CrowSide = "left";
  } else if (upPressed & !(leftPressed || rightPressed)) {
    CrowSpeedY = -CrowSpeed;
  } else if (downPressed & !(leftPressed || rightPressed)) {
    CrowSpeedY = CrowSpeed;
  } else if (rightPressed & upPressed & !(downPressed || leftPressed)) {
    CrowSpeedX = 0.8 * CrowSpeed;
    CrowSpeedY = 0.8 * -CrowSpeed;
    CrowSide = "right";
  } else if (rightPressed & downPressed & !(upPressed || leftPressed)) {
    CrowSpeedX = 0.8 * CrowSpeed;
    CrowSpeedY = 0.8 * CrowSpeed;
    CrowSide = "right";
  } else if (leftPressed & upPressed & !(downPressed || rightPressed)) {
    CrowSpeedX = 0.8 * -CrowSpeed;
    CrowSpeedY = 0.8 * -CrowSpeed;
    CrowSide = "left";
  } else if (leftPressed & downPressed & !(upPressed || rightPressed)) {
    CrowSpeedX = 0.8 * -CrowSpeed;
    CrowSpeedY = 0.8 * CrowSpeed;
    CrowSide = "left";
  } else {
    CrowSpeedY = 0;
    CrowSpeedX = 0;
  }

}

var wallsY = 40;
var wallsX = 150;

function DrawWalls() {

  ctx.beginPath();

  ctx.setLineDash([9, 13]);
  ctx.lineCap = "round";
  ctx.strokeStyle = "#CCC";
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
  if (CrowY + CrowRight.height + CrowSpeedY <= wallsY + 11) {
    CrowY = wallsY - CrowRight.height + 12;
    console.log("Up");
  } else if (CrowY + CrowRight.height + CrowSpeedY >= canvas.height - wallsY) {
    CrowY = canvas.height - wallsY - 1 - CrowRight.height;
    console.log("Down");
  } else { }

  if (CrowX + CrowSpeedX <= wallsX) {
    CrowX = wallsX + 1;
    console.log("Left");
  } else if (CrowX + CrowRight.width + CrowSpeedX >= canvas.width - wallsX) {
    CrowX = canvas.width - wallsX - CrowRight.width - 1;
    console.log("Right");
  } else { }

}

function CrowDraw() {
  if (CrowSide == "right") {
    ctx.drawImage(CrowRight, CrowX, CrowY);
  } else if (CrowSide == "left") {
    ctx.drawImage(CrowLeft, CrowX, CrowY);
  } else {
    console.log("JOPAJOPA ALERT")
  }
}

function draw() {

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  CrowMove();

  CollisionWalls();

  CrowX += CrowSpeedX;
  CrowY += CrowSpeedY;

  DrawWalls();

  CrowDraw();

  requestAnimationFrame(draw);
}

draw();

// var interval= setInterval(draw, 100)
