export default class Crow {
  constructor(x,y, speed, health){
    this.x = x;
    this.y = y;

    this.width = 20;
    this.height = 40;

    this.side = "right";
    this.speed = speed;
    this.speedx = 0;
    this.speedy = 0;

    this.healthMax = health;
    this.health = health;
  }
  get mid_x(){
    return this.x + (this.width/2)
  }
  get mid_y(){
    return this.y + (this.height/2)
  }

static Move(rightPressed, leftPressed, upPressed, downPressed){
    if (rightPressed & !(upPressed || downPressed || leftPressed)) {
      this.speedx = this.speed;
      this.speedy = 0;
      this.side = "right";
    } else if (leftPressed & !(upPressed || downPressed || rightPressed)) {
      this.speedx = -this.speed;
      this.speedy = 0;
      this.side = "left";
    } else if (upPressed & !(leftPressed || rightPressed || downPressed)) {
      this.side = "up";
      this.speedy = -this.speed;
      this.speedx = 0;
    } else if (downPressed & !(leftPressed || rightPressed || upPressed)) {
      this.side = "down";
      this.speedy = this.speed;
      this.speedx = 0;
    } else if (rightPressed & upPressed & !(downPressed || leftPressed)) {
      this.speedx =  this.speed;
      this.speedy =  -this.speed;
      this.side = "right-up";
    } else if (rightPressed & downPressed & !(upPressed || leftPressed)) {
      this.speedx =  this.speed;
      this.speedy =  this.speed;
      this.side = "right-down";
    } else if (leftPressed & upPressed & !(downPressed || rightPressed)) {
      this.speedx =  -this.speed;
      this.speedy =  -this.speed;
      this.side = "left-up";
    } else if (leftPressed & downPressed & !(upPressed || rightPressed)) {
      this.speedx =  -this.speed;
      this.speedy =  this.speed;
      this.side = "left-down";
    } else {
      this.speedy = 0;
      this.speedx = 0;
    }

    this.x += this.speedx;
    this.y += this.speedy;
    return
  };
}
