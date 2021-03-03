var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

var crowRight = new Image();
crowRight.src = "images/crowRight.png";
//crowRight.src = "https://i.imgur.com/GtmOCyP.png";

var crowLeft = new Image();
crowLeft.src = "images/crowLeft.png";
//crowLeft.src = "https://i.imgur.com/26kUcd4.png";

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

var crowX = 0.5 * canvas.width;
var crowY = 0.5 * canvas.height;

var CrowSide;
var CrowSpeedX = 0;
var CrowSpeedY = 0;

function CrowMove() {
  //right-left axis
  var CrowSpeed = 2;

  if (rightPressed) {
    CrowSpeedX = CrowSpeed;
    CrowSide = true;
  } else if (leftPressed) {
    CrowSpeedX = -CrowSpeed;
    CrowSide = false;
  } else {
    CrowSpeedX = 0;
  }

  if (upPressed) {
    CrowSpeedY = -CrowSpeed;
    //CrowSide = true;
  } else if (downPressed) {
    CrowSpeedY = CrowSpeed;
    //CrowSide = false;
  } else {
    CrowSpeedY = 0;
  }
}

function DrawWalls() {
  var distY = 40;
  var distX = 150;

  ctx.beginPath();

  ctx.setLineDash([9, 13]);
  ctx.lineCap = "round";
  ctx.strokeStyle = "#CCC";
  ctx.lineWidth = 3;
  ctx.lineJoin = "round";

  ctx.moveTo(distX, distY);
  ctx.lineTo(distX, canvas.height - distY);
  ctx.lineTo(canvas.width - distX, canvas.height - distY);
  ctx.lineTo(canvas.width - distX, distY);
  ctx.lineTo(distX, distY);

  ctx.stroke();
}

function CollisionWalls() { }

function CrowDraw() {
  if (CrowSide == true) {
    ctx.drawImage(crowRight, crowX, crowY);
  } else {
    ctx.drawImage(crowLeft, crowX, crowY);
  }
}

function draw() {
  console.log("leftPressed:" + leftPressed + ", rightPressed:" + rightPressed);

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  CrowMove();

  crowX += CrowSpeedX;
  crowY += CrowSpeedY;

  DrawWalls();

  CrowDraw();

  requestAnimationFrame(draw);
}

draw();

// var interval= setInterval(draw, 100)
