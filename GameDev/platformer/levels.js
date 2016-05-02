//Begin Levels
levels = [];

function level(w) {
    this.boxes = [];
    this.water = [];
    this.ice = [];
    this.switches = [];
    this.doors = [];
    this.mobs = [];
    this.collectibles = [];
    this.projectiles = [];
    this.crates = [];
    this.width = w*units;
    this.offset = 0;
    levels.push(this)
}

function Box(x,y,h,w,e) {
    this.x = x*units;
    this.y = y*units;
    this.height = h*units;
    this.width = w*units;
    if(e != undefined) {
        this.waterEdge = true;
    }
}

function Collectible(x,y,w,h,t) {
    this.x = x*units;
    this.y = y*units;
    this.height = h*units;
    this.width = w*units;
    this.type = t;
    this.collected = false;
}

function Mob(x,y,w,h,s,t,x1,x2) {
    this.x = x*units;
    this.y = y*units;
    this.width = w*units;
    this.height = h*units;
    this.speed = s;
    this.type = t;
    this.x1Limit = x1*units;
    this.x2Limit = (x2-w)*units;
    this.velX = 0;
    this.velY = 0;
    this.collisionDir = "";
    this.grounded = false;
    this.hitPlayer = "";
    this.dead = false;
}

function Switch(x,y) {
    this.x = x*units;
    this.y = y*units;
    this.height = 2*units;
    this.width = units;
    this.isOn = false;
}

function Door(x,y,w,h) {
    this.x = x*units;
    this.y = y*units;
    this.height = h*units;
    this.width = w*units;
    this.isOpen = false;
}

function toDegrees (angle) {
  return angle * (180 / Math.PI);
}
function toRadians (angle) {
  return angle * (Math.PI / 180);
}

function Projectile(x,y,theta, speed,height,width,pvY) {
    this.x = x;
    this.y = y;
    this.height = height*units;
    this.width = width*units;
    this.theta = theta;
    this.speed = speed;
    this.velX = speed * Math.cos(toRadians(theta));
    this.velY = speed * Math.sin(toRadians(theta));
    this.velX += pvY;
}

function Crate(x,y,height,width,contents) {
    this.x = x*units;
    this.y = y*units;
    this.velX = 0;
    this.velY = 0;
    this.height = height*units;
    this.width = width*units;
    this.broken = false;
    this.contents = contents;
}

level1 = new level(200);
level2 = new level(200);

//Level1
level1.boxes.push(new Box(-1,0,20,1.1));
level1.boxes.push(new Box(-1,16,4,41));
level1.boxes.push(new Box(19,15,1,6));
level1.boxes.push(new Box(20,14,1,6));
level1.boxes.push(new Box(21,13,1,4));
level1.boxes.push(new Box(22,12,1,4));
level1.boxes.push(new Box(23,11,1,2));
level1.boxes.push(new Box(24,10,6,16));

level1.boxes.push(new Box(46,15,5,25));
level1.boxes.push(new Box(46,10,10,4));
level1.boxes.push(new Box(71,10,10,4));
level1.boxes.push(new Box(50,13,3,3));
level1.boxes.push(new Box(68,13,3,3));

level1.boxes.push(new Box(82,16,4,70));
level1.boxes.push(new Box(103,14,6,36));

level1.boxes.push(new Box(102,15,1,40));
level1.boxes.push(new Box(104,13,1,8));
level1.boxes.push(new Box(105,12,1,7));
level1.boxes.push(new Box(106,11,1,6));
level1.boxes.push(new Box(107,10,1,5));

level1.boxes.push(new Box(120,10,2,2));
level1.boxes.push(new Box(120,6,1,2));

level1.boxes.push(new Box(130,13,1,8));
level1.boxes.push(new Box(130,12,1,7));
level1.boxes.push(new Box(130,11,1,6));
level1.boxes.push(new Box(130,10,1,5));

level1.boxes.push(new Box(156,19,1,16));
level1.boxes.push(new Box(156,16,3,6));
level1.boxes.push(new Box(164,17,2,8));
level1.boxes.push(new Box(164,14,3,2));
level1.boxes.push(new Box(168,12,5,4));

