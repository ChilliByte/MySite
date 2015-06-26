var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var times = Math.floor((Math.random() * 50) + 10);
canvas.height = 500;
canvas.width = 1000;
while(times--) {
  ctx.fillStyle = "white";
  starX = Math.floor((Math.random() * 1000) + 1);
  starY = Math.floor((Math.random() * 1000) + 1);
  ctx.fillRect(starX,starY,3,3);
  
  ctx.fillRect(starX,starY - 12,3,9);
  ctx.fillRect(starX,starY + 12,3,9);
  ctx.fillRect(starX - 12,starY,9,3);
  ctx.fillRect(starX + 12,starY,9,3);
  
}
