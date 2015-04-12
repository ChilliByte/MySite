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
        speed: 4,
        velX: 0,
        velY: 0,
        collected: 0,
        jumping: false,
        grounded: false,
        char: 1
    },
    keys = [],
    friction = 0.8,
    gravity = 0.3;

    canvas.width = width;
    canvas.height = height;
    mobDir = "right";


//Begin Levels
levels = [];
level1 = {};
levels.push(level1);
level2 = {};
levels.push(level2);
level3 = {};
levels.push(level3);
level4 = {};
levels.push(level4);

//Level1
level1.boxes = [];

level1.boxes.push({
    x: -10,
    y: 0,
    width: 11,
    height: height
});

level1.boxes.push({
    x: -100,
    y: height / 2,
    width: width * 2,
    height: height / 2
});

level1.collectibles = [];
level1.mobs = [];
// Level 2
level2.boxes = [];

level2.boxes.push({
    x: -100,
    y: height / 2 + 10,
    width: (width / 2) + 100,
    height: height / 2
});

level2.boxes.push({
    x: width / 2,
    y: height / 2 - 20,
    width: width,
    height: height / 2 + 20
});

level2.collectibles = [];

level2.collectibles.push({
    x: width / 2 + 20,
    y: height / 2 - 30,
    width: 10,
    height: 10,
    collected: false
});

level2.mobs = [];

//Level 3
level3.boxes = [];

level3.boxes.push({
    x: -100,
    y: height / 2 + 10,
    width: width + 100,
    height: height / 2
});

level3.boxes.push({
    x: 40,
    y: height / 2 - 30,
    width: width - 40,
    height: height / 2 - 40
});

level3.boxes.push({
    x: 80,
    y: height / 2 - 70,
    width: width,
    height: height / 2
});

level3.collectibles = [];

level3.collectibles.push({
    x: 140,
    y: height / 2 - 100,
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
    collisionDir: "",
    grounded: false,
    hitPlayer: "",
    dead: false
});
// Level 4
level4.boxes = [];

level4.boxes.push({
    x: -100,
    y: height / 2 + 10,
    width: width + 200,
    height: height / 2
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
    collisionDir: "",
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
    collisionDir: "",
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
    collisionDir: "",
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
    collisionDir: "",
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
    collisionDir: "",
    grounded: false,
    hitPlayer: "",
    dead: false
});

// End Levels

//Character Functions
function setChar(x) {
    player.char = x
}

function confirmChar() {
    $("#charSelect").fadeOut()
}

