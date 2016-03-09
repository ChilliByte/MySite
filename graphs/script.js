function Person(name,to,male) {
	this.name = name;
	this.to = to;
	this.isMale = male;
}

function checkFigurate(n) {
	if (0.25*(1+ Math.sqrt((8*n)+1)) % 1 == 0) {
		return "Hexagonal";
	}
	if (((1 + Math.sqrt(24*n + 1))/6) % 1 == 0) {
		return "Pentagonal";
	}
	if(Math.sqrt((8*n)+1) % 1 == 0) {
		return "Triagular";
	}
	if(Math.sqrt(n) % 1 == 0) {
		return "Square";
	} 
	return "Random";
}

var nodes = [];
nodes.push(new Person("Sophie","Sam N",false));
nodes.push(new Person("Sam N","Chichi",true));
nodes.push(new Person("Chichi","Sanchita",false));
nodes.push(new Person("Sanchita","Shaza",false));
nodes.push(new Person("Shaza","Hal",false));
nodes.push(new Person("Hal","Sam W",true));
nodes.push(new Person("Sam W","Sophie",true));

nodes.push(new Person("Steven","Vani",true));
nodes.push(new Person("Vani","Mandeep",false));
/*nodes.push(new Person("Mandeep","Daisy",false));
nodes.push(new Person("Daisy","Hannah",false));
nodes.push(new Person("Hannah","Mahesh",false));
nodes.push(new Person("Mahesh","Aba",true));
nodes.push(new Person("Aba","Dom",false));
nodes.push(new Person("Dom","Benji",true));
nodes.push(new Person("Benji","Aurora",true));
nodes.push(new Person("Aurora","Priya",false));
nodes.push(new Person("Priya","George",false));
nodes.push(new Person("George","Kevin",true));
nodes.push(new Person("Kevin","Steven",true));
nodes.push(new Person("Deep","Lottie",true));
nodes.push(new Person("Lottie","Matt",false));
nodes.push(new Person("Matt","Deep",true));
*/
var numNodes = nodes.length;
var graphShape = checkFigurate(numNodes);

var canvas = document.getElementById("graph");
var ctx = canvas.getContext("2d");
var h = window.innerHeight;
var w = window.innerWidth
canvas.height = h;
canvas.width = w;

ctx.font = "30px Arial";
ctx.fillText("Graphs",50,3*h/4);

switch(graphShape) {
	case "Square" :
		var gridSize = Math.sqrt(numNodes);
		ctx.beginPath();
		ctx.fillStyle="#0055ff";
		j = 1;
		for(var i = 0; i < numNodes; i++) {
			console.log("I: " + i);
			console.log("J: " + j);
			console.log("X: " + (i%j)*(w/(gridSize+1)));
			console.log("Y: " + j*(w/(gridSize+1)));
			
			ctx.arc((i%j)*(w/(gridSize+1)),j*(w/(gridSize+1)),20,0,2*Math.PI);
			if (i == gridSize) {
				j++;
			}
		}
		ctx.fill();
		break;
}


