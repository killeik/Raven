export default class Enemy{
  constructor(startx, starty, enemyMaxHealth, enemyHeight, enemyWidth){
      this.x=startx;
      this.y=starty;
      this.health= enemyMaxHealth;
      this.height= enemyHeight;
      this.width= enemyWidth;
    }

    moveToCords(enemySpeed, targetX, targetY){
            let vecEnemyToPlayer = this.vectorNormilize(this.x, this.y, targetX, targetY)
            this.x += (enemySpeed * vecEnemyToPlayer.nx);
            this.y += (enemySpeed * vecEnemyToPlayer.ny);
          }

    vectorNormilize(startx, starty, finishx, finishy){
          let x = finishx - startx;
          let y = finishy - starty;
          let length = Math.sqrt((x*x) + (y*y));
          //normalizing vector
          let nx = x / length;
          let ny = y / length;
          return {nx: nx, ny:ny}
        }
        
  static getRandomArbitrary(min, max) {
      return Math.round (Math.random() * (max - min) + min);
    }

  static returnRandomPointsfromPool(startx, endx, starty, endy){
    let x = this.getRandomArbitrary(startx, endx);
    let y = this.getRandomArbitrary(starty, endy);
    return {x:x, y:y}
  }
}
