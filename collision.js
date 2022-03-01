export default class Collision{
  static boxToBox(ax, ay, awidth, aheight, bx, by, bwidth, bheight){
     if(ax + awidth >= bx &
       ax <= bx + bwidth &
       ay + aheight >= by  &
       ay <= by + bheight){
       return true;
     }else{
       return false
     }
  }
  static boxToBorder(ax, ay, awidth, aheight, bx, by, bwidth, bheight){
    if(ax + awidth >= bx + bwidth ||
      ax <= bx ||
      ay + aheight >= by + bheight ||
      ay <= by){
        return true
    }else{
      return false
    }
  }
}
