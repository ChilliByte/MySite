var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext("2d");
var h = 450;
var w = 800;
canvas.height = h;
canvas.width = w;
var friction = 0.8;
var gravity = 0.3;
var boxes = [];
function Box(x,y,h,w) {
  this.x = x*50;
  this.y = y*50;
  this.h = h*50;
  this.w = w*50;
}
boxes.push(new Box(0,8,1,16));
// shim layer with setTimeout fallback
window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame       ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame    ||
          function( callback ){
            window.setTimeout(callback, 1000 / 60);
          };
})();

// usage:
// instead of setInterval(render, 16) ....
function render() {
  ctx.clearRect(0,0,w,h);
  i = boxes.length;
  while(i--) {
    ctx.rect(boxes[i].x, boxes[i].y, boxes[i].w, boxes[i].h);
    colCheck(player,boxes[i]);
  }
  ctx.drawSvg(drawBean(player),player.x,player.y,64,64);
  player.velX *= friction;
  player.velY += gravity; 
}
(function animloop(){
  requestAnimFrame(animloop);
  render();
})();

function colCheck(shapeA, shapeB) {
    // get the vectors to check against
    var vX = (shapeA.x + (shapeA.width / 2)) - (shapeB.x + (shapeB.width / 2)),
        vY = (shapeA.y + (shapeA.height / 2)) - (shapeB.y + (shapeB.height / 2)),
        // add the half widths and half heights of the objects
        hWidths = (shapeA.width / 2) + (shapeB.width / 2),
        hHeights = (shapeA.height / 2) + (shapeB.height / 2),
        colDir = null;
 
    // if the x and y vector are less than the half width or half height, they we must be inside the object, causing a collision
    if (Math.abs(vX) < hWidths && Math.abs(vY) < hHeights) {         // figures out on which side we are colliding (top, bottom, left, or right)         var oX = hWidths - Math.abs(vX),             oY = hHeights - Math.abs(vY);         if (oX >= oY) {
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
    }
    return colDir;
}
