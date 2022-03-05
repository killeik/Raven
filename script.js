var enterPressed = false;

var rightPressed = false;
var leftPressed = false;
var downPressed = false;
var upPressed = false;

var rightPressedShoot = false;
var leftPressedShoot = false;
var downPressedShoot = false;
var upPressedShoot = false;

function setup() {
    var cnv = createCanvas(windowWidth, windowHeight);
    cnv.style('display', 'block');
    background('#1a1c1d');

}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
function keyPressed() {
  keyHandler(keyCode, true)
  return false; // prevent any default behaviour
}
function keyReleased() {
  keyHandler(keyCode, false)
  return false; // prevent any default behavior
}

function keyHandler(code, value) {
  switch (code) {
    case 13: enterPressed = value; break;

    case 68: rightPressed = value; break;
    case 65: leftPressed = value;  break;
    case 87: upPressed = value;    break;
    case 83: downPressed = value;  break;

    case 39: rightPressedShoot = value; break;
    case 37: leftPressedShoot = value;  break;
    case 38: upPressedShoot = value;    break;
    case 40: downPressedShoot = value;  break;
  }
}

function draw() {
  // put drawing code here
}
