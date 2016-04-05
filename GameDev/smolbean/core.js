var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext("2d");
var h = 450;
var w = 800;
canvas.height = h;
canvas.width = w;
var friction = 0.8;
var gravity = 0.3;
var boxes = [];
boxes.push({
  x:0,
  y:400,
  h:50,
  w:800
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
    ctx.drawSvg(drawBean(player),player.x,player.y,64,64);
    player.velX *= friction;
    player.velY += gravity;
    ctx.fillStyle = "black";
    ctx.beginPath();
    for(var i = 0; i < boxes.length; i++) {
      ctx.rect(boxes[i].x, boxes[i].y, boxes[i].width, boxes[i].height);
      var dir = colCheck(player,boxes[i]);
      if (dir === "l" || dir === "r") {
        player.velX = 0;
      } else if (dir === "b") {
        player.velY = 0;
      } else if (dir === "t") {
        player.velY *= -1;
      }
    }
    ctx.fill();
    player.x += player.velX;
    player.y += player.velY;
  }
}
(function animloop(){
  requestAnimFrame(animloop);
  render();
})();
