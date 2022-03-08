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

  moveToCrow(crow) {
    let vectorToCrow = createVector((crow.mid_x - this.x), (crow.mid_y - this.y));
    let normVecToCrow = vectorToCrow.normalize();
    this.x += this.speed * normVecToCrow.x;
    this.y += this.speed * normVecToCrow.y;
  }

  static randomInWalls(walls) {
    let x = random(walls.x1, walls.x2)
    let y = random(walls.y1, walls.y2);
    return { x: x, y: y }
  }
}
