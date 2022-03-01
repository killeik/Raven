export default class Bullet{
  constructor(startx, starty, bulletSpeedX, bulletSpeedY, radius, exists){
      this.x = startx;
      this.y = starty;
      this.speedx  = bulletSpeedX;
      this.speedy = bulletSpeedY;
      this.radius = radius;
      this.exists = exists;
  }
  static add(rightPressedShoot, leftPressedShoot, upPressedShoot, downPressedShoot, bulletSpeed){
      if (rightPressedShoot & !(upPressedShoot || downPressedShoot || leftPressedShoot)) {
      return {x:bulletSpeed, y: 0};
    } else if (leftPressedShoot & !(upPressedShoot || downPressedShoot || rightPressedShoot)) {
      return {x:-bulletSpeed, y: 0};
    } else if (upPressedShoot & !(leftPressedShoot || rightPressedShoot || downPressedShoot)) {
      return {x:0, y: -bulletSpeed};
    } else if (downPressedShoot & !(leftPressedShoot || rightPressedShoot || upPressedShoot)) {
      return {x:0, y: bulletSpeed};
    } else if (rightPressedShoot & upPressedShoot & !(downPressedShoot || leftPressedShoot)) {
      return {x:bulletSpeed, y: -bulletSpeed};
    } else if (rightPressedShoot & downPressedShoot & !(upPressedShoot || leftPressedShoot)) {
      return {x:bulletSpeed, y: bulletSpeed};
    } else if (leftPressedShoot & upPressedShoot & !(downPressedShoot || rightPressedShoot)) {
      return {x:-bulletSpeed, y: -bulletSpeed};
    } else if (leftPressedShoot & downPressedShoot & !(upPressedShoot || rightPressedShoot)) {
      return {x:-bulletSpeed, y: bulletSpeed};
    }
  }
}
