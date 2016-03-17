var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext("2d");
var h = window.innerHeight - 10
var w = window.innerWidth - 10
var particleCount = 100;
var particles = [];
canvas.height = h;
canvas.width = w;
origin = {
	x: w/2,
	y: h/2
}
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
	//Returns an angle relative to the horizontal
	dx = p2.x - p1.x;
	dy = p1.y - p2.y;
	cosTheta = dx/((dx*dx)+(dy*dy));
	theta = toDegrees(Math.acos(cosTheta));
	return theta;
}

var i = particleCount;
while(i--) {
	x = randInt(10,w-10);
	y = randInt(10,h-10);
	angle = getAngle(origin,{x:x,y:y})
	if((x > origin.x) && (y < origin.y)) {
		angle = 90-angle;
	}
	if((x > origin.x) && (y > origin.y)) {
		angle = 90+angle;
	}
	if((x < origin.x) && (y < origin.y)) {
		angle = 270 + angle;
	}
	if((x < origin.x) && (y > origin.y)) {
		angle = 270 - angle;
	}
		
	particles.push(new Particle(x,y,randInt(1,4),angle,Math.random()));
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
	ctx.clearRect(0,0,w,h)
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
