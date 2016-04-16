function Box(x,y,h,w) {
  this.x = x;
  this.y = y;
  this.h = h;
  this.w = w;
}
function SpecialBox(type,data,x,y,h,w) {
  this.x = x;
  this.y = y;
  this.h = h;
  this.w = w;
  this.type = type;
  this.data = data;
}

function Room(u,d,l,r) {
  this.boxes = [
    new Box(0,850,50,1600),
    new Box(-30,0,900,30),    
    new Box(1600,0,900,30),
  ];
  this.above = u;
  this.below = d;
  this.left  = l;
  this.right = r;
  this.specialBoxes = [];
}

var kitchen       = new Room(false, false, true, false);
var bedroom       = new Room(false, false, false, true);
var livingRoom    = new Room(false, false, false, true);
var bathroom      = new Room(false, false, true, false);
var hallway       = new Room(true,  false, true,  true);
var landing       = new Room(false, true , true,  true);
var driveway      = new Room(false, false, false, true);

var mainStreet1   = new Room(false, false, true,  true);
var mainStreet2   = new Room(false, false, true,  true);
var mainStreet3   = new Room(false, false, true,  true);
var sideAlley     = new Room(false, false, true, false);

var clothesShop   = new Room(false, true, false,  false);
var doctors       = new Room(false, true, false,  false);
var arcade        = new Room(false, true, false,  false);
var restaurant    = new Room(false, true, false,  false);
var furnitureShop = new Room(false, true, false,  false);
  
var worldMap = [
  [bedroom    , landing  , bathroom ],
  [livingRoom , hallway  , kitchen  ],
  [null       , null     , clothesShop, doctors       , arcade      , restaurant],
  [null       , driveway , mainStreet1, mainStreet2   , mainStreet3 , sideAlley ],
  [null       , null     , furnitureShop]
]

hallway.specialBoxes.push(new SpecialBox("door",{toX:1,toY:3},600,600,200,300));
driveway.specialBoxes.push(new SpecialBox("door",{toX:1,toY:1},200,600,200,300));
mainStreet1.specialBoxes.push(new SpecialBox("door",{toX:2,toY:2},400,600,200,300));
mainStreet1.specialBoxes.push(new SpecialBox("door",{toX:2,toY:4},1000,600,200,300));
mainStreet2.specialBoxes.push(new SpecialBox("door",{toX:3,toY:2},600,600,200,300));
mainStreet3.specialBoxes.push(new SpecialBox("door",{toX:4,toY:2},800,600,200,300));
sideAlley.specialBoxes.push(new SpecialBox("door",{toX:3,toY:2},700,600,200,300));
