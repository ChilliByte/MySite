//Begin Levels
var levels = [];

function level(w, bg, bcol) {
    this.boxes = [];
    this.water = [];
    this.ice = [];
    this.switches = [];
    this.doors = [];
    this.mobs = [];
    this.collectibles = [];
    this.projectiles = [];
    this.crates = [];
    this.width = w * units;
    this.offset = 0;
    this.bgColor = bg;
    this.boxColor = bcol;
    levels.push(this)
}

function Box(x, y, h, w, e) {
    this.x = x * units;
    this.y = y * units;
    this.height = h * units;
    this.width = w * units;
    if (e != undefined) {
        this.waterEdge = true;
    }
}

function Collectible(x, y, w, h, t) {
    this.x = x * units;
    this.y = y * units;
    this.height = h * units;
    this.width = w * units;
    this.type = t;
    this.collected = false;
}

function Mob(x, y, w, h, s, t, x1, x2, d, health) {
    this.x = x * units;
    this.y = y * units;
    this.initialX = x*units;
    this.initialY = y*units;
    this.width = w * units;
    this.height = h * units;
    this.speed = s;
    this.type = t;
    this.x1Limit = (x1 * units) + 1;
    this.x2Limit = ((x2 - w) * units) - 1;
    this.damage = d;
    this.velX = 0;
    this.velY = 0;
    this.collisionDir = "";
    this.grounded = false;
    this.hitPlayer = "";
    this.initialHealth = health;
    this.health = health;
    this.dead = false;
    this.mobDir = "right";
}

function Switch(x, y) {
    this.x = x * units;
    this.y = y * units;
    this.height = 2 * units;
    this.width = units;
    this.isOn = false;
}

function Door(x, y, w, h) {
    this.x = x * units;
    this.y = y * units;
    this.height = h * units;
    this.width = w * units;
    this.isOpen = false;
}

function toDegrees(angle) {
    return angle * (180 / Math.PI);
}

function toRadians(angle) {
    return angle * (Math.PI / 180);
}

function Projectile(x, y, theta, speed, height, width, pvY) {
    this.x = x;
    this.y = y;
    this.height = height * units;
    this.width = width * units;
    this.theta = theta;
    this.speed = speed;
    this.velX = speed * Math.cos(toRadians(theta));
    this.velY = speed * Math.sin(toRadians(theta));
    this.velX += pvY;
}

function Crate(x, y, height, width, contents) {
    this.x = x * units;
    this.y = y * units;
    this.velX = 0;
    this.velY = 0;
    this.height = height * units;
    this.width = width * units;
    this.broken = false;
    this.contents = contents;
}

function Sound(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.play = function() {
        this.sound.play();
    }
    this.stop = function() {
        this.sound.pause();
    }
}

var level1 = new level(200, "#72c5ff", "#00D230");
var level2 = new level(200, "#72c5ff", "#00D230");
var level3 = new level(160, "#72c5ff", "#00D230");
var level4 = new level(40, "#72c5ff", "#00D230");
var level5 = new level(200, "#dddddd", "#003366");

//Level1
level1.boxes.push(
new Box(-1, 0, 20, 1.1),
new Box(-1, 16, 4, 41),
new Box(19, 15, 1, 6),
new Box(20, 14, 1, 6),
new Box(21, 13, 1, 4),
new Box(22, 12, 1, 4),
new Box(23, 11, 1, 2),
new Box(24, 10, 6, 16),

new Box(46, 15, 5, 25),
new Box(46, 10, 10, 4),
new Box(71, 10, 10, 4),
new Box(50, 13, 3, 3),
new Box(68, 13, 3, 3),
new Box(82, 16, 4, 70),
new Box(103, 14, 6, 36),

new Box(102, 15, 1, 40),
new Box(104, 13, 1, 8),
new Box(105, 12, 1, 7),
new Box(106, 11, 1, 6),
new Box(107, 10, 1, 5),

new Box(120, 10, 2, 2),
new Box(120, 6, 1, 2),

new Box(130, 13, 1, 8),
new Box(130, 12, 1, 7),
new Box(130, 11, 1, 6),
new Box(130, 10, 1, 5),

new Box(156, 19, 1, 16),
new Box(156, 16, 3, 6),
new Box(164, 17, 2, 8),
new Box(164, 14, 3, 2),
new Box(168, 12, 5, 4),

//Ending Sequence
new Box(176, 17, 3, 24),
new Box(176, 16, 1, 10),
new Box(176, 15, 1, 8),
new Box(176, 14, 1, 6),
new Box(176, 13, 1, 4),
new Box(176, 12, 1, 2),

new Box(191, 10, 2, 2),
new Box(196, 0, 8, 4),
new Box(196, 14, 3, 4));

