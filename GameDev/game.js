(function() {
    var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
    window.requestAnimationFrame = requestAnimationFrame;
})();

var canvas = document.getElementById("canvas"),
    ctx = canvas.getContext("2d"),
    width = window.innerWidth,
    height = window.innerHeight,
    debug = false,
    player = {
        x: 10,
        y: 0,
        width: 10,
        height: 20,
        speed: 3,
        velX: 0,
        velY: 0,
        collected: 0,
        jumping: false,
        grounded: false
    },
    keys = [],
    friction = 0.8,
    gravity = 0.3;

levels = [];
level1 = {};
levels.push(level1);
level2 = {};
levels.push(level2);
level3 = {};
levels.push(level3);
level4 = {};
levels.push(level4);
level1.boxes = [];

level1.boxes = [];
level1.boxes.push({
    x: -10,
    y: 0,
    width: 11,
    height: height
});

level1.boxes.push({
    x: -100,
    y: height/2,
    width: width*2,
    height: height/2
});

level1.collectibles = [];
level1.mobs = [];
// Level 2
level2.boxes = [];

level2.boxes.push({
    x: -100,
    y: height/2 + 10,
    width: (width/2) + 100,
    height: height/2
});

level2.boxes.push({
    x: width/2,
    y: height/2 - 20,
    width: width,
    height: height/2 + 20
});




level2.collectibles = [];

level2.collectibles.push({
    x: width/2 + 20,
    y: height/2 - 30,
    width: 10,
    height: 10,
    collected: false
});

level2.mobs = [];

//Level 3
level3.boxes = [];

level3.boxes.push({
    x: -100,
    y: height/2 + 10,
    width: width+100,
    height: height/2
});

level3.boxes.push({
    x: 40,
    y: height/2 - 30,
    width: width - 40,
    height: height/2 - 40
});

level3.boxes.push({
    x: 80,
    y: height/2 - 70,
    width: width,
    height: height/2
});

level3.collectibles = [];

level3.collectibles.push({
    x: 140,
    y: height/2 - 100,
    width: 10,
    height: 10,
    collected: false
});

level3.mobs = [];

level3.mobs.push({
    x: 240,
    y: 10,
    width: 10,
    height: 10,
    speed: 0.3,
    velX: 0,
    velY: 0,
    type: "patrol",
    x1Limit: 140,
    x2Limit: 340,
    collisionDir : "",
    grounded: false,
    hitPlayer: "",
    dead: false
});
// Level 4
level4.boxes = [];

level4.boxes.push({
    x: -100,
    y: height/2 + 10,
    width: width + 200,
    height: height/2
});


level4.collectibles = [];
level4.mobs = [];

level4.mobs.push({
    x: 20,
    y: 10,
    width: 10,
    height: 10,
    speed: 0.3,
    velX: 0,
    velY: 0,
    type: "patrol",
    x1Limit: 140,
    x2Limit: 340,
    collisionDir : "",
    grounded: false,
    hitPlayer: "",
    dead: false
});

level4.mobs.push({
    x: 60,
    y: 10,
    width: 20,
    height: 20,
    speed: 0.3,
    velX: 0,
    velY: 0,
    type: "patrol",
    x1Limit: 140,
    x2Limit: 340,
    collisionDir : "",
    grounded: false,
    hitPlayer: "",
    dead: false
});

level4.mobs.push({
    x: 120,
    y: 10,
    width: 50,
    height: 50,
    speed: 0.3,
    velX: 0,
    velY: 0,
    type: "patrol",
    x1Limit: 140,
    x2Limit: 340,
    collisionDir : "",
    grounded: false,
    hitPlayer: "",
    dead: false
});

level4.mobs.push({
    x: 170,
    y: 10,
    width: 10,
    height: 10,
    speed: 0.3,
    velX: 0,
    velY: 0,
    type: "patrol",
    x1Limit: 140,
    x2Limit: 340,
    collisionDir : "",
    grounded: false,
    hitPlayer: "",
    dead: false
});

