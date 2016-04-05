var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext("2d");
var h = 450;
var w = 800;
canvas.height = h;
canvas.width = w;
var friction = 0.8;
var gravity = 0.3;
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
  }
}
(function animloop(){
  requestAnimFrame(animloop);
  render();
})();