level1.collectibles.push(
new Collectible(29, 9, 0.4, 0.4, "coin"),
new Collectible(35, 9, 0.4, 0.4, "coin"),
new Collectible(48, 9, 0.4, 0.4, "coin"),
new Collectible(51.3, 12, 0.4, 0.4, "coin"),
new Collectible(56.3, 14, 0.4, 0.4, "coin"),
new Collectible(60.3, 14, 0.4, 0.4, "coin"),
new Collectible(64.3, 14, 0.4, 0.4, "coin"),
new Collectible(69.3, 12, 0.4, 0.4, "coin"),
new Collectible(73, 9, 0.4, 0.4, "coin"),

new Collectible(120.3, 9, 0.4, 0.4, "coin"),
new Collectible(121.3, 9, 0.4, 0.4, "coin"),
new Collectible(120.3, 5, 0.4, 0.4, "coin"),
new Collectible(121.3, 5, 0.4, 0.4, "coin"),
new Collectible(120.3, 4, 0.4, 0.4, "coin"),
new Collectible(121.3, 4, 0.4, 0.4, "coin"),

//Ending Sequence Coins
new Collectible(165, 13, 0.4, 0.4, "coin"),
new Collectible(169.8, 11, 0.4, 0.4, "coin"),
new Collectible(180, 10.7, 0.4, 0.4, "coin"),
new Collectible(183, 10.7, 0.4, 0.4, "coin"),
new Collectible(186, 6.7, 0.4, 0.4, "coin"),
new Collectible(186, 10.7, 0.4, 0.4, "coin"),
new Collectible(186, 14.7, 0.4, 0.4, "coin"),
new Collectible(189, 10.7, 0.4, 0.4, "coin"),
new Collectible(189, 8.7, 0.4, 0.4, "coin"),
new Collectible(189, 12.7, 0.4, 0.4, "coin"),
new Collectible(195, 10.7, 0.4, 0.4, "coin"));


// Level 2
level2.boxes.push(
new Box(0, 0, 8, 4),
new Box(0, 14, 6, 14),

new Box(20, 14, 6, 4),
new Box(24, 10, 10, 1),

new Box(31, 14, 6, 14),
new Box(41, 13, 1, 4),
new Box(42, 12, 1, 3),
new Box(43, 11, 1, 2),
new Box(44, 10, 1, 1),
new Box(45, 13, 3, 1),
new Box(45, 16, 4, 20),
new Box(64, 13, 3, 1),
new Box(65, 10, 10, 1),
new Box(66, 11, 9, 1),
new Box(67, 12, 8, 1),
new Box(68, 13, 7, 1),

new Box(74, 13, 7, 1),
new Box(75, 12, 8, 1),
new Box(76, 11, 9, 1),
new Box(77, 10, 10, 23),

new Box(105, 13.5, 1, 10),

new Box(120, 10, 2, 20),
new Box(120, 10, 10, 2),
new Box(120, 18, 2, 20),

new Box(138, 12, 3, 2),
new Box(138, 14, 1, 6),

new Box(140, 18, 2, 20),
new Box(164, 15, 6, 4),
new Box(168, 12, 10, 2));

level2.doors.push(new Door(138, 15, 1, 3));
level2.switches.push(new Switch(140, 16));
//Ending Sequence
level2.boxes.push(
new Box(176, 17, 3, 24),
new Box(176, 16, 1, 10),
new Box(176, 15, 1, 8),
new Box(176, 14, 1, 6),
new Box(176, 13, 1, 4),
new Box(176, 12, 1, 2),

new Box(191, 10, 2, 2),
new Box(196, 0, 8, 4),
new Box(196, 14, 3, 4));

