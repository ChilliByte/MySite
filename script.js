var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var times = Math.floor((Math.random() * 1000) + 50);
canvas.width = 1000;
canvas.width = 1000;
while(times--) {
  ctx.fillStyle = "white";
  ctx.fillRect(Math.floor((Math.random() * 1000) + 1),Math.floor((Math.random() * 1000) + 1),5,5);
}