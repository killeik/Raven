class Enemy {
  constructor(x, y, health, speed) {
    this.x = x;
    this.y = y;
    this.health = health;
    this.enemyMaxHealth = health;
    this.height = 40;
    this.width = 20;
    this.speed = speed;
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

  static randomInWalls(walls, crow) {
    let x = random(walls.x1, walls.x2 - 25);
    let y = random(walls.y1, walls.y2 - 45);
    for (; ;) {
      if (dist(x, y, crow.mid_x, crow.mid_y) > 300) break;
      x = random(walls.x1, walls.x2 - 25); //25 = width + strokeweight
      y = random(walls.y1, walls.y2 - 45); //45 = height + strokeweight
    }

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
