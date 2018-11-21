//Backend Variables
var canvas,ctx;
var world = [];
var players = [];
var currentPlayer = 0;
var maxHeight,minHeight;

//Game Variables
var WORLD_SIZE = 50;
var NUMBER_OF_PLAYERS = 2;
var TILE_WIDTH = 1000/WORLD_SIZE;
var NOISE_LEVEL = 10 + randomInt(0,240)

//Constructors
class Player {
	constructor(x,y,id,ai) {
		this.x = x;
		this.y = y;
		this.playerID = id;
		this.ai = ai;
		this.income = 0;
		this.money = 30;
		this.colour = randomColour();
		this.tiles = [world[y][x]];
	}
	
	capture(tile) {
		if (tile.building == null) {
			tile.owner = players[this.playerID];
		}
	}
}

class Tile {
	constructor(x,y) {
		this.x = x;
		this.y = y;
		this.height = 1;
		this.terrain = "FLAT";
		this.building = null;
		this.owner = null;	
	}
}

class Unit {
	constructor(x,y,owner) {
		this.x = x;
		this.y = y;
		this.owner = owner;
	}
}

window.onload = function() {
	console.log("loaded!");
	canvas = document.getElementById("gameCanvas");
	ctx = canvas.getContext("2d");
	canvas.height = 1000;
	canvas.width = 1000;
	init();
	setInterval(render,100);
}

function init() {
	//Populate World Array
	for(var j = 0; j < WORLD_SIZE; j++) {
		world[j] = [];
		for(var i = 0; i < WORLD_SIZE; i++) {
			world[j][i] = new Tile(i,j);
		}
	}
	generateTerrain();
	//Create Players
	var coord = genCoordWithinDistance(WORLD_SIZE/2,WORLD_SIZE/2,WORLD_SIZE/2)
	while(world[coord[1]][coord[0]].height < 0) {
		coord = genCoordWithinBounds(coord[0],coord[1],WORLD_SIZE/(2*NUMBER_OF_PLAYERS),WORLD_SIZE/2);
	}
	for(var i = 0; i < NUMBER_OF_PLAYERS; i++) {
		players[i] = new Player(coord[0],coord[1],i,false);
		players[i].capture(world[players[i].y][players[i].x]);
		coord = genCoordWithinBounds(coord[0],coord[1],WORLD_SIZE/(2*NUMBER_OF_PLAYERS),WORLD_SIZE/2);
		while(world[coord[1]][coord[0]].height < 0) {
			coord = genCoordWithinBounds(coord[0],coord[1],WORLD_SIZE/(2*NUMBER_OF_PLAYERS),WORLD_SIZE/2);
		}
	}
}

function render() {
	for(var j = 0; j < WORLD_SIZE; j++) {
		for(var i = 0; i < WORLD_SIZE; i++) {
			var currentTile = world[j][i];
			if(currentTile.height < 0) {
				ctx.fillStyle = "hsl(240,100%," + parseInt(50-(50*(currentTile.height/minHeight))) + "%)";
			}
			if(currentTile.height > 0) {
				ctx.fillStyle = "hsl(128,100%," + parseInt(50+(50*(currentTile.height/maxHeight))) + "%)";
			}
			/*if (currentTile.height < 0) {
				ctx.fillStyle = "#0350FF";
			} else if (currentTile.height > 10) {
				ctx.fillStyle = "#0D161D";
			} else {
				ctx.fillStyle = "#58F03F";
			}*/
			
			ctx.fillRect(i*TILE_WIDTH,j*TILE_WIDTH,TILE_WIDTH,TILE_WIDTH);
			ctx.stokeStyle = "#555555";
			ctx.strokeRect(i*TILE_WIDTH,j*TILE_WIDTH,TILE_WIDTH,TILE_WIDTH);
			if(currentTile.owner !== null) {
				ctx.fillStyle = currentTile.owner.colour;
				ctx.fillRect((i*TILE_WIDTH)+5,(j*TILE_WIDTH)+5,TILE_WIDTH-10,TILE_WIDTH-10);
			}
		}
	}
}

