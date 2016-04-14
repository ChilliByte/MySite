function Box(x,y,h,w) {
  this.x = x;
  this.y = y;
  this.h = h;
  this.w = w;
}

var kitchen = {};
var bedroom = {};
var livingRoom = {};
var bathroom = {};
var hallway = {};
var landing = {};
var driveway = {};

var mainStreet1 = {};
var mainStreet2 = {};
var mainStreet3 = {};
var sideAlley = {};

var clothesShop = {};
var doctors = {};
var arcade = {};
var restaurant = {};
var furnitureShop = {};

  
var worldMap = [
  [bedroom,landing,bathroom],
  [livingRoom,hallway,kitchen],
  [driveway,mainStreet1,mainStreet2,mainStreet3,sideAlley]
]
