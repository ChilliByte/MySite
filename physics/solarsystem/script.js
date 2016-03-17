var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext("2d");
var h = window.innerHeight - 10
var w = window.innerWidth - 10
var particleCount = 20;
var particles = [];
canvas.height = h;
canvas.width = w;
var origin = {
	x: w/2,
	y: h/2
}
//Gravitational Constant, increase to strengthen gravity
var bigG = 0.025;

function Particle(x,y,mass,angle,vel,comp) {
	this.x = x;
	this.y = y;
	this.mass = mass;
	this.angle = angle;
	this.vel = vel;
	this.cX = comp.x;
	this.cY = comp.y;
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

function getBearing(p1,p2) {
	//Returns an angle relative to the +ve x axis
	dx = p2.x - p1.x;
	dy = p2.y - p1.y;
	theta = toDegrees(Math.atan2(dy,dx));
	if(theta < 0) {
		theta = 360 + theta;
	}
	return theta;
}

function getComponentVectors(bearing,vel) {
	//Splits a vector into its X and Y components
	cX = vel * Math.sin(toRadians(bearing % 90));
	cY = vel * Math.cos(toRadians(bearing % 90));
	temp = 0
	if((bearing >= 90) && (bearing < 180)) {
		temp = cY;
		cY = cX;
		cX = -1*temp;
	}
	if((bearing >= 180) && (bearing < 270)) {
		cX *= -1;
		cY *= -1;
	}
	if((bearing >= 270) && (bearing < 360)) {
		temp = cY;
		cY = -1*cX;
		cX = temp;
	}
	return {x:cX,y:cY};
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
	var i = particleCount;
	while(i--) {
		if(p1 != particles[i]) {
			cObj = getComponentVectors(getBearing(p1,particles[i]),getGravitationalForce(p1,particles[i])/p1.mass);
			p1.cX += cObj.x;
			p1.cY -= cObj.y;
			//adds up all of the horizonal and vertical forces acting on the particle
		}
	}

	angMom = getComponentVectors(getBearing(origin,p1),0.001 * (1/Math.sqrt(getDistanceSquared(origin,p1))));
	p1.cX += angMom.x;
	p1.cY += angMom.y;
}

var i = particleCount;
while(i--) {
	x = randInt(10,w-10);
	y = randInt(10,h-10);
	angle = getBearing(origin,{x:x,y:y})
	vel = 0.001 * Math.sqrt(getDistanceSquared(origin,{x:x,y:y}));
	particles.push(new Particle(x,y,randInt(1,5),angle,vel,getComponentVectors(angle,vel)));
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
		particles[i].x += particles[i].cX;
		particles[i].y += particles[i].cY;
		getNetPull(particles[i]);
	}

}

(function animloop(){
	requestAnimFrame(animloop);
	render();
})();