//Terrain Generation
function generateTerrain() {
	//Set the four edges of the world to be underwater
		world[0][0].height = randomInt(-10,0);
		world[WORLD_SIZE-1][WORLD_SIZE-1].height = randomInt(-10,0);
		world[WORLD_SIZE - 1][0].height = randomInt(-10,0);
		world[0][WORLD_SIZE - 1].height = randomInt(-10,0);
		world[WORLD_SIZE/2][WORLD_SIZE/2].height = 1000
	//Generate a random number of hills
	var HILL_COUNT = 20;
	var coord = genCoordWithinDistance(WORLD_SIZE/2,WORLD_SIZE/2,WORLD_SIZE/2)
	for (var i = 0; i < HILL_COUNT; i++) {
		world[coord[1]][coord[0]].height = randomInt(500,1000);
		//Hills should be clustered together
		coord = genCoordWithinDistance(coord[0],coord[1],WORLD_SIZE/(HILL_COUNT));
	}
	
	//Generate a random number of hills
	var HILL_COUNT = 20;
	var coord = genCoordWithinDistance(WORLD_SIZE/2,WORLD_SIZE/2,WORLD_SIZE/2)
	for (var i = 0; i < HILL_COUNT; i++) {
		world[coord[1]][coord[0]].height = randomInt(500,1000);
		//Hills should be clustered together
		coord = genCoordWithinDistance(coord[0],coord[1],WORLD_SIZE/(HILL_COUNT));
	}
	
	//interpolation x
	for (var j = 0; j < WORLD_SIZE; j++) {
		var segments = [[0,world[j][0].height]];
		//Create a list of significant heights
		for (var i = 1; i < WORLD_SIZE; i++) {
				if (Math.abs(world[j][i].height - segments[segments.length-1][1]) > NOISE_LEVEL) {
					segments.push([i,world[j][i].height]);
				}
		}
		
		segments.push([WORLD_SIZE-1,world[j][WORLD_SIZE-1].height]);
		console.log(segments);
		var heights = linearInterpolate(segments,WORLD_SIZE);
		for (var i = 1; i < WORLD_SIZE; i++) {
			world[j][i].height = heights[i][1];
		}
	}
	
	for (var j = 0; j < WORLD_SIZE; j++) {
		var segments = [[0,world[0][j].height]];
		//Create a list of significant heights
		for (var i = 1; i < WORLD_SIZE; i++) {
				if (Math.abs(world[i][j].height - segments[segments.length-1][1]) > NOISE_LEVEL) {
					segments.push([i,world[i][j].height]);
				}
		}
		
		segments.push([WORLD_SIZE-1,world[WORLD_SIZE-1][j].height]);
		var heights = linearInterpolate(segments,WORLD_SIZE);
		for (var i = 1; i < WORLD_SIZE; i++) {
			world[i][j].height = heights[i][1];
		}
	}
	
	
	findMaxAndMin();
}


//Ancillary Functions
function linearInterpolate(points,count) {
	var interpolated = [];
	for (var i = 0; i < points.length-1; i++) {
		var start = points[i][0];
		var end = points[i+1][0];
		var span = end-start;
		var startHeight = points[i][1];
		var endHeight = points[i+1][1];
		var dy = endHeight-startHeight;
		interpolated.push(points[i]);
		for (var j = start; j < end; j++) {
			interpolated.push([j,startHeight + ((j-start)/span)*dy]);
		}
	}
	interpolated.push(points[count-1]);
	return interpolated;
}

function findMaxAndMin() {
	maxHeight = 0,minHeight = -1;
	for(var j = 0; j < WORLD_SIZE; j++) {
		for(var i = 0; i < WORLD_SIZE; i++) {
			if (world[j][i].height > maxHeight) {
				maxHeight = world[j][i].height;
			}
			if (world[j][i].height < minHeight) {
				minHeight = world[j][i].height;
			}
		}
	}
	
}
//Gen a coord at least `distance` away
function genCoordByDistance(x,y,distance) {
	return genCoordWithinBounds(x,y,distance,Infinity);
	}

//Gen a coord within `distance` radially
function genCoordWithinDistance(x,y,distance) {
	return genCoordWithinBounds(x,y,0,distance);
}

//Generate a coord between min distance and max distance
function genCoordWithinBounds(x,y,min,max) {
	var i = randomInt(0,WORLD_SIZE - 1),j = randomInt(0,WORLD_SIZE - 1);
	while (Math.sqrt((y-j)*(y-j) + (x-i)*(x-i)) > max) {
		i = randomInt(0,WORLD_SIZE);
		j = randomInt(0,WORLD_SIZE);
	}
	while (Math.sqrt((y-j)*(y-j) + (x-i)*(x-i)) < min) {
		i = randomInt(0,WORLD_SIZE);
		j = randomInt(0,WORLD_SIZE);
	}
	return [i,j]
}

function randomInt(min,max) {
	return Math.floor((Math.random() * (max-min)) + min);
}

function randomColour() {
	return "rgb(" + randomInt(0,255) + "," + randomInt(0,255) + "," + randomInt(0,255) + ")";
}