var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var tilesX = 8;
var tilesY = 5;
var tileWidth = Math.ceil(window.innerWidth/tilesX)
canvas.height = tileWidth*tilesY;
canvas.width = tileWidth*tilesX;
// shim layer with setTimeout fallback
window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame       ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame    ||
          function( callback ){
            window.setTimeout(callback, 1000 / 60);
          };
})();
var shadeEditor;
var isTint;
function getRandomRed() {
  shadeEditor = Math.floor(Math.random()*120);
  isTint = Math.random()<.5;
  if(isTint) {
    return "rgb(255," + shadeEditor + "," + shadeEditor + ")"
  } else {
    shadeEditor = 255 - shadeEditor
    return "rgb(" + shadeEditor + ",0,0)"    
  }
}
var squares = [];
(function initGrid() {
  for(var i = 0; i < 40; i++) {
    squares.push(getRandomRed())
  }
})()
// usage:
// instead of setInterval(render, 16) ....
var x = 1;
ctx.fillStyle = "#00ff00";
function render() {
  ctx.clearRect(0,0,1000,1000);
  ctx.fillRect(x/10,0,10,10);
  x++;
}

(function animloop(){
  requestAnimFrame(animloop);
  render();
})();
// place the rAF *before* the render() to assure as close to
// 60fps with the setTimeout fallback.
