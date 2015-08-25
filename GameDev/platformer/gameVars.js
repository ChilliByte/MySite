var canvas = document.getElementById("canvas"),
    ctx = canvas.getContext("2d"),
    width = window.innerWidth,
    height = window.innerHeight,
    tilesX = 40,
    tilesY = 20,
    debug = false,
    units = 34,
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
    normalFriction = units/50,
    waterFriction = units/100,
    waterVertiSpeed = 8*0.3*units/50,
    waterGravity = units/1500,
    iceFriction = units/35,
    gravity = units/100, 
    gravityDown = true,
    inWater = false,
    char1Sheet,
    mobDir = "right",
    touchingEdge = false,
    frame = false;


canvas.width = units * tilesX;
canvas.height = units * tilesY;
var tileDisplayWidth = Math.floor(Math.min(window.innerWidth/tilesX,window.innerHeight/tilesY));
canvas.style.width = tileDisplayWidth * tilesX  + "px";
canvas.style.height = tileDisplayWidth * tilesY + "px";


ctx.imageSmoothingEnabled = false;

console.log("Dimensions:");
console.log("Screen Height:" + height);
console.log("Screen Width:" + width);
console.log("Canvas Height:" + canvas.height);
console.log("Canvas Width:" + canvas.width);
console.log("Tile Height:" + canvas.height / tilesY);
