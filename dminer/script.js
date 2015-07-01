var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var tilesX = 12;
var tilesY = 8;
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
  for(var i = 0; i < 100; i++) {
    squares.push({color:getRandomRed(),light:isTint})
  }
})()
// usage:
// instead of setInterval(render, 16) ....
var x;
ctx.fillStyle = "#00ff00";
function render() {
  ctx.clearRect(0,0,1000,1000);
  x = squares.length;
  counter = 0;
  xPos = 0;
  yPos = 0;
  while(x--) {
    ctx.fillStyle = squares[x].color;
    ctx.fillRect(xPos,yPos,tileWidth,tileWidth);
    xPos+= tileWidth;
    counter++
    if (counter == tilesX + 1) {
      counter = 0;
      xPos = 0;
      yPos += tileWidth;
    }
  }
}

(function animloop(){
  requestAnimFrame(animloop);
  render();
})();
// place the rAF *before* the render() to assure as close to
// 60fps with the setTimeout fallback.