function drawChar() {
    if (player.char == 1) {
        //Set Size
        player.height = 36
        player.width = 12

        if (player.velX >= 0) {
            //Purple Hair
            ctx.fillStyle = "#4B0082";
            ctx.fillRect(player.x, player.y, player.width, 12);
            ctx.fillRect(player.x, player.y, 4, 16);

            //Face
            ctx.fillStyle = "#FFEBCD";
            ctx.fillRect((player.x) + 4, (player.y) + 4, 8, 8);

            //Eye
            ctx.fillStyle = "#7FFFD4";
            ctx.fillRect((player.x) + 8, (player.y) + 4, 4, 4);

            //Sleeve
            ctx.fillStyle = "#EDEDED";
            ctx.fillRect((player.x) + 4, (player.y) + 12, 4, 8);

            //Hand
            ctx.fillStyle = "#FFEBCD";
            ctx.fillRect((player.x) + 4, (player.y) + 20, 4, 4);

            //Trousers
            ctx.fillStyle = "#4682B4";
            ctx.fillRect((player.x) + 4, (player.y) + 24, 4, 12);

        }
        if (player.velX < 0) {
            //Purple Hair
            ctx.fillStyle = "#4B0082";
            ctx.fillRect(player.x, player.y, player.width, 12);
            ctx.fillRect((player.x) + 8, player.y, 4, 16);

            //Face
            ctx.fillStyle = "#FFEBCD";
            ctx.fillRect(player.x, (player.y) + 4, 8, 8);

            //Eye
            ctx.fillStyle = "#7FFFD4";
            ctx.fillRect(player.x, (player.y) + 4, 4, 4);

            //Sleeve
            ctx.fillStyle = "#EDEDED";
            ctx.fillRect((player.x) + 4, (player.y) + 12, 4, 8);

            //Hand
            ctx.fillStyle = "#FFEBCD";
            ctx.fillRect((player.x) + 4, (player.y) + 20, 4, 4);

            //Trousers
            ctx.fillStyle = "#4682B4";
            ctx.fillRect((player.x) + 4, (player.y) + 24, 4, 12);

        }


    }
    if (player.char == 2) {
        //Set Size
        player.height = 36
        player.width = 12

        if (player.velX >= 0) {
            //Brown Hair
            ctx.fillStyle = "#A0522D";
            ctx.fillRect(player.x, player.y, player.width, 12);


            //Face
            ctx.fillStyle = "#FFEBCD";
            ctx.fillRect((player.x) + 4, (player.y) + 4, 8, 8);

            //Eye
            ctx.fillStyle = "#90EE90";
            ctx.fillRect((player.x) + 8, (player.y) + 4, 4, 4);

            //Sleeve
            ctx.fillStyle = "#d22";
            ctx.fillRect((player.x) + 4, (player.y) + 12, 4, 8);

            //Hand
            ctx.fillStyle = "#FFEBCD";
            ctx.fillRect((player.x) + 4, (player.y) + 20, 4, 4);

            //Trousers
            ctx.fillStyle = "#4682B4";
            ctx.fillRect((player.x) + 4, (player.y) + 24, 4, 12);

        }
        if (player.velX < 0) {
            //Brown Hair
            ctx.fillStyle = "#A0522D";
            ctx.fillRect(player.x, player.y, player.width, 12);

            //Face
            ctx.fillStyle = "#FFEBCD";
            ctx.fillRect(player.x, (player.y) + 4, 8, 8);

            //Eye
            ctx.fillStyle = "#90EE90";
            ctx.fillRect(player.x, (player.y) + 4, 4, 4);

            //Sleeve
            ctx.fillStyle = "#d22";
            ctx.fillRect((player.x) + 4, (player.y) + 12, 4, 8);

            //Hand
            ctx.fillStyle = "#FFEBCD";
            ctx.fillRect((player.x) + 4, (player.y) + 20, 4, 4);

            //Trousers
            ctx.fillStyle = "#4682B4";
            ctx.fillRect((player.x) + 4, (player.y) + 24, 4, 12);

        }


    }
    if (player.char == 3) {
        player.height = 36
        player.width = 16

        if (player.velX >= 0) {
            //Hair
            ctx.fillStyle = "#A0522D";
            ctx.fillRect((player.x) + 4, player.y, 12, 4);
            ctx.fillRect(player.x, (player.y) + 4, 8, 8);
            ctx.fillRect((player.x) + 4, (player.y) + 12, 4, 12);
            ctx.fillRect(player.x, (player.y) + 20, 8, 4);

            //Face
            ctx.fillStyle = "#FFEBCD";
            ctx.fillRect((player.x) + 8, (player.y) + 4, 8, 8);

            //Eye
            ctx.fillStyle = "#CD853F";
            ctx.fillRect((player.x) + 12, (player.y) + 4, 4, 4);

            //Bow Tie
            ctx.fillStyle = "#d22";
            ctx.fillRect((player.x) + 12, (player.y) + 12, 4, 4);

            //Jacket
            ctx.fillStyle = "#cccccc";
            ctx.fillRect((player.x) + 8, (player.y) + 12, 4, 8);

            //Hand
            ctx.fillStyle = "#FFEBCD";
            ctx.fillRect((player.x) + 8, (player.y) + 20, 4, 4);

            //Pants
            ctx.fillStyle = "#666666";
            ctx.fillRect((player.x) + 8, (player.y) + 24, 4, 12);

        }
        if (player.velX < 0) {
            //Hair
            ctx.fillStyle = "#A0522D";
            ctx.fillRect(player.x, player.y, 12, 4);
            ctx.fillRect((player.x + 8), (player.y) + 4, 8, 8);
            ctx.fillRect((player.x) + 8, (player.y) + 12, 4, 12);
            ctx.fillRect((player.x) + 8, (player.y) + 20, 8, 4);

            //Face
            ctx.fillStyle = "#FFEBCD";
            ctx.fillRect(player.x, (player.y) + 4, 8, 8);

            //Eye
            ctx.fillStyle = "#CD853F";
            ctx.fillRect(player.x, (player.y) + 4, 4, 4);

            //Bow Tie
            ctx.fillStyle = "#d22";
            ctx.fillRect(player.x, (player.y) + 12, 4, 4);

            //Jacket
            ctx.fillStyle = "#cccccc";
            ctx.fillRect((player.x) + 4, (player.y) + 12, 4, 8);

            //Hand
            ctx.fillStyle = "#FFEBCD";
            ctx.fillRect((player.x) + 4, (player.y) + 20, 4, 4);

            //Pants
            ctx.fillStyle = "#666666";
            ctx.fillRect((player.x) + 4, (player.y) + 24, 4, 12);
        }
    }
}

//Notification Triggers

var triggers = {};
triggers.firstStep = false;
triggers.firstLevel = false;
triggers.firstCoin = false;

