(function() {
    var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
    window.requestAnimationFrame = requestAnimationFrame;
})();

var canvas = document.getElementById("canvas"),
    ctx = canvas.getContext("2d"),
    width = 500,
    height = 200,
    player = {
        x: width / 2,
        y: height - 15,
        width: 5,
        height: 5,
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
level1 = {};
level2 = {};
level1.boxes = [];

// dimensions
level1.boxes.push({
    x: 0,
    y: 0,
    width: 10,
    height: height
});
level1.boxes.push({
    x: 0,
    y: height - 2,
    width: width,
    height: 50
});
level1.boxes.push({
    x: width - 10,
    y: 0,
    width: 50,
    height: height
});

level1.boxes.push({
    x: 50,
    y: height - 10,
    width: 10,
    height: 10
});
level1.boxes.push({
    x: 60,
    y: height - 20,
    width: 10,
    height: 10
});
level1.boxes.push({
    x: 70,
    y: height - 30,
    width: 10,
    height: 10
});
level1.boxes.push({
    x: 80,
    y: height - 40,
    width: 40,
    height: 10
});
level1.boxes.push({
    x: 120,
    y: height - 50,
    width: 20,
    height: 10
});
level1.boxes.push({
    x: 140,
    y: height - 70,
    width: 10,
    height: 20
});
level1.boxes.push({
    x: 150,
    y: height - 80,
    width: 10,
    height: 10
});
level1.boxes.push({
    x: 160,
    y: height - 90,
    width: 100,
    height: 10
});

level1.boxes.push({
    x: 250,
    y: height - 100,
    width: 10,
    height: 10
});
level1.boxes.push({
    x: 260,
    y: height - 150,
    width: 10,
    height: 130
});
level1.boxes.push({
    x: 310,
    y: height - 150,
    width: 10,
    height: 150
});

level1.boxes.push({
    x: 300,
    y: height - 100,
    width: 10,
    height: 10
});


level1.boxes.push({
    x: 270,
    y: height - 50,
    width: 10,
    height: 10
});


level1.boxes.push({
    x: 310,
    y: height - 150,
    width: 140,
    height: 10
});


level1.boxes.push({
    x: 450,
    y: height - 150,
    width: 10,
    height: 150
});
level1.collectibles = [];
level1.collectibles.push({
    x: 150,
    y: 150,
    width: 10,
    height: 10,
    collected: false
});
level1.collectibles.push({
    x: width - 30,
    y: height - 30,
    width: 10,
    height: 10,
    collected: false
});
level1.mobs = [];
level2.boxes = [];

level2.boxes.push({
    x: 0,
    y: height - 10,
    width: width,
    height: 10
});

level2.collectibles = [];

level2.collectibles.push({
    x: 30,
    y: height - 30,
    width: 10,
    height: 10,
    collected: false
});

level2.collectibles.push({
    x: 130,
    y: height - 30,
    width: 10,
    height: 10,
    collected: false
});

level2.collectibles.push({
    x: 230,
    y: height - 30,
    width: 10,
    height: 10,
    collected: false
});

level2.mobs = [];
level2.mobs.push({
    x: 90,
    y: 10,
    width: 10,
    height: 10,
    speed: 0.3,
    velX: 0,
    velY: 0,
    type: "patrol",
    x1Limit: 50,
    x2Limit: 130,
    collisionDir : "",
    grounded: false,
    hitPlayer: "",
    dead: false
});

level2.mobs.push({
    x: 200,
    y: 100,
    width: 20,
    height: 20,
    speed: 0.1,
    velX: 0,
    velY: 0,
    type: "patrol",
    x1Limit: 150,
    x2Limit: 250,
    collisionDir : "",
    grounded: false,
    hitPlayer: "",
    dead: false
});

canvas.width = width;
canvas.height = height;

currentLevel = level1;
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
    ctx.fillStyle = "black";
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
                    if (player.collected == 2) {
                        currentLevel = level2;
                    }
                if (player.collected == 5) {
                }
            }
        }
    }
    ctx.closePath()
    ctx.fill();
    ctx.beginPath();
    ctx.fillStyle = "cyan";
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
        if (currentLevel.mobs[k].grounded) {currentLevel.mobs[k].velY = 0}
        currentLevel.mobs[k].y += currentLevel.mobs[k].velY;
      
        currentLevel.mobs[k].hitPlayer = colCheck(currentLevel.mobs[k], player)
        if (currentLevel.mobs[k].hitPlayer === "b") {currentLevel.mobs[k].dead = true}
        if (currentLevel.mobs[k].hitPlayer === "l" || currentLevel.mobs[k].hitPlayer === "r") {player.velY -= 5; player.velX += 5}
    }};
    ctx.closePath()

    ctx.fill()
    if (player.grounded) {
        player.velY = 0;
    }

    player.x += player.velX;
    player.y += player.velY;

    ctx.fillStyle = "red";
    ctx.fillRect(player.x, player.y, player.width, player.height);

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
