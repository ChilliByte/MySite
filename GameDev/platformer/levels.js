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

function Projectile(x,y,theta, speed,pvY) {
    this.x = x;
    this.y = y;
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
level3 = new level(200);
level4 = new level(200);
level5 = new level(200);

//Level1
level1.boxes.push(new Box(-1,0,20,1.1));
level1.boxes.push(new Box(-1,15,5,41));
level1.boxes.push(new Box(40,16,4,40));
level1.boxes.push(new Box(80,17,3,40));
level1.boxes.push(new Box(120,18,2,40));
level1.boxes.push(new Box(160,19,1,40));

level1.switches.push(new Switch(60,14));
level1.doors.push(new Door(80,14,1,2));
// Level 2
level2.boxes.push(new Box(-10,16,32,20));
level2.boxes.push(new Box(22,13,20,180));

level2.ice.push(new Box(5,10,1,10));
level2.ice.push(new Box(25,10,1,50));

level2.crates.push(new Crate(30,8,2,2,null))
//Level 3
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
