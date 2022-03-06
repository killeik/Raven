var button = {
  enter: false,

  d: false,
  a: false,
  s: false,
  w: false,

  right: false,
  left: false,
  down: false,
  up: false
}

var timer = {
  bullet: Date.now()
}

var bullet = [];

var crow;
var canvas;
var scl; //scalesize

function setup() {
  canvas = Window.SetCanvas();
  var cnv = createCanvas(canvas.width, canvas.height);
  cnv.style('display', 'block');
  cnv.style('margin', 'auto');

  scl = Window.SetScale(canvas);
  crow = new Crow((canvas.width / 2 / scl), (canvas.height / 2 / scl), 3, 5);
}

function windowResized() {
  canvas = Window.SetCanvas();
  scl = Window.SetScale(canvas);
  resizeCanvas(canvas.width, canvas.height);
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
    case 65: button.a = value; break;
    case 87: button.w = value; break;
    case 83: button.s = value; break;

    case 39: button.right = value; break;
    case 37: button.left = value; break;
    case 38: button.up = value; break;
    case 40: button.down = value; break;
  }
}

function draw() {
  background('#1a1c1d');
  scale(scl);

  crow.Move(button);
  crow.Draw();
  if (Date.now() - timer.bullet > config.bulletCooldown) {
    timer.bullet = Date.now();
    let bulletspeed = Bullet.SetSpeed(button, config.bulletSpeed);
    if (bulletspeed) {
      bullet.push(new Bullet(crow.mid_x, crow.mid_y, bulletspeed));
    }
  }

  for (let i = 0; i < bullet.length; i++) {
    if (!bullet[i].exists) {
      bullet.splice(i, 1);
      break;
    }
    bullet[i].Move();
    bullet[i].Draw();
  }

}
