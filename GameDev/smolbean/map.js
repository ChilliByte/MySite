function Box(x,y,h,w) {
  this.x = x;
  this.y = y;
  this.h = h;
  this.w = w;
}
function SpecialBox(type,x,y,h,w) {
  this.x = x;
  this.y = y;
  this.h = h;
  this.w = w;
  this.type = type;
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
var hallway       = new Room(true,  true, true,  true);
var landing       = new Room(false, true , true,  true);
var driveway      = new Room(true, false, false, true);

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
  [bedroom,landing,bathroom],
  [livingRoom,hallway,kitchen],
  [null,driveway,mainStreet1,mainStreet2,mainStreet3,sideAlley]
]
