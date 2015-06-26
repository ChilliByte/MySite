var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

var stars = [];
var times = Math.floor((Math.random() * 30) + 10);
while(times--) {
  ctx.fillStyle = "white";
  starX = Math.floor((Math.random() * window.innerWidth - 33) + 33);
  starY = Math.floor((Math.random() * window.innerHeight/2 - 33) + 33);
  ctx.fillRect(starX,starY,3,3);
  
  stars.push([starX,starY,Math.floor((Math.random() * 10) + 1)]);
  
}

function terrain(width, height, displace, roughness) {
    var points = [],
        // Gives us a power of 2 based on our width
        power = Math.pow(2, Math.ceil(Math.log(width) / (Math.log(2))));

    // Set the initial left point
    points[0] = height / 2 + (Math.random() * displace * 2) - displace;
    // set the initial right point
    points[power] = height / 2 + (Math.random() * displace * 2) - displace;
    displace *= roughness;

    // Increase the number of segments
    for (var i = 1; i < power; i *= 2) {
        // Iterate through each segment calculating the center point
        for (var j = (power / i) / 2; j < power; j += power / i) {
            points[j] = ((points[j - (power / i) / 2] + points[j + (power / i) / 2]) / 2);
            points[j] += (Math.random() * displace * 2) - displace
        }
        // reduce our random range
        displace *= roughness;
    }
    return points;
}

var terPoints = terrain(canvas.width, canvas.height, canvas.height / 8, 0.4);

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
      ctx.fillRect(currentStar[0],currentStar[1],currentStar[2]/10,currentStar[2]/10);
      currentStar[2]++;
      if(currentStar[2] == 40) {
        currentStar[2] = 0;
      }
  }
    // draw the points
  ctx.beginPath();
  ctx.moveTo(0, terPoints[0]);
  for (var t = 1; t < terPoints.length; t++) {
      ctx.lineTo(t, terPoints[t]);
  }
  // finish creating the rect so we can fill it
  ctx.lineTo(canvas.width, canvas.height);
  ctx.lineTo(0, canvas.height);
  ctx.closePath();
  ctx.fill();

}

(function animloop(){
  requestAnimFrame(animloop);
  render();
})();

