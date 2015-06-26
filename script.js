var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;


/* OLD NIGHT IDEA
//STARS
var stars = [];
var times = Math.floor((Math.random() * 30) + 10);
while(times--) {
  ctx.fillStyle = "white";
  starX = Math.floor((Math.random() * window.innerWidth - 33) + 33);
  starY = Math.floor((Math.random() * 4*(window.innerHeight/5) - 33) + 33);
  ctx.fillRect(starX,starY,3,3);
  
  stars.push([starX,starY,Math.floor((Math.random() * 100) + 1)]);
  
}

function terrain(x,type) {
    var points = [],
    i = canvas.width;
    offset = window.innerHeight/4 + Math.floor((Math.random() * 50) + 10);
    while(i--) {
      if (type == "sin") {
          points.push(4*x/5 + (Math.sin(i/200) * offset));
      } else {
          points.push(4*x/5 + (Math.cos(i/200) * offset));
      }
    }
    return points;
}

var foreTerPoints = terrain(3.99*window.innerHeight/4 - 100,"sin");
var bgTerPoints = terrain(window.innerHeight/1,"cos");

//MOON
var moonX = window.innerWidth - 250;
var moonY = window.innerHeight/2;

window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame       ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame    ||
          function( callback ){
            window.setTimeout(callback, 1000 / 60);
          };
})();


var i;
var currentStar;
var forePos = 1;
var bgPos = 1;
function render() {
  ctx.clearRect(0,0,canvas.width,canvas.height);
  
  //STARS
  i = stars.length;
  ctx.fillStyle = "white";
  while(i--) {
    currentStar = stars[i];
      ctx.fillRect(currentStar[0]-(currentStar[2]/50),currentStar[1]-(currentStar[2]/50),currentStar[2]/25,currentStar[2]/25);
      currentStar[2]++;
      if(currentStar[2] >= 100) {
        currentStar[2] = 0;
      }
  }

  //MOON
  ctx.fillStyle="#d5d5d9";
  ctx.fillRect(moonX,moonY,100,100);
  ctx.fillStyle="#999999";
  ctx.fillRect(moonX     , moonY + 20 ,10,30); //Strip on left
  ctx.fillRect(moonX + 10, moonY + 30 ,20,40); //Big Square at center left
  ctx.fillRect(moonX + 20, moonY + 50 ,20,30); //Medium Square at lower left
  ctx.fillRect(moonX + 20, moonY + 20 ,20,20); //Medium Square, upper center
  ctx.fillRect(moonX + 30, moonY + 50 ,20,10); 
  ctx.fillRect(moonX + 40, moonY + 40 ,20,10);
  ctx.fillRect(moonX + 55, moonY + 25 ,15,15); //center top square
  ctx.fillRect(moonX + 70, moonY + 40 ,20,10); //Right side of moon
  ctx.fillRect(moonX + 80, moonY + 50 ,10,20); //Lower right side of moon
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(moonX + 30, moonY + 40 ,10,10); //Small central crater
  ctx.fillRect(moonX + 40, moonY + 70 ,20,20); //Lower large on moon
  
  //TERRAIN
  ctx.fillStyle = "#333355";
  for (var t = 1; t < bgTerPoints.length; t++) {
      ctx.fillRect(t,bgTerPoints[t],1,1000)
  }

  ctx.fillStyle = "black";
  ctx.moveTo(0, foreTerPoints[0]);
  for (var t = 1; t < foreTerPoints.length; t++) {
          ctx.fillRect(t,foreTerPoints[t],1,1000)
  }
}

//START Animation
(function animloop(){
  requestAnimFrame(animloop);
  render();
})();
*/
