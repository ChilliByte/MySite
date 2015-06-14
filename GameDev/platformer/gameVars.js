var canvas = document.getElementById("canvas"),
    ctx = canvas.getContext("2d"),
    width = window.innerWidth,
    height = window.innerHeight,
    tilesX = 40,
    tilesY = 20,
    debug = false,
    units = Math.floor(width / tilesX),
    player = {
        x: units,
        y: 0,
        width: Math.floor((units/3)*2),
        height: 2*units,
        horizSpeed: units/8,
        vertiSpeed: 1.5*units/5,
        velX: 0.02,
        velY: 0,
        collected: 0,
        jumping: false,
        grounded: false,
        char: 1,
        lastDir: "l"
    },
    keys = [],
    friction = units/50,
    projectiles = [],
    normalVertiSpeed = 1.5*units/5,
    normalGravity = units/100,
    waterFriction = units/15
    waterVertiSpeed = 8*0.15*units/5,
    waterGravity = units/125,
    gravity = units/100, 
    gravityDown = true,
    inWater = false,
    char1Sheet,
    mobDir = "right",
    frame = false;


canvas.width = units * tilesX;
canvas.height = units * tilesY;
ctx.imageSmoothingEnabled = false;

console.log("Dimensions:");
console.log("Screen Height:" + height);
console.log("Screen Width:" + width);
console.log("Canvas Height:" + canvas.height);
console.log("Canvas Width:" + canvas.width);
console.log("Tile Height:" + canvas.height / tilesY);