level4.mobs.push({
    x: 240,
    y: 10,
    width: 10,
    height: 10,
    speed: 0.3,
    velX: 0,
    velY: 0,
    type: "patrol",
    x1Limit: 140,
    x2Limit: 340,
    collisionDir : "",
    grounded: false,
    hitPlayer: "",
    dead: false
});

// End Levels
canvas.width = width;
canvas.height = height;
currentLevelInt = 0
currentLevel = levels[currentLevelInt];
mobDir = "right";
function update() {
    // check keys
    if (keys[38] || keys[32] || keys[87]) {
        // up arrow or space
        if (!player.jumping && player.grounded) {
            player.jumping = true;
            player.grounded = false;
            player.velY = -player.speed * 2;
        }
    }
    if (keys[39] || keys[68]) {
        // right arrow
        if (player.velX < player.speed) {
            player.velX++;
        }
    }
    if (keys[37] || keys[65]) {
        // left arrow
        if (player.velX > -player.speed) {
            player.velX--;
        }
    }

    player.velX *= friction;
    player.velY += gravity;

    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = "#380";
    ctx.beginPath();

    player.grounded = false;
    for (var i = 0; i < currentLevel.boxes.length; i++) {
        ctx.rect(currentLevel.boxes[i].x, currentLevel.boxes[i].y, currentLevel.boxes[i].width, currentLevel.boxes[i].height);

        var dir = colCheck(player, currentLevel.boxes[i]);
       
        if (dir === "l" || dir === "r") {
            player.velX = 0;
            player.jumping = false;
        } else if (dir === "b") {
            player.grounded = true;
            player.jumping = false;
        } else if (dir === "t") {
            player.velY *= -1;
        }
        for (var l = 0; l < currentLevel.mobs.length; l++) {
          currentLevel.mobs[l].collisionDir = colCheck(currentLevel.mobs[l], currentLevel.boxes[i])
          if (currentLevel.mobs[l].collisionDir == "b") {currentLevel.mobs[l].grounded = true}
        }
    }
    ctx.closePath()
    ctx.fill();
    ctx.beginPath();
    ctx.fillStyle = "orange";
    for (var j = 0; j < currentLevel.collectibles.length; j++) {
        if (currentLevel.collectibles[j].collected == false) {
            ctx.rect(currentLevel.collectibles[j].x, currentLevel.collectibles[j].y, currentLevel.collectibles[j].width, currentLevel.collectibles[j].height)
            var collectCheck = colCheck(player, currentLevel.collectibles[j]);
            if (collectCheck === "l" || collectCheck === "r" || collectCheck === "t" || collectCheck === "b") {
                currentLevel.collectibles[j].collected = true;
                player.collected++
                console.log("Collected")
            }
        }
    }
    if (player.x < 0) {
        player.x = width - 5; 
        currentLevelInt -= 1;
        currentLevel = levels[currentLevelInt];
        console.log("Previous Level");
    }
    if (player.x > width) {
        currentLevelInt += 1;
        currentLevel = levels[currentLevelInt];
        console.log("Next Level");
        player.x = 10; 
    }
    ctx.closePath()
    ctx.fill();
    ctx.beginPath();
    ctx.fillStyle = "#90f";
    for (var k = 0; k < currentLevel.mobs.length; k++) {
        if (!currentLevel.mobs[k].dead){
        ctx.rect(currentLevel.mobs[k].x, currentLevel.mobs[k].y, currentLevel.mobs[k].width, currentLevel.mobs[k].height)
        if (currentLevel.mobs[k].type == "patrol") {
        if (mobDir == "right") {
            // right arrow
            if (currentLevel.mobs[k].velX < currentLevel.mobs[k].speed) {
                currentLevel.mobs[k].velX++;
            }
            if (currentLevel.mobs[k].x > currentLevel.mobs[k].x2Limit) {mobDir = "left"; currentLevel.mobs[k].x -= 5} 
        }
        if (mobDir == "left") {
            // right arrow
            if (currentLevel.mobs[k].velX > -currentLevel.mobs[k].speed) {
                currentLevel.mobs[k].velX--;
            }
            if (currentLevel.mobs[k].x < currentLevel.mobs[k].x1Limit) {mobDir = "right"; currentLevel.mobs[k].x += 5} 
            
        } };
        currentLevel.mobs[k].velX *= friction;
        currentLevel.mobs[k].velY += gravity; 
    	  currentLevel.mobs[k].x += currentLevel.mobs[k].velX; 
        if (currentLevel.mobs[k].grounded) {currentLevel.mobs[k].velY = 0; currentLevel.mobs[k].grounded = false;}
        currentLevel.mobs[k].y += currentLevel.mobs[k].velY;
      
        currentLevel.mobs[k].hitPlayer = colCheck(currentLevel.mobs[k], player)
        if (currentLevel.mobs[k].hitPlayer === "t") { currentLevel.mobs[k].dead = true; console.log("Hit Mob Top")}
        if (currentLevel.mobs[k].hitPlayer === "l") { player.velY -= 2; player.velX += 8; currentLevel.mobs[k].velX += 5; console.log("Hit Mob Left");   }
        if (currentLevel.mobs[k].hitPlayer === "r") { player.velY -= 2; player.velX -= 8; currentLevel.mobs[k].velX -= 5; console.log("Hit Mob Right");  }
        if (currentLevel.mobs[k].hitPlayer === "b") { player.velY -= 2; player.velX -= 8; console.log("Hit Mob Bottom"); }
    }};
    ctx.closePath()

    ctx.fill()
    if (player.grounded) {
        player.velY = 0;
    }

    player.x += player.velX;
    player.y += player.velY;

    ctx.fillStyle = "#933";
    ctx.fillRect(player.x, player.y, player.width, player.height/2);
    ctx.fillStyle = "#3f3";
    ctx.fillRect(player.x, (player.y + player.height/2), player.width, player.height/2);    
ctx.fillStyle = "#ffe6ff";
    
if (player.velX > 0) {
    ctx.fillRect((player.x + player.width/2), (player.y + player.height/4), player.width/2, player.height/4);
}  
if (player.velX < 0) {
    ctx.fillRect(player.x, (player.y + player.height/4), player.width/2, player.height/4);
}
    
    if (debug) {
        document.getElementById("stats").style.display = "block"
        document.getElementById("stats").innerHTML = "X: " + player.x +"<br>Y: " + player.y + "<br>velX: " + player.velX + "<br>velY: " + player.velY;}
    requestAnimationFrame(update);
}

