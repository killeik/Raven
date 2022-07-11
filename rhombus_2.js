class Rhombus_2 extends Enemy {
  constructor(x, y, health, speed) {
    super(x, y, health, speed);
    this.height = 40;
    this.width = 20;
    this.timer = 0;
    this.timerStart = 70;
    this.timerEnd = 90;
  }

  moveToCrow(crow) {
    this.timer += 1;
    let vectorToCrow = createVector((crow.mid_x - this.mid_x), (crow.mid_y - this.mid_y));
    let normVecToCrow = vectorToCrow.normalize();

    this.x += this.speed * 0.3 * normVecToCrow.x;
    this.y += this.speed * 0.3 * normVecToCrow.y;

    if (this.timer > this.timerStart) {
      this.x += this.speed * 3 * normVecToCrow.x;
      this.y += this.speed * 3 * normVecToCrow.y;

      if (this.timer > this.timerEnd) {
        this.timer = 0;
      }
    }

  }


  draw() {
    let dashing = color('#1a1c1d');
    let default_color = color("#CCC");

    let blender_coefficient;
    if (this.timer < this.timerStart) {
      blender_coefficient = this.timer / this.timerStart * 0.5;
    } else {
      blender_coefficient = 1;
    }

    let fill_color = lerpColor(default_color, dashing, blender_coefficient)

    fill(fill_color);
    stroke(default_color);
    strokeWeight(5);
    quad(this.x, this.y + (this.height / 2),
      this.x + (this.width / 2), this.y,
      this.x + this.width, this.y + (this.height / 2),
      this.x + (this.width / 2), this.y + this.height)
  }

}
