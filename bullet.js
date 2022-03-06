class Bullet {
  constructor(startx, starty, bulletspeed) {
    this.x = startx;
    this.y = starty;
    this.speedx = bulletspeed.x;
    this.speedy = bulletspeed.y;
    this.radius = 9;
    this.exists = true;
  }
  static SetSpeed(button, bulletSpeed) {
    if (button.right & !(button.up || button.down || button.left)) {
      return { x: bulletSpeed, y: 0 };
    } else if (button.left & !(button.up || button.down || button.right)) {
      return { x: -bulletSpeed, y: 0 };
    } else if (button.up & !(button.left || button.right || button.down)) {
      return { x: 0, y: -bulletSpeed };
    } else if (button.down & !(button.left || button.right || button.up)) {
      return { x: 0, y: bulletSpeed };
    } else if (button.right & button.up & !(button.down || button.left)) {
      return { x: bulletSpeed, y: -bulletSpeed };
    } else if (button.right & button.down & !(button.up || button.left)) {
      return { x: bulletSpeed, y: bulletSpeed };
    } else if (button.left & button.up & !(button.down || button.right)) {
      return { x: -bulletSpeed, y: -bulletSpeed };
    } else if (button.left & button.down & !(button.up || button.right)) {
      return { x: -bulletSpeed, y: bulletSpeed };
    }
  }

  Move() {
    this.x += this.speedx;
    this.y += this.speedy;
  }

  Draw() {
    fill('#CCC')
    circle(this.x, this.y, this.radius * 2)
  }
}
