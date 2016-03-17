var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext("2d");
var h = window.innerHeight - 10
var w = window.innerWidth - 10
var particleCount = 100;
var particles = [];
canvas.height = h;
canvas.width = w;

function Particle(x,y,mass,angle,vel) {
	this.x = x;
	this.y = y;
	this.mass = mass;
	this.angle = angle;
	this.vel = vel;
}

function toDegrees (angle) {
	return angle * (180 / Math.PI);
}

function toRadians (angle) {
	return angle * (Math.PI / 180);
}

function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getAngle(p1,p2) {
	dx = p2.x - p1.x;
	dy = p2.y - p1.y;
	length = Math.sqrt((dx * dx) + (dy * dy));
	cosTheta = ((length * length) + (dx * dx) - (dy * dy)) / (2 * length * dx)
	theta = toDegrees(Math.acos(cosTheta));
	if (dy < 0) {
		theta = 360 - theta;
	}
}

var i = particleCount;
while(i--) {
	particles.push(new Particle(randInt(10,w-10),randInt(10,h-10),randInt(1,4),randInt(0,359),Math.random()))
}

// shim layer with setTimeout fallback
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

function render() {
	ctx.fillStyle = "grey";
	var i = particleCount;
	while(i--) {
		ctx.beginPath();
		ctx.arc(particles[i].x,particles[i].y,particles[i].mass,0,2*Math.PI);
		ctx.fill();	
	}

}

(function animloop(){
	requestAnimFrame(animloop);
	render();
})();