level2.collectibles.push(
new Collectible(24.3, 9, 0.4, 0.4, "coin"),
new Collectible(34, 13, 0.4, 0.4, "coin"),
new Collectible(38, 13, 0.4, 0.4, "coin"),
new Collectible(45.3, 12, 0.4, 0.4, "coin"),
new Collectible(50, 15, 0.4, 0.4, "coin"),
new Collectible(55, 15, 0.4, 0.4, "coin"),
new Collectible(60, 15, 0.4, 0.4, "coin"),
new Collectible(64.3, 12, 0.4, 0.4, "coin"),
new Collectible(68.3, 12.3, 0.4, 0.4, "coin"),
new Collectible(74.3, 12.3, 0.4, 0.4, "coin"),
new Collectible(78, 9, 0.4, 0.4, "coin"),
new Collectible(79, 9, 0.4, 0.4, "coin"),
new Collectible(80, 9, 0.4, 0.4, "coin"),
new Collectible(81, 9, 0.4, 0.4, "coin"),
new Collectible(82, 9, 0.4, 0.4, "coin"),
new Collectible(96, 9, 0.4, 0.4, "coin"),
new Collectible(100, 6, 0.4, 0.4, "coin"),
new Collectible(106, 12, 0.4, 0.4, "coin"),
new Collectible(125, 9, 0.4, 0.4, "coin"),
new Collectible(129, 9, 0.4, 0.4, "coin"),
new Collectible(129, 15, 1, 1, "red"),
new Collectible(133, 9, 0.4, 0.4, "coin"),
new Collectible(143, 13, 0.4, 0.4, "coin"),
new Collectible(168.7, 11, 0.4, 0.4, "coin"),

//Ending Sequence Coins
new Collectible(180, 10.7, 0.4, 0.4, "coin"),
new Collectible(183, 10.7, 0.4, 0.4, "coin"),
new Collectible(186, 6.7, 0.4, 0.4, "coin"),
new Collectible(186, 10.7, 0.4, 0.4, "coin"),
new Collectible(186, 14.7, 0.4, 0.4, "coin"),
new Collectible(189, 10.7, 0.4, 0.4, "coin"),
new Collectible(189, 8.7, 0.4, 0.4, "coin"),
new Collectible(189, 12.7, 0.4, 0.4, "coin"),
new Collectible(195, 10.7, 0.4, 0.4, "coin"));


//Mobs
level2.mobs.push(
new Mob(56, 15, 2, 2, 0.3, "patrol", 46, 64, 50, 1),

new Mob(87, 9, 1, 1, 3, "left", 0, 0, 15, 1),
new Mob(89, 9, 1, 1, 2, "left", 0, 0, 15, 1),
new Mob(91, 9, 1, 1, 2, "left", 0, 0, 15, 1),

new Mob(114, 6, 2, 2, 1, "left", 0, 0, 50, 1),

new Mob(123, 12, 1, 1, 1, "right", 0, 0, 15, 1),
new Mob(133, 12, 1, 1, 1, "right", 0, 0, 15, 1),

new Mob(150, 15, 3, 3, 0.5, "patrol", 146, 158, 85, 1));

//Level 3
level3.boxes.push(
new Box(0, 0, 8, 4),
new Box(0, 14, 6, 10),
new Box(0, 18, 2, 50),
new Box(14, 14, 1, 5),
new Box(22, 12, 1, 4),
new Box(30, 10, 1, 3),
new Box(35, 8, 1, 2),
new Box(40, 7, 1, 1),
new Box(44, 9, 1, 1),
new Box(48, 11, 1, 1),
new Box(52, 13, 1, 1),
new Box(56, 15, 1, 1),
new Box(65, 16, 8, 20),
new Box(65, 18, 2, 50),
new Box(92, 16, 1, 5),
new Box(100, 12, 1, 4),
new Box(110, 11, 1, 3),
new Box(118, 8, 1, 2),
new Box(125, 8, 1, 1),
new Box(134, 16, 4, 2),

//Ending Sequence
new Box(136, 17, 3, 24),
new Box(136, 16, 1, 10),
new Box(136, 15, 1, 8),
new Box(136, 14, 1, 6),
new Box(136, 13, 1, 4),
new Box(136, 12, 1, 2),

new Box(151, 10, 2, 2),
new Box(156, 0, 8, 4),
new Box(156, 14, 3, 4));