//Ending Sequence
level1.boxes.push(new Box(176,17,3,24));
level1.boxes.push(new Box(176,16,1,10));
level1.boxes.push(new Box(176,15,1,8));
level1.boxes.push(new Box(176,14,1,6));
level1.boxes.push(new Box(176,13,1,4));
level1.boxes.push(new Box(176,12,1,2));

level1.boxes.push(new Box(191,10,2,2));
level1.boxes.push(new Box(196,0,8,4));
level1.boxes.push(new Box(196,14,3,4));

level1.collectibles.push(new Collectible(29,9,0.4,0.4,"coin"));
level1.collectibles.push(new Collectible(35,9,0.4,0.4,"coin"));
level1.collectibles.push(new Collectible(48,9,0.4,0.4,"coin"));
level1.collectibles.push(new Collectible(51.3,12,0.4,0.4,"coin"));
level1.collectibles.push(new Collectible(56.3,14,0.4,0.4,"coin"));
level1.collectibles.push(new Collectible(60.3,14,0.4,0.4,"coin"));
level1.collectibles.push(new Collectible(64.3,14,0.4,0.4,"coin"));
level1.collectibles.push(new Collectible(69.3,12,0.4,0.4,"coin"));
level1.collectibles.push(new Collectible(73,9,0.4,0.4,"coin"));

level1.collectibles.push(new Collectible(120.3,9,0.4,0.4,"coin"));
level1.collectibles.push(new Collectible(121.3,9,0.4,0.4,"coin"));
level1.collectibles.push(new Collectible(120.3,5,0.4,0.4,"coin"));
level1.collectibles.push(new Collectible(121.3,5,0.4,0.4,"coin"));
level1.collectibles.push(new Collectible(120.3,4,0.4,0.4,"coin"));
level1.collectibles.push(new Collectible(121.3,4,0.4,0.4,"coin"));

//Ending Sequence Coins
level1.collectibles.push(new Collectible(165,13,0.4,0.4,"coin"));
level1.collectibles.push(new Collectible(169.8,11,0.4,0.4,"coin"));
level1.collectibles.push(new Collectible(180,10.7,0.4,0.4,"coin"));
level1.collectibles.push(new Collectible(183,10.7,0.4,0.4,"coin"));
level1.collectibles.push(new Collectible(186,6.7,0.4,0.4,"coin"));
level1.collectibles.push(new Collectible(186,10.7,0.4,0.4,"coin"));
level1.collectibles.push(new Collectible(186,14.7,0.4,0.4,"coin"));
level1.collectibles.push(new Collectible(189,10.7,0.4,0.4,"coin"));
level1.collectibles.push(new Collectible(189,8.7,0.4,0.4,"coin"));
level1.collectibles.push(new Collectible(189,12.7,0.4,0.4,"coin"));
level1.collectibles.push(new Collectible(195,10.7,0.4,0.4,"coin"));


// Level 2
level2.boxes.push(new Box(0,0,8,4));
level2.boxes.push(new Box(0,14,6,14));

level2.boxes.push(new Box(20,14,6,4));
level2.boxes.push(new Box(24,10,10,1));

level2.boxes.push(new Box(31,14,6,14));
level2.boxes.push(new Box(41,13,1,4));
level2.boxes.push(new Box(42,12,1,3));
level2.boxes.push(new Box(43,11,1,2));
level2.boxes.push(new Box(44,10,1,1));
level2.boxes.push(new Box(45,13,3,1));
level2.boxes.push(new Box(45,16,4,20));
level2.boxes.push(new Box(64,13,3,1));
level2.boxes.push(new Box(65,10,10,1));
level2.boxes.push(new Box(66,11,9,1));
level2.boxes.push(new Box(67,12,8,1));
level2.boxes.push(new Box(68,13,7,1));

level2.boxes.push(new Box(74,13,7,1));
level2.boxes.push(new Box(75,12,8,1));
level2.boxes.push(new Box(76,11,9,1));
level2.boxes.push(new Box(77,10,10,23));

level2.boxes.push(new Box(105,13.5,1,10));

level2.boxes.push(new Box(120,10,2,20));
level2.boxes.push(new Box(120,10,10,2));
level2.boxes.push(new Box(120,18,2,20));

level2.boxes.push(new Box(138,12,3,2));
level2.boxes.push(new Box(138,14,1,6));

