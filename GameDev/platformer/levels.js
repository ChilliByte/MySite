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

function Mob(x,y,w,h,s,t,xl,yl) {
    this.x = x*units;
    this.y = y*units;
    this.width = w*units;
    this.height = h*units;
    this.speed = s;
    this.type = t;
    this.x1Limit = x1;
    this.x2Limit = x2;
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

level1.collectibles.push(new Collectible(28,9,0.4,0.4,"coin"));
level1.collectibles.push(new Collectible(34,9,0.4,0.4,"coin"));
level1.collectibles.push(new Collectible(47,9,0.4,0.4,"coin"));
level1.collectibles.push(new Collectible(51,12,0.4,0.4,"coin"));
level1.collectibles.push(new Collectible(56,14,0.4,0.4,"coin"));
level1.collectibles.push(new Collectible(60,14,0.4,0.4,"coin"));
level1.collectibles.push(new Collectible(64,14,0.4,0.4,"coin"));
level1.collectibles.push(new Collectible(69,12,0.4,0.4,"coin"));
level1.collectibles.push(new Collectible(72,9,0.4,0.4,"coin"));
// Level 2
level2.boxes.push(new Box(-10,16,32,20));
level2.boxes.push(new Box(22,13,20,180));

level2.ice.push(new Box(5,10,1,10));
level2.ice.push(new Box(25,10,1,50));

level2.crates.push(new Crate(30,8,2,2,null))
//Level 3
/*
level3.collectibles.push({
    x: 26*units,
    y: 13 * units,
    type: "coin",
    width: (units/5)*2,
    height: (units/5)*2,
    collected: false
});
level5.mobs = [];
level5.mobs.push({
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
// End Levels
*/
