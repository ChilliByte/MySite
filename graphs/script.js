function person(name,to,gen) {
	this.name = name;
	this.to = to;
	this.gender = gen;
}

var nodes = [];


var canvas = document.getElementById("graph");
var ctx = canvas.getContext("2d");
var h = window.innerHeight;
var w = window.innerWidth
canvas.height = h;
canvas.width = w;

ctx.font = "30px Arial";
ctx.fillText("Graphs",50,w/2);


