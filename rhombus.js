class Rhombus extends Enemy {
  constructor(x, y, health, speed) {
    super(x, y, health, speed);
    this.height = 40;
    this.width = 20;
  }

  moveToCrow(crow) {
    let vectorToCrow = createVector((crow.mid_x - this.mid_x), (crow.mid_y - this.mid_y));
    let normVecToCrow = vectorToCrow.normalize();
    this.x += this.speed * normVecToCrow.x;
    this.y += this.speed * normVecToCrow.y;
  }


  draw() {
    fill('#CCC');
    stroke("#CCC");
    strokeWeight(5);
    quad(this.x, this.y + (this.height / 2),
      this.x + (this.width / 2), this.y,
      this.x + this.width, this.y + (this.height / 2),
      this.x + (this.width / 2), this.y + this.height)
  }

}
