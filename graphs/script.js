window.onload = function() {
	function Person(name,to,male) {
		this.name = name;
		this.to = to;
		this.isMale = male;
		this.x = 0;
		this.y = 0;
		this.velX = (0.5 - Math.random()*0.7);
		this.velY = (0.5 - Math.random()*0.7);
	}
	function checkFigurate(n) {
		/*if (0.25*(1+ Math.sqrt((8*n)+1)) % 1 == 0) {
			return "Hexagonal";
		}
		if (((1 + Math.sqrt(24*n + 1))/6) % 1 == 0) {
			return "Pentagonal";
		}*/
		if(Math.sqrt((8*n)+1) % 1 == 0) {
			return "Triangular";
		}
		if(Math.sqrt(n) % 1 == 0) {
			return "Square";
		} 
		return "Random";
	}
	function returnIndex(person) {
		for(var rICount = 0; rICount < numNodes; rICount++) {
			if(nodes[rICount].name == person) {
				return rICount;
			}
		}
	}
	var play = true;
	window.onclick = function() {
		play = !play
	}
	var nodes = [];
	nodes.push(new Person( "Sophie",   ["Sam N"]    , false ));
	nodes.push(new Person( "Sam N",    ["Chichi"]   , true  ));
	nodes.push(new Person( "Chichi",   ["Sanchita"] , false ));
	nodes.push(new Person( "Sanchita", ["Shaza"]    , false ));
	nodes.push(new Person( "Shaza",    ["Hal"]      , false ));
	nodes.push(new Person( "Hal",      ["Sam W"]    , true  ));
	nodes.push(new Person( "Sam W",    ["Sophie"]   , true  ));
	nodes.push(new Person( "Steven",   ["Vani"]     , true  ));
	nodes.push(new Person( "Vani",     ["Mandeep"]  , false ));
	nodes.push(new Person( "Mandeep",  ["Daisy"]    , false ));
	nodes.push(new Person( "Daisy",    ["Hannah"]   , false ));
	nodes.push(new Person( "Hannah",   ["Mahesh"]   , false ));
	nodes.push(new Person( "Mahesh",   ["Aba"]      , true  ));
	nodes.push(new Person( "Aba",      ["Dom"]      , false ));
	nodes.push(new Person( "Dom",      ["Benji"]    , true  ));
	nodes.push(new Person( "Benji",    ["Aurora"]   , true  ));
	nodes.push(new Person( "Aurora",   ["Priya"]    , false ));
	nodes.push(new Person( "Priya",    ["George"]   , false ));
	nodes.push(new Person( "George",   ["Kevin"]    , true  ));
	nodes.push(new Person( "Kevin",    ["Steven"]   , true  ));
	nodes.push(new Person( "Deep",     ["Lottie"]   , true  ));
	nodes.push(new Person( "Lottie",   ["Matt"]     , false ));
	nodes.push(new Person( "Matt",     ["Deep"]     , true  ));
	
	var numNodes = nodes.length;
	var graphShape = checkFigurate(numNodes);
	
	var canvas = document.getElementById("graph");
	var ctx = canvas.getContext("2d");
	var x,y,to;
	var h = window.innerHeight;
	var w = window.innerWidth
	var radius = 10;
	var blue = "#0055ff";
	var pink = "#ff0055";
	canvas.height = h;
	canvas.width = w;
	
	switch(graphShape) {
		case "Square" :
			var gridSize = Math.sqrt(numNodes);
			c = 0;
			for(var i = 0; i < gridSize; i++) {
				for(var j = 0; j < gridSize; j++) {
					ctx.beginPath();
					if(nodes[c].isMale) {
						ctx.fillStyle=blue;
					} else {
						ctx.fillStyle=pink;
					}
					x = (i+1)*(w/(gridSize+1));
					y = (j+1)*(h/(gridSize+1))
					nodes[c].x = x;
					nodes[c].y = y;
					ctx.arc(x,y,radius,0,2*Math.PI);
					ctx.fill();
					ctx.font = "12px Calibri";
					ctx.fillText(nodes[c].name,x - 4,y + 22);
					c++;
				}
			}
			break;
		case "Random" :
			var gridSize = Math.ceil(Math.sqrt(numNodes));
			c = 0;
			for(var i = 0; i < gridSize; i++) {
				for(var j = 0; j < gridSize; j++) {
					if (nodes[c] !== undefined) {
						ctx.beginPath();
						if(nodes[c].isMale) {
							ctx.fillStyle=blue;
						} else {
							ctx.fillStyle=pink;
						}
						x = 0.9*(0.75+(0.5*Math.random()))*(i+1)*(w/(gridSize+1));
						y = 0.9*(0.75+(0.5*Math.random()))*(j+1)*(h/(gridSize+1))
						nodes[c].x = x;
						nodes[c].y = y;
						ctx.arc(x,y,radius,0,2*Math.PI);
						ctx.fill();
						ctx.font = "12px Calibri";
						ctx.fillText(nodes[c].name,x - 4,y + 22);
						c++;
					}
				}
			}
			break;
		case "Triangular" :
			x1=-1/2+Math.pow(1 + (-4*(-2*numNodes)),0.5)/2;
			x2=-1/2-Math.pow(1 + (-4*(-2*numNodes)),0.5)/2;
			var rows = Math.max(x1,x2);
			cols = 1;
			c = 0
			for(var i = 0; i < rows; i++) {
				for(var j = 0; j < cols; j++) {
					ctx.beginPath();
					if(nodes[c].isMale) {
						ctx.fillStyle=blue;
					} else {
						ctx.fillStyle=pink;
					}
					x = 0.9*(j+1)*(w/(cols+1))+30;
					y = (i+1)*(h/(rows+1))-30
					nodes[c].x = x;
					nodes[c].y = y;
					ctx.arc(x,y,radius,0,2*Math.PI);
					ctx.fill();
					ctx.font = "12px Calibri";
					ctx.fillText(nodes[c].name,x - 4,y + 22);
					c++;
				}
				cols++
			}
			break;
	}
	for (var i = 0; i < numNodes; i++) {
		var hoverDiv = document.createElement("div");
		hoverDiv.setAttribute("id",nodes[i].name);
		hoverDiv.setAttribute("class","hoverdiv");
		hoverDiv.setAttribute("style","left: " + (nodes[i].x - 25) + "px; top: " + (nodes[i].y - 25) + "px;");
		document.body.appendChild(hoverDiv);
		var nav = document.createElement("nav");
		nav.setAttribute("style","left: " + (nodes[i].x - 25) + "px; top: " + (nodes[i].y - 25) + "px;");
		nav.appendChild(document.createTextNode(nodes[i].name + " sent " + nodes[i].to + " a gift!"));
		document.body.appendChild(nav); 
	}
	
	function render() {
		ctx.clearRect(0,0,w,h)
		for(var i = 0; i < numNodes; i++) {
			if(nodes[i].isMale) {
				ctx.strokeStyle = blue;
				ctx.fillStyle = blue;
			} else {
				ctx.strokeStyle = pink;
				ctx.fillStyle = pink;
			}
			ctx.beginPath();	
			ctx.arc(nodes[i].x,nodes[i].y,radius,0,2*Math.PI);
			ctx.fill();
			ctx.font = "12px Calibri";
			ctx.fillText(nodes[i].name,nodes[i].x - 4,nodes[i].y + 22);
			
			nodesToLen = nodes[i].to.length;
			for(var j = 0; j < nodesToLen; j++) {
				to = nodes[returnIndex(nodes[i].to[j])];
				ctx.beginPath();
				ctx.moveTo(nodes[i].x, nodes[i].y);
				ctx.lineTo(to.x,to.y);
				ctx.stroke();
			}
			if((nodes[i].x > w) || (nodes[i].x < 0)) {
				nodes[i].velX*=-1;
			}
			if((nodes[i].y > h) || (nodes[i].y < 0)) {
				nodes[i].velY*=-1;
			}
			if (play) {
				nodes[i].x += nodes[i].velX;	
				nodes[i].y += nodes[i].velY;
				document.getElementById(nodes[i].name).style = "left: " + (nodes[i].x - 25) + "px; top: " + (nodes[i].y - 25) + "px;";
				document.querySelector("#"+nodes[i].name + " + nav").style = "left: " + nodes[i].x + "px; top: " + nodes[i].y + "px;";
			}
		}
	}
	window.requestAnimFrame = (function(){
	  return  window.requestAnimationFrame       ||
	          window.webkitRequestAnimationFrame ||
	          window.mozRequestAnimationFrame    ||
	          function( callback ){
	            window.setTimeout(callback, 1000 / 60);
	          };
	})();
	
	(function animloop(){
	  requestAnimFrame(animloop);
	  render();
	})();
}
