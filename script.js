var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

var stars = [];
var times = Math.floor((Math.random() * 30) + 10);
while(times--) {
  ctx.fillStyle = "white";
  starX = Math.floor((Math.random() * window.innerWidth - 33) + 33);
  starY = Math.floor((Math.random() * window.innerHeight - 33) + 33);
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
      ctx.fillRect(currentStar[0],currentStar[1],3,3);
  
      ctx.fillRect(currentStar[0],currentStar[1] - 15,3,9);
      ctx.fillRect(currentStar[0],currentStar[1] + 9,3,9);
      ctx.fillRect(currentStar[0] - 15,currentStar[1],9,3);
      ctx.fillRect(currentStar[0] + 9,currentStar[1],9,3);
      
  }
}

(function animloop(){
  requestAnimFrame(animloop);
  render();
})();

