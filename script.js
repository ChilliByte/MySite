var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var times = Math.floor((Math.random() * 100) + 1);
while(times--) {
  ctx.fillStyle = "white";
  ctx.fillRect(Math.floor((Math.random() * 100) + 1),Math.floor((Math.random() * 100) + 1),5,5);
}