level3.collectibles.push(
new Collectible(16, 13, 0.4, 0.4, "coin"),
new Collectible(24, 11, 0.4, 0.4, "coin"),
new Collectible(31, 9, 0.4, 0.4, "coin"),
new Collectible(35.6, 7, 0.4, 0.4, "coin"),
new Collectible(40.3, 5, 0.4, 0.4, "coin"),
new Collectible(94.3, 15, 0.4, 0.4, "coin"),
new Collectible(102, 11, 0.4, 0.4, "coin"),
new Collectible(111.3, 10, 0.4, 0.4, "coin"),
new Collectible(118, 7, 0.4, 0.4, "coin"),
new Collectible(125, 7, 0.4, 0.4, "coin"),

//Ending Sequence Coins
new Collectible(140, 10.7, 0.4, 0.4, "coin"),
new Collectible(143, 10.7, 0.4, 0.4, "coin"),
new Collectible(146, 6.7, 0.4, 0.4, "coin"),
new Collectible(146, 10.7, 0.4, 0.4, "coin"),
new Collectible(146, 14.7, 0.4, 0.4, "coin"),
new Collectible(149, 10.7, 0.4, 0.4, "coin"),
new Collectible(149, 8.7, 0.4, 0.4, "coin"),
new Collectible(149, 12.7, 0.4, 0.4, "coin"),
new Collectible(155, 10.7, 0.4, 0.4, "coin"));

level3.mobs.push(
new Mob(40, 6, 1, 1, 0, "left", 0, 0, 10, 1),
new Mob(44, 8, 1, 1, 0, "left", 0, 0, 10, 1),
new Mob(48, 10, 1, 1, 0, "left", 0, 0, 10, 1),
new Mob(52, 12, 1, 1, 0, "left", 0, 0, 10, 1),
new Mob(56, 14, 1, 1, 0, "left", 0, 0, 10, 1),
new Mob(72, 14, 3, 3, 1, "patrol", 65, 85, 10, 1));
// Level 4
level4.boxes.push(
new Box(0, 0, 8, 4),
new Box(0, 14, 6, 4),
new Box(6, 11, 1, 1),
new Box(6, 7, 1, 1),
new Box(6, 3, 1, 0.5),
new Box(8, 14, 6, 24),
new Box(10, 2, 0.5, 1),
new Box(30, 2, 0.5, 1),
new Box(32, 11, 1, 1),
new Box(32, 7, 1, 1),
new Box(32, 3, 1, 0.5),
new Box(36, 0, 8, 4),
new Box(36, 14, 6, 4)
);

level4.doors.push(new Door(0, 8, 0.5, 6));
level4.doors.push(new Door(39.5, 8, 0.5, 6));

level4.mobs.push(
new Mob(20, 0, 9, 9, 1, "boss1", 8, 32, 100, 5)
);
//Level5
level5.boxes.push(
    new Box(0, 0, 8, 4),
    new Box(0, 14, 6, 3),
    new Box(0, 19, 1, 44),
    new Box(3, 17, 3, 1),
    new Box(4, 18, 2, 1),
    new Box(5, 13, 2, 1),
    new Box(6, 12, 4, 2),
    new Box(7, 11, 6, 1),
    new Box(8, 10, 4, 1),
    new Box(9, 9, 4, 1),
    new Box(10, 8, 4, 1),
    new Box(11, 7, 4, 1),
    new Box(12, 6, 4, 1),
    new Box(13, 5, 4, 1),
    new Box(14, 4, 4, 1),
    new Box(15, 4, 3, 3),
    new Box(17, 7, 10, 1),
    new Box(21, 0, 15, 4),
    new Box(36, 1, 1, 16),
    new Box(35, 4, 1, 26),
    new Box(34, 7, 1, 18),
    new Box(33, 10, 1, 12),
    new Box(32, 13, 1, 20),
    new Box(31, 16, 1, 21),
    new Box(30, 19, 1, 14),
    new Box(42, 1, 13, 1),
    new Box(51, 17, 1, 2),
    new Box(52, 18, 1, 2),
    new Box(53, 19, 1, 46)
);
/*

level.crates.push(new Crate(30,8,2,2,null))

*/