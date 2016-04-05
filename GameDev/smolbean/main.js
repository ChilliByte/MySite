function play() {
  document.getElementById("title").style.display = "none";
}
function createBean() {
  player = new Bean(beanColor.value,beaneyecolor.value,beanName.value+"bean");
  document.getElementById("beanSvg").style.display = "none";
}

window.onload = function() {
  var beanCols = document.querySelectorAll("input[type=color]");
  beanCols[0].onchange = function(e) {
      document.getElementsByTagName("path")[0].style.fill=this.value;
  }
  beanCols[1].onchange = function(e) {
      document.getElementsByTagName("ellipse")[0].style.fill=this.value;
      document.getElementsByTagName("ellipse")[1].style.fill=this.value;
  }
}
function colCheck(shapeA, shapeB) {
    // get the vectors to check against
    var vX = (shapeA.x + (shapeA.width / 2)) - (shapeB.x + (shapeB.width / 2)),
        vY = (shapeA.y + (shapeA.height / 2)) - (shapeB.y + (shapeB.height / 2)),
        // add the half widths and half heights of the objects
        hWidths = (shapeA.width / 2) + (shapeB.width / 2),
        hHeights = (shapeA.height / 2) + (shapeB.height / 2),
        colDir = null;
 
    // if the x and y vector are less than the half width or half height, they we must be inside the object, causing a collision
    if (Math.abs(vX) < hWidths && Math.abs(vY) < hHeights) {         // figures out on which side we are colliding (top, bottom, left, or right)         
      var oX = hWidths - Math.abs(vX),             
          oY = hHeights - Math.abs(vY);         
      if (oX >= oY) {
            if (vY > 0) {
                colDir = "t";
                shapeA.y += oY;
            } else {
                colDir = "b";
                shapeA.y -= oY;
            }
      } else {
            if (vX > 0) {
                colDir = "l";
                shapeA.x += oX;
            } else {
                colDir = "r";
                shapeA.x -= oX;
            }
        }
    return colDir;
}