//Load Level1
currentLevelInt = 0
currentLevel = levels[currentLevelInt];

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
            if (!triggers.firstStep) {
                hint(player.x, 30, "Use the arrow keys to move!");
                triggers.firstStep = true;
            }
        }
    }
    if (keys[37] || keys[65]) {
        // left arrow
        if (player.velX > -player.speed) {
            player.velX--;
            if (!triggers.firstStep) {
                hint(player.x, 30, "Use the arrow keys to move!");
                triggers.firstStep = true;
            }
        }
    }

    //Factor in Friction and Gravity
    player.velX *= friction;
    player.velY += gravity;
    
    //Clear The Last Frame
    ctx.clearRect(0, 0, width, height);
    
    //Change to green and begins drawing
    ctx.fillStyle = "#380";
    ctx.beginPath();

    //Loop through the array of boxes in this level
    player.grounded = false;
    for (var i = 0; i < currentLevel.boxes.length; i++) {
        //draw each one
        ctx.rect(currentLevel.boxes[i].x, currentLevel.boxes[i].y, currentLevel.boxes[i].width, currentLevel.boxes[i].height);
        //Figure out whether we've touched a box
        var dir = colCheck(player, currentLevel.boxes[i]);
        //Do something depending on the direction the collision happened from.
        if (dir === "l" || dir === "r") {
            player.velX = 0;
            player.jumping = false;
        } else if (dir === "b") {
            player.grounded = true;
            player.jumping = false;
        } else if (dir === "t") {
            player.velY *= -1;
        }
        //Loop through each of the mobs in this level, and see if any of them have collided with a box.
        for (var l = 0; l < currentLevel.mobs.length; l++) {
            currentLevel.mobs[l].collisionDir = colCheck(currentLevel.mobs[l], currentLevel.boxes[i])
            if (currentLevel.mobs[l].collisionDir == "b") {
                currentLevel.mobs[l].grounded = true
            }
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
        if (!currentLevel.mobs[k].dead) {
            ctx.rect(currentLevel.mobs[k].x, currentLevel.mobs[k].y, currentLevel.mobs[k].width, currentLevel.mobs[k].height)
            if (currentLevel.mobs[k].type == "patrol") {
                if (mobDir == "right") {
                    if (currentLevel.mobs[k].velX < currentLevel.mobs[k].speed) {
                        currentLevel.mobs[k].velX++;
                    }
                    if (currentLevel.mobs[k].x > currentLevel.mobs[k].x2Limit) {
                        mobDir = "left";
                        currentLevel.mobs[k].x -= 5
                    }
                }
                if (mobDir == "left") {
                    if (currentLevel.mobs[k].velX > -currentLevel.mobs[k].speed) {
                        currentLevel.mobs[k].velX--;
                    }
                    if (currentLevel.mobs[k].x < currentLevel.mobs[k].x1Limit) {
                        mobDir = "right";
                        currentLevel.mobs[k].x += 5
                    }

                }
            };
            currentLevel.mobs[k].velX *= friction;
            currentLevel.mobs[k].velY += gravity;
            currentLevel.mobs[k].x += currentLevel.mobs[k].velX;
            if (currentLevel.mobs[k].grounded) {
                currentLevel.mobs[k].velY = 0;
                currentLevel.mobs[k].grounded = false;
            }
            currentLevel.mobs[k].y += currentLevel.mobs[k].velY;

            currentLevel.mobs[k].hitPlayer = colCheck(currentLevel.mobs[k], player)
            if (currentLevel.mobs[k].hitPlayer === "t") {
                currentLevel.mobs[k].dead = true;
                console.log("Hit Mob Top")
            }
            if (currentLevel.mobs[k].hitPlayer === "l") {
                player.velY -= 2;
                player.velX += 8;
                currentLevel.mobs[k].velX += 5;
                console.log("Hit Mob Left");
            }
            if (currentLevel.mobs[k].hitPlayer === "r") {
                player.velY -= 2;
                player.velX -= 8;
                currentLevel.mobs[k].velX -= 5;
                console.log("Hit Mob Right");
            }
            if (currentLevel.mobs[k].hitPlayer === "b") {
                player.velY -= 2;
                player.velX -= 8;
                console.log("Hit Mob Bottom");
            }
        }
    };
    ctx.closePath()

    ctx.fill()
    if (player.grounded) {
        player.velY = 0;
    }

    player.x += player.velX;
    player.y += player.velY;

    drawChar()

    //Hint Triggers

    if (!triggers.firstLevel) {
        if ((currentLevelInt == 0) && (player.x > width - 100)) {
            hint(player.x - 400, 30, "Go to the edge of the screen to go to the next level!");
            triggers.firstLevel = true;
            setTimeout(function() {
                hint(10000, 10000, "")
            }, 3000);
        }
    }

    if (!triggers.firstCoin) {
        if ((currentLevelInt == 1) && (player.x < 100)) {
            hint(player.x, 30, "That Orange thing's a coin! Ten coins give you a powerup! Try and collect all 100!");
            triggers.firstCoin = true;
            setTimeout(function() {
                hint(10000, 10000, "")
            }, 3000);
        }
    }

    if (debug) {
        document.getElementById("stats").style.display = "block"
        document.getElementById("stats").innerHTML = "X: " + player.x + "<br>Y: " + player.y + "<br>velX: " + player.velX + "<br>velY: " + player.velY;
    }
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

function hint(x, y, text) {
    $("#hintBox").fadeOut();
    setTimeout(function() {
        document.getElementById("hintBox").style.left = x + "px";
        document.getElementById("hintBox").style.top = y + "px";
        document.getElementById("hintBox").innerHTML = text;
        $("#hintBox").fadeIn();
    }, 500);
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
