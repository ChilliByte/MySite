var nodes = [];
function Person(name,to,male) {
	this.name = name;
	this.to = to;
	this.isMale = male;
	this.x = 0;
	this.y = 0;
	this.velX = (0.5 - Math.random()*0.7);
	this.velY = (0.5 - Math.random()*0.7);
}

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