function colCheck(shapeA, shapeB) {
    // get the vectors to check against
    var vX = (shapeA.x + (shapeA.width / 2)) - (shapeB.x + (shapeB.width / 2)),
        vY = (shapeA.y + (shapeA.height / 2)) - (shapeB.y + (shapeB.height / 2)),
        // add the half widths and half heights of the objects
        hWidths = (shapeA.width / 2) + (shapeB.width / 2),
        hHeights = (shapeA.height / 2) + (shapeB.height / 2),
        colDir = null;

    // if the x and y vector are less than the half width or half height, they we must be inside the object, causing a collision
    if (Math.abs(vX) < hWidths && Math.abs(vY) < hHeights) {
        // figures out on which side we are colliding (top, bottom, left, or right)
        var oX = hWidths - Math.abs(vX),
            oY = hHeights - Math.abs(vY);
        if (oX >= oY) {
            if (vY > 0) {
                colDir = "t";
                shapeA.y += oY;
            } else {
                colDir = "b";
                shapeA.y -= oY;
            }
        } else {
            if (vX > 0) {
                colDir = "l";
                shapeA.x += oX;
            } else {
                colDir = "r";
                shapeA.x -= oX;
            }
        }
    }
    return colDir;
}

document.body.addEventListener("keydown", function(e) {
    keys[e.keyCode] = true;
});

document.body.addEventListener("keyup", function(e) {
    keys[e.keyCode] = false;
});


window.addEventListener("load", function() {
    update();
});

