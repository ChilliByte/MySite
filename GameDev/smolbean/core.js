var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext("2d");
var h = 900;
var w = 1600;
canvas.height = h;
canvas.width = w;
var friction = 0.9;
var gravity = 0.3;
var boxes = [];
boxes.push({
  x:0,
  y:850,
  h:50,
  w:1600
}) 
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
  if(player !== undefined) {
    ctx.clearRect(0,0,w,h);
    player.velX *= friction;
    player.velY += gravity;
    for(var i = 0; i < boxes.length; i++) {
      ctx.fillRect(boxes[i].x, boxes[i].y, boxes[i].w, boxes[i].h);
      var dir = colCheck(player,boxes[i]);
      if (dir === "l" || dir === "r") {
        player.velX = 0;
      } else if (dir === "b" || dir === "t") {
        player.velY *= -0.3;
      }
    }
    player.x += player.velX;
    player.y += player.velY;
    ctx.drawSvg(drawBean(player),player.x,player.y,player.w,player.h);
    if(Math.random() < (1/150)) {
      player.velY = -8;
      player.velX = (Math.random()-0.5) * 30;
    }
  }
}
(function animloop(){
  requestAnimFrame(animloop);
  render();
})();
