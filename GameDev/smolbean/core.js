var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext("2d");
var h = window.innerHeight;
var w = window.innerWidth;
canvas.height = h;
canvas.width = w;

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
  Deep.draw();
}
(function animloop(){
  requestAnimFrame(animloop);
  render();
})();
