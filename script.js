var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
canvas.height = 500;
canvas.width = 1000;

var stars = [];
var times = Math.floor((Math.random() * 50) + 10);
while(times--) {
  ctx.fillStyle = "white";
  starX = Math.floor((Math.random() * 1000) + 1);
  starY = Math.floor((Math.random() * 1000) + 1);
  ctx.fillRect(starX,starY,3,3);
  
  ctx.fillRect(starX,starY - 15,3,9);
  ctx.fillRect(starX,starY + 9,3,9);
  ctx.fillRect(starX - 15,starY,9,3);
  ctx.fillRect(starX + 9,starY,9,3);
  
  stars.push([starX,starY,Math.floor((Math.random() * 10) + 1)]);
}

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
var i;
var currentStar;
function render() {
  ctx.clearRect(0,0,1000,1000);
  i = stars.length;
  while(i--) {
    currentStar = stars[i];
      ctx.fillRect(starX,starY,3,3);
  
      ctx.fillRect(starX,starY - 15,3,9);
      ctx.fillRect(starX,starY + 9,3,9);
      ctx.fillRect(starX - 15,starY,9,3);
      ctx.fillRect(starX + 9,starY,9,3);
  }
}

(function animloop(){
  requestAnimFrame(animloop);
  render();
})();