level2.boxes.push(new Box(140,18,2,20));
level2.boxes.push(new Box(164,15,6,4));
level2.boxes.push(new Box(168,12,10,2));

level2.doors.push(new Door(138,15,1,3));
level2.switches.push(new Switch(140,16));
//Ending Sequence
level2.boxes.push(new Box(176,17,3,24));
level2.boxes.push(new Box(176,16,1,10));
level2.boxes.push(new Box(176,15,1,8));
level2.boxes.push(new Box(176,14,1,6));
level2.boxes.push(new Box(176,13,1,4));
level2.boxes.push(new Box(176,12,1,2));

level2.boxes.push(new Box(191,10,2,2));
level2.boxes.push(new Box(196,0,8,4));
level2.boxes.push(new Box(196,14,3,4));

level2.collectibles.push(new Collectible(24.3,9,0.4,0.4,"coin"));
level2.collectibles.push(new Collectible(34,13,0.4,0.4,"coin"));
level2.collectibles.push(new Collectible(38,13,0.4,0.4,"coin"));
level2.collectibles.push(new Collectible(45.3,12,0.4,0.4,"coin"));
level2.collectibles.push(new Collectible(50,15,0.4,0.4,"coin"));
level2.collectibles.push(new Collectible(55,15,0.4,0.4,"coin"));
level2.collectibles.push(new Collectible(60,15,0.4,0.4,"coin"));
level2.collectibles.push(new Collectible(64.3,12,0.4,0.4,"coin"));
level2.collectibles.push(new Collectible(68.3,12.3,0.4,0.4,"coin"));
level2.collectibles.push(new Collectible(74.3,12.3,0.4,0.4,"coin"));
level2.collectibles.push(new Collectible(78,9,0.4,0.4,"coin"));
level2.collectibles.push(new Collectible(79,9,0.4,0.4,"coin"));
level2.collectibles.push(new Collectible(80,9,0.4,0.4,"coin"));
level2.collectibles.push(new Collectible(81,9,0.4,0.4,"coin"));
level2.collectibles.push(new Collectible(82,9,0.4,0.4,"coin"));
level2.collectibles.push(new Collectible(96,9,0.4,0.4,"coin"));
level2.collectibles.push(new Collectible(100,6,0.4,0.4,"coin"));
level2.collectibles.push(new Collectible(106,12,0.4,0.4,"coin"));
level2.collectibles.push(new Collectible(125,9,0.4,0.4,"coin"));
level2.collectibles.push(new Collectible(129,9,0.4,0.4,"coin"));
level2.collectibles.push(new Collectible(129,15,1,1,"red"));
level2.collectibles.push(new Collectible(133,9,0.4,0.4,"coin"));
level2.collectibles.push(new Collectible(143,13,0.4,0.4,"coin"));
level2.collectibles.push(new Collectible(168.7,11,0.4,0.4,"coin"));



//Ending Sequence Coins
level2.collectibles.push(new Collectible(180,10.7,0.4,0.4,"coin"));
level2.collectibles.push(new Collectible(183,10.7,0.4,0.4,"coin"));
level2.collectibles.push(new Collectible(186,6.7,0.4,0.4,"coin"));
level2.collectibles.push(new Collectible(186,10.7,0.4,0.4,"coin"));
level2.collectibles.push(new Collectible(186,14.7,0.4,0.4,"coin"));
level2.collectibles.push(new Collectible(189,10.7,0.4,0.4,"coin"));
level2.collectibles.push(new Collectible(189,8.7,0.4,0.4,"coin"));
level2.collectibles.push(new Collectible(189,12.7,0.4,0.4,"coin"));
level2.collectibles.push(new Collectible(195,10.7,0.4,0.4,"coin"));


//Mobs
level2.mobs.push(new Mob(56,15,2,2,0.3,"patrol",46,64))

//Level 3
/*
level2.ice.push(new Box(25,10,1,50));

level2.crates.push(new Crate(30,8,2,2,null))
level1.mobs.push({
    x: 28*units,
    y: 6*units,
    width: (units/8)*7,
    height: (units/8)*7,
    speed: 0.3,
    velX: 0,
    velY: 0,
    type: "patrol",
    x1Limit: 22*units,
    x2Limit: 34*units,
    collisionDir: "",
    grounded: false,
    hitPlayer: "",
    dead: false
});
*/
