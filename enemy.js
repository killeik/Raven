class Enemy {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.health = 3;
    this.enemyMaxHealth = 3;
    this.height = 40;
    this.width = 20;
    this.speed = 1;
  }
  get mid_x() {
    return this.x + (this.width / 2)
  }
  get mid_y() {
    return this.y + (this.height / 2)
  }

  moveToCrow(crow) {
    let vectorToCrow = createVector((crow.mid_x - this.mid_x), (crow.mid_y - this.mid_y));
    let normVecToCrow = vectorToCrow.normalize();
    this.x += this.speed * normVecToCrow.x;
    this.y += this.speed * normVecToCrow.y;
  }

  static randomInWalls(walls) {
    let x = random(walls.x1, walls.x2)
    let y = random(walls.y1, walls.y2);
    return { x: x, y: y }
  }

  Draw() {
    fill('#CCC');
    stroke("#CCC");
    strokeWeight(5);
    quad(this.x, this.y + (this.height / 2),
      this.x + (this.width / 2), this.y,
      this.x + this.width, this.y + (this.height / 2),
      this.x + (this.width / 2), this.y + this.height)
  }

  crowCollision(crow) {
    if (this.x + this.width >= crow.x &
      this.x <= crow.x + crow.width &
      this.y + this.height >= crow.y &
      this.y <= crow.y + crow.height) {
      return true;
    } else {
      return false
    }
  }
}
