class Enemy {
    constructor(x, y, health, speed) {
      this.x = x;
      this.y = y;
      this.health = health;
      this.maxHealth = health;
      this.height;
      this.width;
      this.speed = speed;
    }
    get mid_x() {
      return this.x + (this.width / 2)
    }
    get mid_y() {
      return this.y + (this.height / 2)
    }

    static randomInWalls(walls, crow) {
        let x,y;
        for (; ;) {
          x = random(walls.x1, walls.x2 - 25); //25 = width + strokeweight
          y = random(walls.y1, walls.y2 - 45); //45 = height + strokeweight
          if (dist(x, y, crow.mid_x, crow.mid_y) > 300) break;
        }
    
        return { x: x, y: y }
    }

    static upgrade_chance(diffuculty_gate, diffuculty) {
      let random_seed = random() * diffuculty_gate;
      console.log(random_seed)
      if (random_seed <= diffuculty) {
        return true
      } else {
        return false
      }
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
