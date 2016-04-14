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

function Room() {
  this.boxes = [];
  this.specialBoxes = [];
}

var kitchen = new Room();
var bedroom = new Room();
var livingRoom = new Room();
var bathroom = new Room();
var hallway = new Room();
var landing = new Room();
var driveway = new Room();

var mainStreet1 = new Room();
var mainStreet2 = new Room();
var mainStreet3 = new Room();
var sideAlley = new Room();

var clothesShop = new Room();
var doctors = new Room();
var arcade = new Room();
var restaurant = new Room();
var furnitureShop = new Room();
  
var worldMap = [
  [bedroom,landing,bathroom],
  [livingRoom,hallway,kitchen],
  [driveway,mainStreet1,mainStreet2,mainStreet3,sideAlley]
]
