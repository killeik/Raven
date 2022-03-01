export default class Crow {
  // constructor(initial_x, initial_y, healthMax){
  //   this.x = initial_x;
  //   this.y = initial_y;
  constructor(){
    this.x = 0;
    this.y = 0;

    this.width = 20;
    this.height = 40;

    this.side = "right";
    this.speedx = 0;
    this.speedy = 0;

    this.healthMax = 0;
    this.health = 0;
  }
  get mid_x(){
    return this.x + (this.width/2)
  }
  get mid_y(){
    return this.y + (this.height/2)
  }

static Move(crowSpeed, rightPressed, leftPressed, upPressed, downPressed){
    if (rightPressed & !(upPressed || downPressed || leftPressed)) {
      this.speedx = crowSpeed;
      this.speedy = 0;
      this.side = "right";
    } else if (leftPressed & !(upPressed || downPressed || rightPressed)) {
      this.speedx = -crowSpeed;
      this.speedy = 0;
      this.side = "left";
    } else if (upPressed & !(leftPressed || rightPressed || downPressed)) {
      this.side = "up";
      this.speedy = -crowSpeed;
      this.speedx = 0;
    } else if (downPressed & !(leftPressed || rightPressed || upPressed)) {
      this.side = "down";
      this.speedy = crowSpeed;
      this.speedx = 0;
    } else if (rightPressed & upPressed & !(downPressed || leftPressed)) {
      this.speedx =  crowSpeed;
      this.speedy =  -crowSpeed;
      this.side = "right-up";
    } else if (rightPressed & downPressed & !(upPressed || leftPressed)) {
      this.speedx =  crowSpeed;
      this.speedy =  crowSpeed;
      this.side = "right-down";
    } else if (leftPressed & upPressed & !(downPressed || rightPressed)) {
      this.speedx =  -crowSpeed;
      this.speedy =  -crowSpeed;
      this.side = "left-up";
    } else if (leftPressed & downPressed & !(upPressed || rightPressed)) {
      this.speedx =  -crowSpeed;
      this.speedy =  crowSpeed;
      this.side = "left-down";
    } else {
      this.speedy = 0;
      this.speedx = 0;
    }
    return
  };
}
