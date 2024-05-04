export default class Button {
  constructor() {

    this.enter = false;
    this.m = false;

    this.d = false;
    this.a = false;
    this.s = false;
    this.w = false;

    this.right = false;
    this.left = false;
    this.down = false;
    this.up = false;
  }

  handler(code, value) {
    switch (code) {
      case 13: this.enter = value; break;
      case 77: this.m = value; break;

      case 68: this.d = value; break;
      case 65: this.a = value; break;
      case 87: this.w = value; break;
      case 83: this.s = value; break;

      case 39: this.right = value; break;
      case 37: this.left = value; break;
      case 38: this.up = value; break;
      case 40: this.down = value; break;
    }
  }
} 
