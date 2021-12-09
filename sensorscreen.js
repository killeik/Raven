canvas.addEventListener("touchstart", handleStart, false);
canvas.addEventListener("touchend", handleEnd, false);
canvas.addEventListener("touchcancel", handleCancel, false);
canvas.addEventListener("touchmove", handleMove, false);

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
