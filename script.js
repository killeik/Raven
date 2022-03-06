var button = {
  enter:false,

  d:false,
  a:false,
  s:false,
  w:false,

  right:false,
  left:false,
  down:false,
  up: false
}

var crow = new Crow(700,700, 3, 5);

function setup() {
    var cnv = createCanvas(windowWidth, windowHeight);
    cnv.style('display', 'block');

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
    case 13: button.enter = value; break;

    case 68: button.d = value; break;
    case 65: button.a = value;  break;
    case 87: button.w = value;    break;
    case 83: button.s = value;  break;

    case 39: button.right = value; break;
    case 37: button.left = value;  break;
    case 38: button.up = value;    break;
    case 40: button.down = value;  break;
  }
}

function draw() {
  background('#1a1c1d');
  crow.Move(button);
  crow.Draw();
}
