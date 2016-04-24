var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext("2d");
var h = window.innerHeight - 10
var w = window.innerWidth - 10
var particleCount = 80;
var particles = [];
canvas.height = h;
canvas.width = w;
var origin = {
	x: w/2,
	y: h/2
}
//Gravitational Constant, increase to strengthen gravity
var bigG = 0.025;

function Particle(x,y,mass) {
	this.x = x;
	this.y = y;
	this.mass = mass;
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

function getDistanceSquared(p1,p2) {
	return ((p2.y-p1.y)*(p2.y-p1.y)) + ((p2.x-p1.x)*(p2.x-p1.x));
}
function getGravitationalForce(p1,p2) {
	r2 = getDistanceSquared(p1,p2);
	force = bigG * ((p1.mass*p2.mass)/r2)
	//Newtons Law of Gravitation: F=G * (m1m1/r2)
	return force;
}

function getNetPull(p1) {

	
}

var i = particleCount;
while(i--) {
	x = randInt(10,w-10);
	y = randInt(10,h-10);
	m = randInt(1,4);
	particles.push(new Particle(x,y,m));
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
