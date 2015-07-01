var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
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
var x = 1;
ctx.fillStyle = "#00ff00";
function render() {
  ctx.clearRect(0,0,1000,1000);
  ctx.drawRect(x/100,0,10,10);
  x++;
}

(function animloop(){
  requestAnimFrame(animloop);
  render();
})();
// place the rAF *before* the render() to assure as close to
// 60fps with the setTimeout fallback.
