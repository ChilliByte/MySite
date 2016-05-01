var canvas = document.getElementById("canvas"),
    ctx = canvas.getContext("2d"),
    width = window.innerWidth,
    height = window.innerHeight,
    tilesX = 40,
    tilesY = 20,
    debug = false,
    units = 34,
    scrolling = false,
    logCols = false,
    touchingIce = false,
    openKeyPressed = false,
    evX = 0,
    evY = 0,
    dx = 0,
    dy = 0,
    theta = 0,
    cosTheta = 0,
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
        isGliding: false,
        lives:2,
        char: 1,
        lastDir: "l",
        health:200,
        powerups: {
            swim:false,
            glide:false,
            invincible:false,
            antigrav:false,
            shoot:false,
            shrink:false
        }
    },
    keys = [],
    friction = units/50,
    projectiles = [],
    normalVertiSpeed = 10.2,
    normalGravity = 0.34,
    normalFriction = 0.7,
    waterFriction = 0.43,
    waterVertiSpeed = 3.4,
    waterGravity = 0.034,
    iceFriction = 0.99,
    gravity = 0.34, 
    gravityDown = true,
    inWater = false,
    char1Sheet,
    mobDir = "right",
    touchingEdge = false,
    frame = false;


canvas.width = units * tilesX;
canvas.height = units * tilesY;
var tileDisplayWidth = Math.floor(Math.min(width/tilesX,height/tilesY));
canvas.style.width = tileDisplayWidth * tilesX  + "px";
canvas.style.height = tileDisplayWidth * tilesY + "px";


ctx.imageSmoothingEnabled = false;

console.log("Dimensions:");
console.log("Screen Height:" + height);
console.log("Screen Width:" + width);
console.log("Canvas Height:" + canvas.height);
console.log("Canvas Width:" + canvas.width);
console.log("Tile Height:" + canvas.height / tilesY);
