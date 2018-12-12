//Backend Variables
var canvas,ctx;
var world = [];
var players = [];
var currentPlayer = 0;
var currentObject = null;
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
	    this.img = new Image();
		this.img.src = "images/Base.png";
		this.objects = [];
	}
	
	capture(tile) {
		if (tile.contents == null) {
			tile.owner = players[this.playerID];
			this.tiles.push(tile);
		}
	}
	
	spawn(object,x,y) {
		if(world[y][x].owner == this) {
			world[y][x].contents = object;
			this.objects.push(object);
		}
	}
}

class Tile {
	constructor(x,y) {
		this.x = x;
		this.y = y;
		this.height = 1;
		this.contents = null;
		this.owner = null;	
	}
}

class Object {
	constructor(x,y,owner,rank) {
		this.x = x;
		this.y = y;
		this.owner = owner;
		this.rank = rank;
		this.ips = 0;
		this.cps = 0;
		this.img = new Image();
	}
	
	draw() {
		ctx.drawImage(this.img, this.x*TILE_WIDTH, this.y*TILE_WIDTH, TILE_WIDTH, TILE_WIDTH);
	}
}

class Unit extends Object {
	constructor(x,y,owner,rank) {
		super(x,y,owner,rank);
		this.img.src = "images/Unit" + rank + ".png";
	}
}

class Farm extends Object {
	constructor(x,y,owner,rank) {
		super(x,y,owner,rank);
		this.ips = 5 * rank;
		this.img.src = "images/Farm" + rank + ".png";
	}
}

class Barracks extends Object {
	constructor(x,y,owner,rank) {
		super(x,y,owner,rank);
		this.cps = 2 * rank;
		this.img.src = "images/Barracks" + rank + ".png";
	}
}

window.onload = function() {
	canvas = document.getElementById("gameCanvas");
	ctx = canvas.getContext("2d");
	canvas.height = 1000;
	canvas.width = 1000;
	ctx.imageSmoothingEnabled = false;
	canvas.addEventListener("click", getCursorPosition);
}

function play() {
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
	document.getElementsByTagName("nav")[0].style.display = "none";
	render()
}

function gameLoop() {
	
	currentPlayer += 1
	if (currentPlayer == players.length) {
		currentPlayer = 0;
	}
	render();
}

function render() {
	for(var j = 0; j < WORLD_SIZE; j++) {
		for(var i = 0; i < WORLD_SIZE; i++) {
			var currentTile = world[j][i];
			if(currentTile.height < 0) {
				ctx.fillStyle = "hsl(240,100%,50%)";
			}
			if(currentTile.height > 0) {
				ctx.fillStyle = "hsl(128,100%,50%)";
			}
			
			if(currentTile.contents !== null) {
				currentTile.contents.draw();
			}
			
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

function getCursorPosition(event) {
    var rect = canvas.getBoundingClientRect();
	var canv = window.getComputedStyle(canvas);
    var x = ((event.clientX - rect.left)/parseFloat(canv.width))*1000;
    var y = ((event.clientY - rect.top)/parseFloat(canv.height))*1000;;
    console.log("x: " + x + " y: " + y);
	var tX = Math.floor((x*WORLD_SIZE)/1000);
	var tY = Math.floor((y*WORLD_SIZE)/1000);
	console.log("x: " + tX + " y: " + tY);
	gameLoop();
}

function randomInt(min,max) {
	return Math.floor((Math.random() * (max-min)) + min);
}

function randomColour() {
	return "rgb(" + randomInt(0,255) + "," + randomInt(0,255) + "," + randomInt(0,255) + ")";
}