class Crow {
  constructor(centerx, centery, speed, health) {
    this.width = 20;
    this.height = 40;

    this.x = centerx - (this.width / 2);
    this.y = centery - (this.height / 2);

    this.side = "right";

    this.speed = speed;
    this.speedx = 0;
    this.speedy = 0;

    this.healthMax = health;
    this.health = health;
  }
  get mid_x() {
    return this.x + (this.width / 2)
  }
  get mid_y() {
    return this.y + (this.height / 2)
  }

  Move(button) {
    if (button.d & !(button.w || button.s || button.a)) {
      this.speedx = this.speed;
      this.speedy = 0;
      this.side = "right";
    } else if (button.a & !(button.w || button.s || button.d)) {
      this.speedx = -this.speed;
      this.speedy = 0;
      this.side = "left";
    } else if (button.w & !(button.a || button.d || button.s)) {
      this.side = "up";
      this.speedy = -this.speed;
      this.speedx = 0;
    } else if (button.s & !(button.a || button.d || button.w)) {
      this.side = "down";
      this.speedy = this.speed;
      this.speedx = 0;
    } else if (button.d & button.w & !(button.s || button.a)) {
      this.speedx = this.speed;
      this.speedy = -this.speed;
      this.side = "right-up";
    } else if (button.d & button.s & !(button.w || button.a)) {
      this.speedx = this.speed;
      this.speedy = this.speed;
      this.side = "right-down";
    } else if (button.a & button.w & !(button.s || button.d)) {
      this.speedx = -this.speed;
      this.speedy = -this.speed;
      this.side = "left-up";
    } else if (button.a & button.s & !(button.w || button.d)) {
      this.speedx = -this.speed;
      this.speedy = this.speed;
      this.side = "left-down";
    } else {
      this.speedy = 0;
      this.speedx = 0;
    }

    this.x += this.speedx;
    this.y += this.speedy;
    return
  };


  Draw() {
    fill('#CCC');
    stroke("#CCC");
    strokeWeight(7);
    triangle(this.x, this.y + this.height, this.x + this.width, this.y + this.height, this.x + (0.5 * this.width), this.y);
  }
}
