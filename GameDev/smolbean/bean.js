var svg,player;
function Bean(color,eyecol,name) {
  this.x = 10;
  this.y = 10;
  this.w = 170;
  this.h = 170;
  this.velX = 0;
  this.velY = 0;
  this.name = name;
  this.color = color;
  this.eyecolor = eyecol
  this.fun = 100;
  this.food = 100;
  this.water = 100;
  this.health = 100;
  this.social = 100;
  this.love = 100;
  this.sleep = 100;
  this.clean = 100;
  this.state = "Content";
}
var outline = new Path2D("m9,92c-8,-46.72376 1.0663,-91 53,-91c51.9337,0 19,83.13812 61,82c42,-1.13812 21.98343,61.61188 11.47514,73.14641c-10.50829,11.53453 -31.50829,12.85359 -57.47514,12.85359c-51.9337,0 -60,-30.27624 -68,-77z");
var mouth = new Path2D("m50.25,91.98459c0,-8.29581 6.71271,-4.35229 15,-4.35229c8.28729,0 15,-3.94351 15,4.35229c0,8.29581 -6.71271,15.01541 -15,15.01541c-8.28729,0 -15,-6.7196 -15,-15.01541z");
function drawBean(bean) {
  beanPath = new Path2D().moveTo(player.x,player.y).addPath(outline);
  ctx.fillStyle = player.color;
  ctx.fill(beanPath);
  ctx.stroke(beanPath);
  beanPath = new Path2D().moveTo(player.x,player.y).addPath(mouth);
  ctx.fillStyle = "#f33";
  ctx.stroke(mouth);
  ctx.fill(mouth);
  ctx.fillStyle = player.eyecolor;
  ctx.lineWidth = 1.5;
  ctx.strokeStyle = "#FFFFFF";
  ctx.beginPath();
  ctx.arc(player.x + 46.5,player.y + 72.5,7,0,2*Math.PI);
  ctx.arc(player.x + 71.5,player.y + 68,7,0,2*Math.PI);
  ctx.stroke();
  ctx.fill();
}
