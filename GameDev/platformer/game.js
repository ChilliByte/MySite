//Set Level to 1
currentLevelInt = 0
currentLevel = levels[currentLevelInt];
//Game Event Handler
var triggers = {};
triggers.firstStep = false;
triggers.firstLevel = false;
triggers.firstCoin = false;

(function() {
    var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
    window.requestAnimationFrame = requestAnimationFrame;
})();

function update() {
    //Clear The Last Frame
    ctx.clearRect(0, 0, 40*units, 20*units);

    //Check keys
    checkKeys()
    
    //Factor in Friction and Gravity
    player.velX *= friction;
    player.velY += gravity;
    
    player.grounded = false;
    
    drawBoxes();
    drawWater();
    drawIce();
    drawSwitches();
    drawDoors();
    drawCollectibles();
    drawMobs();
    
   
    if (player.grounded) {
        player.velY = 0;
    }
    
    if ((player.lastDir == "r") && (currentLevel.offset < 0)) {
        scrolling = false;
    }
    if ((player.lastDir == "l") && (currentLevel.offset > currentLevel.width - (tilesX*units))) {
        scrolling = false;
    }
    
    if (!scrolling) {
        player.x += player.velX;
    } else {
        i = currentLevel.boxes.length
        while(i--) {
            currentLevel.boxes[i].x -= player.velX;
        }
        i = currentLevel.water.length
        while(i--) {
            currentLevel.water[i].x -= player.velX;
        }
        i = currentLevel.ice.length
        while(i--) {
            currentLevel.ice[i].x -= player.velX;
        }
        currentLevel.offset += player.velX;
    }   
    player.y += player.velY;
    if (debug) {
        document.getElementById("stats").style.display = "block"
        document.getElementById("stats").innerHTML = "X: " + player.x + "<br>Y: " + player.y + "<br>velX: " + player.velX + "<br>velY: " + player.velY;
    }
    
    checkLevelChange()
    checkTriggers()
    drawChar();
    requestAnimationFrame(update);
}

document.body.addEventListener("keydown", function(e) {
    keys[e.keyCode] = true;
});
document.body.addEventListener("keyup", function(e) {
    keys[e.keyCode] = false;
});

window.addEventListener("load", function() {
    console.log("Loaded");
    char1Sheet = document.getElementById("char1SpriteSheet");
    setInterval(function () {
        frame++;
        if (frame == 5) {
            frame = 0;
        }
    },250)
    update();
});

canvas.addEventListener("mousedown", getPosition, false);
function getPosition(event) {
  var x = event.x;
  var y = event.y;
  x -= canvas.offsetLeft;
  y -= canvas.offsetTop;
  
}

function checkTriggers() {
    if (!triggers.firstStep) {
        hint(player.x, 30, "Use the arrow keys to move!");
        triggers.firstStep = true;
    }
}

function checkLevelChange() {
    if (player.x < 0) {
        player.x = canvas.width - 5;
        currentLevelInt -= 1;
        currentLevel = levels[currentLevelInt];
        console.log("Previous Level");
    }
    if (player.x > canvas.width) {
        currentLevelInt += 1;
        currentLevel = levels[currentLevelInt];
        console.log("Next Level");
        player.x = 10;
    }
}

function setChar(x) {
    player.char = x;
}
function confirmChar() {
    $("#charSelect").fadeOut();
}
function checkKeys() {
    if (keys[38] || keys[32] || keys[87]) {
        // up arrow or space
        if(!inWater){
            if (!player.jumping && player.grounded) {
                player.jumping = true;
                player.grounded = false;
                
                if(gravityDown) {
                    player.velY = -player.vertiSpeed;
                } else {
                    player.velY = player.vertiSpeed;
                }
            }
        } else {
            if(gravityDown) {
                player.velY = -player.vertiSpeed;
            } else {
                player.velY = player.vertiSpeed;
            }
        }
    }
    if (keys[39] || keys[68]) {
        // right arrow
        player.lastDir = "l"
        if (player.velX < player.horizSpeed) {
            player.velX += player.horizSpeed;
        }
        if ((player.x > 5*units) && (player.x < 10*units)) {
            scrolling = true;
        }
    }
    if (keys[37] || keys[65]) {
        // left arrow
        player.lastDir = "r"
        if (player.velX > -player.horizSpeed) {
            player.velX-= player.horizSpeed;
        }
        if ((player.x > 5*units) && (player.x < 10*units)) {
            scrolling = true;
        }
    }
    if (touchingIce){
        player.vertiSpeed = normalVertiSpeed;
        gravity = normalGravity;
        friction = iceFriction;
    } else if (!inWater || touchingEdge)  {
        player.vertiSpeed = normalVertiSpeed;
        gravity = normalGravity;
        friction = normalFriction;
    } else {
        player.vertiSpeed = waterVertiSpeed;
        gravity = waterGravity;
        friction = waterFriction;
    }
}

function drawChar() {
    if (player.char == 1) {
        player.height = 2*units;
        player.width = 1*units;
        if (player.velX < -1) {
            if (frame > 3) {
                //Facing Right, Left Leg Forward
                ctx.drawImage(char1Sheet,0,0,16,32,player.x,player.y,units,2*units)
            } else {
                ctx.drawImage(char1Sheet,32,0,16,32,player.x,player.y,units,2*units)
            }
        }
        if ((player.velX < 0) && (player.velX > -1)) {
            ctx.drawImage(char1Sheet,32,0,16,32,player.x,player.y,units,2*units)
        }
        if (player.velX > 1) {
            if (frame > 3) {
                ctx.drawImage(char1Sheet,64,0,16,32,player.x,player.y,units,2*units)
            } else {
                ctx.drawImage(char1Sheet,48,0,16,32,player.x,player.y,units,2*units)
            }
        }
        if ((player.velX > 0) && (player.velX < 1)) {
            ctx.drawImage(char1Sheet,48,0,16,32,player.x,player.y,units,2*units)
        }
        
        if ((player.velX == 0) && (player.lastDir == "l")) {
            ctx.drawImage(char1Sheet,48,0,16,32,player.x,player.y,units,2*units)
        }
        if ((player.velX == 0) && (player.lastDir == "r")) {
            ctx.drawImage(char1Sheet,32,0,16,32,player.x,player.y,units,2*units)
        }
        
    }
    if (player.char == 2) {
        //Set Size
        player.height = 36
        player.width = 12
        if ((player.velX > 1) || (player.lastDir == "l")) {
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
        if ((player.velX < -1) || (player.lastDir == "r")) {
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
        if ((player.velX > 1) || (player.lastDir == "l")) {
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
        if ((player.velX < -1) || (player.lastDir == "r")) {
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
function checkPlayerWaterCollision() {
    inWater = false;
    var dir = colCheck(player, currentLevel.water[i],false);
    //Do something depending on the direction the collision happened from.
    if (dir === "l" || dir === "r" || dir === "t" || dir == "b") {
        inWater = true;
        if (player.velY > 13) {
            player.velY--
        }
        if (player.velY > 10) {
            player.velY--
        }
        if (player.velY > 2) {
            player.velY--
        }
        
        if ((player.velY > 1) && (player.velY < 2)) {
            player.velY -= 0.1
        }
    }
}
function drawWater() {
    //Change to blue and begin drawing
    ctx.fillStyle = "#66F";
    ctx.beginPath();
    
    i = currentLevel.water.length;
    while (i--) {
        //Draw each box
        ctx.rect(currentLevel.water[i].x, currentLevel.water[i].y, currentLevel.water[i].width, currentLevel.water[i].height);
        //Figure out whether we've touched a box
        checkPlayerWaterCollision()
    }
    
    //End drawing and fill
    ctx.closePath()
    ctx.fill();
}
function drawSwitches() {
    //Change to pink and begin drawing
    ctx.fillStyle = "#f99";
    ctx.beginPath();
    
    i = currentLevel.switches.length;
    while (i--) {
        //Draw each box
        ctx.rect(currentLevel.switches[i].x, currentLevel.switches[i].y, currentLevel.switches[i].width, currentLevel.switches[i].height);
    }
    
    //End drawing and fill
    ctx.closePath()
    ctx.fill();
}
function checkPlayerDoorCollision() {
    if(currentLevel.doors[i].isOpen) {
        return;
    } else {
        var dir = colCheck(player, currentLevel.doors[i],true);
        //Do something depending on the direction the collision happened from.
        if (dir === "l" || dir === "r") {
            touchingIce = false;
            player.velX = 0;
            player.jumping = false;
        } else if (dir === "b") {
            touchingIce = false;
            if (gravityDown) {
                player.grounded = true;
                player.jumping = false;
            } else {
                player.velY *= -1;
            }
        } else if (dir === "t") {
            touchingIce = false;
            if (gravityDown) {
                player.velY *= -1;
            } else {
                player.grounded = true;
                player.jumping = false;
            }
        } else {
            touchingEdge = false;
        }
    }
}
function checkMobDoorCollision() {
    //Loop through each of the mobs in this level, and see if any of them have collided with a box.
    l = currentLevel.mobs.length
    while (l--) {
        currentLevel.mobs[l].collisionDir = colCheck(currentLevel.mobs[l], currentLevel.door[i], true)
        if (currentLevel.mobs[l].collisionDir === "b") {
            currentLevel.mobs[l].grounded = true
        }
    }
}

function drawDoors() {
    //Change to green and begin drawing
    ctx.fillStyle = "#555";
    ctx.beginPath();
    
    i = currentLevel.doors.length;
    while (i--) {
        //Draw each box
        ctx.rect(currentLevel.doors[i].x, currentLevel.doors[i].y, currentLevel.doors[i].width, currentLevel.doors[i].height);
        //Figure out whether we've touched a box
        checkPlayerDoorCollision()
        checkMobDoorCollision()
    }
    
    //End drawing and fill
    ctx.closePath()
    ctx.fill();
}
function checkPlayerBoxCollision() {
    var dir = colCheck(player, currentLevel.boxes[i],true);
    //Do something depending on the direction the collision happened from.
    if (dir === "l" || dir === "r") {
        touchingIce = false;
        player.velX = 0;
        player.jumping = false;
        if(currentLevel.boxes[i].waterEdge) {touchingEdge = true}
    } else if (dir === "b") {
        touchingIce = false;
        if (gravityDown) {
            player.grounded = true;
            player.jumping = false;
        } else {
            player.velY *= -1;
        }
        if(currentLevel.boxes[i].waterEdge) {touchingEdge = true}
    } else if (dir === "t") {
        touchingIce = false;
        if (gravityDown) {
            player.velY *= -1;
        } else {
            player.grounded = true;
            player.jumping = false;
        }
        if(currentLevel.boxes[i].waterEdge) {touchingEdge = true}
    } else {
        touchingEdge = false;
    }
}
function checkMobBoxCollision() {
    //Loop through each of the mobs in this level, and see if any of them have collided with a box.
    l = currentLevel.mobs.length
    while (l--) {
        currentLevel.mobs[l].collisionDir = colCheck(currentLevel.mobs[l], currentLevel.boxes[i], true)
        if (currentLevel.mobs[l].collisionDir === "b") {
            currentLevel.mobs[l].grounded = true
        }
    }
}
function drawBoxes() {
    //Change to green and begin drawing
    ctx.fillStyle = "#380";
    ctx.beginPath();
    
    i = currentLevel.boxes.length;
    while (i--) {
        //Draw each box
        ctx.rect(currentLevel.boxes[i].x, currentLevel.boxes[i].y, currentLevel.boxes[i].width, currentLevel.boxes[i].height);
        //Figure out whether we've touched a box
        checkPlayerBoxCollision()
        checkMobBoxCollision()
    }
    
    //End drawing and fill
    ctx.closePath()
    ctx.fill();
}
var touchingIce = false;
function checkPlayerIceCollision() {
    var dir = colCheck(player, currentLevel.ice[i],true);
    //Do something depending on the direction the collision happened from.
    if (dir === "l" || dir === "r") {
        player.velX = 0;
        player.jumping = false;
        touchingIce = true;
    } else if (dir === "b") {
        touchingIce = true;
        if (gravityDown) {
            player.grounded = true;
            player.jumping = false;
        } else {
            player.velY *= -1;
        }
    } else if (dir === "t") {
        touchingIce = true;
        if (gravityDown) {
            player.velY *= -1;
        } else {
            player.grounded = true;
            player.jumping = false;
        }
    }
}
function checkMobIceCollision() {
    //Loop through each of the mobs in this level, and see if any of them have collided with a box.
    l = currentLevel.mobs.length
    while (l--) {
        currentLevel.mobs[l].collisionDir = colCheck(currentLevel.mobs[l], currentLevel.ice[i], true)
        if (currentLevel.mobs[l].collisionDir === "b") {
            currentLevel.mobs[l].grounded = true
        }
    }
}
function drawIce() {
    //Change to green and begin drawing
    ctx.fillStyle = "#AAF";
    ctx.beginPath();
    i = currentLevel.ice.length;
    while (i--) {
        //Draw each box
        ctx.rect(currentLevel.ice[i].x, currentLevel.ice[i].y, currentLevel.ice[i].width, currentLevel.ice[i].height);
        //Figure out whether we've touched a box

        checkPlayerIceCollision()
        checkMobIceCollision()
    }
    //End drawing and fill
    ctx.closePath()
    ctx.fill();
}
function drawCollectibles() {
    ctx.beginPath();
    ctx.fillStyle = "orange";
    j = currentLevel.collectibles.length;
    while (j--) {
        if (currentLevel.collectibles[j].collected == false) {
            ctx.rect(currentLevel.collectibles[j].x, currentLevel.collectibles[j].y, currentLevel.collectibles[j].width, currentLevel.collectibles[j].height)
            var collectCheck = colCheck(player, currentLevel.collectibles[j]);
            if (collectCheck === "l" || collectCheck === "r" || collectCheck === "t" || collectCheck === "b") {
                currentLevel.collectibles[j].collected = true;
                if (currentLevel.collectibles[j].type === "coin") {
                    player.collected++
                };
                console.log("Collected")
            }
        }
    }
    ctx.closePath()
    ctx.fill();
}
function checkPlayerMobCollision() {
    currentLevel.mobs[k].hitPlayer = colCheck(currentLevel.mobs[k], player, false)
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
function patrolMobAI() {
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
}
function drawMobs() {
    ctx.beginPath();
    ctx.fillStyle = "#90f";
    k = currentLevel.mobs.length;
    while (k--) {
        if (!currentLevel.mobs[k].dead) {
            ctx.rect(currentLevel.mobs[k].x, currentLevel.mobs[k].y, currentLevel.mobs[k].width, currentLevel.mobs[k].height)
            
            if (currentLevel.mobs[k].type == "patrol") {
                patrolMobAI()
            };
            
            currentLevel.mobs[k].velX *= friction;
            currentLevel.mobs[k].velY += gravity;
            currentLevel.mobs[k].x += currentLevel.mobs[k].velX;
            if (currentLevel.mobs[k].grounded) {
                currentLevel.mobs[k].velY = 0;
                currentLevel.mobs[k].grounded = false;
            }
            currentLevel.mobs[k].y += currentLevel.mobs[k].velY;
            
            checkPlayerMobCollision()
        }
    };
    ctx.closePath();
    ctx.fill();
}
function displayHints() {
    if (!triggers.firstLevel) {
        if ((currentLevelInt == 0) && (player.x > canvas.width - 400)) {
            hint(player.x, 30, "Go to the edge of the screen to go to the next level!");
            triggers.firstLevel = true;
            setTimeout(function() {
                hint(10000, 10000, "")
            }, 3000);
        }
    }
    //if (trigger) { if (location parameters) {hint(); set trigger to true; setTimeout to close}}
}
function colCheck(shapeA, shapeB, solid) {
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
                if (solid) {shapeA.y += oY;}
            } else {
                colDir = "b";
                if (solid) {shapeA.y -= oY;}
            }
        } else {
            if (vX > 0) {
                colDir = "l";
                if (solid) {shapeA.x += oX;}
            } else {
                colDir = "r";
                if (solid) {shapeA.x -= oX;}
            }
        }
    }
    if(debug && logCols && (colDir != null)) {console.log(colDir)};
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
function flipGravity() {
    gravity = gravity * -1;
    gravityDown = !gravityDown;
}
/*
//Notification Triggers
var triggers = {};
triggers.firstStep = false;
triggers.firstLevel = false;
triggers.firstCoin = false;
//Load Level1
currentLevelInt = 0
currentLevel = levels[currentLevelInt];
animating = false
var chosenAnimation = 0
function update() {
    if(animating) {
        animate(chosenAnimation)
    } else {
    //Clear The Last Frame
    ctx.clearRect(0, 0, 40*units, 20*units);

    //Check keys
    checkKeys()
    
    //Factor in Friction and Gravity
    player.velX *= friction;
    player.velY += gravity;
    player.grounded = false;
    
    //Change to green and begins drawing
    ctx.fillStyle = "#380";
    ctx.beginPath();
    
    //Loop through the array of boxes in this level
    drawBoxes();
    
    ctx.closePath()
    ctx.fill();
    ctx.beginPath();
    ctx.fillStyle = "orange";
    
    drawCollectibles()
    
    if (player.x < 0) {
        animating = true;
        player.x = width - 5;
        currentLevelInt -= 1;
        currentLevel = levels[currentLevelInt];
        console.log("Previous Level");
    }
    if (player.x > width) {
        animating = true;
        currentLevelInt += 1;
        currentLevel = levels[currentLevelInt];
        console.log("Next Level");
        player.x = 10;
    }
    ctx.closePath()
    ctx.fill();
    ctx.beginPath();
    ctx.fillStyle = "#90f";
    
    drawMobs()
    
    ctx.closePath()
    ctx.fill()
    if (player.grounded) {
        player.velY = 0;
    }
    if (projectiles.length > 0) {
        //Animate projectiles
        ctx.fill();
        ctx.fillStyle = "brown";
        m = projectiles.length
        while(m--) {
            ctx.fillRect(projectiles[m].x, projectiles[m].y, projectiles[m].height, projectiles[m].width);
            projectiles[m].x += projectiles[m].xIncrement;
            projectiles[m].y += projectiles[m].yIncrement;
        }
    }
    player.x += player.velX;
    player.y += player.velY;
    drawChar()
    //Hint Triggers
    displayHints()
    
        if (debug) {
            document.getElementById("stats").style.display = "block"
            document.getElementById("stats").innerHTML = "X: " + player.x + "<br>Y: " + player.y + "<br>velX: " + player.velX + "<br>velY: " + player.velY;
        }
    }
    requestAnimationFrame(update);
}

animFrame = 0
animations = [
    {
        frames: [0,0.025,0.05,0.075,0.1,0.15,0.2,0.25,0.3,0.4,0.5,0.6,0.7,0.75,0.8,0.85,0.9,0.925,0.95,0.975,1],
        draw: function (y) {
            ctx.fillStyle = "#000"
            ctx.globalAlpha = animations[y].frames[animFrame];
            ctx.beginPath();
            ctx.fillRect(0,0,40*units,40*units);
            ctx.closePath();
            ctx.globalAlpha = 1;
        },
        completed: false,
        onComplete: function(y) {
            console.log("Faded Out!!")
            if (!animations[y].completed) {
                setTimeout(function(){
                    chosenAnimation = 1;
                    animFrame = 0;
                    animations[y].completed = false;
                }, 3000)
            }
            animations[y].completed = true;
        }
    },
    {
        frames: [1,0.975,0.95,0.925,0.9,0.85,0.8,0.75,0.7,0.6,0.5,0.4,0.3,0.25,0.2,0.15,0.1],
        draw: function (y) {
            //Clear The Last Frame
            ctx.clearRect(0, 0, 40*units, 20*units);
            ctx.fillStyle = "#000"
            ctx.globalAlpha = animations[y].frames[animFrame];
            ctx.beginPath();
            ctx.fillRect(0,0,40*units,40*units);
            ctx.closePath();
            ctx.globalAlpha = 1;
        },
        completed: false,
        onComplete: function() {
            console.log("Faded in!")
            chosenAnimation = 0;
            animFrame = 0;
            animating = false;
        }
    }
]

incrementFrame = true

function animate(x) {
    animations[x].draw(x);
    if (animFrame < animations[x].frames.length) {
        if(incrementFrame) {
            setTimeout(function(){
                animFrame++
                incrementFrame = true;
            },50)
            incrementFrame = false
        }
    } else {
        if (typeof(animations[x].onComplete) == typeof(Function)) {
            animations[x].onComplete(x)
        }
    }
}

function setChar(x) {
    player.char = x
}
function confirmChar() {
    $("#charSelect").fadeOut()
}
function drawChar() {
    if (player.char == 1) {
        if (player.velX < -1) {
            if (frame) {
                //Facing Right, Left Leg Forward
                ctx.drawImage(char1Sheet,0,0,16,32,player.x,player.y,units,2*units)
            } else {
                ctx.drawImage(char1Sheet,32,0,16,32,player.x,player.y,units,2*units)
            }
        }
        if ((player.velX < 0) && (player.velX > -1)) {
            ctx.drawImage(char1Sheet,32,0,16,32,player.x,player.y,units,2*units)
        }
        if (player.velX > 1) {
            if (frame) {
                ctx.drawImage(char1Sheet,64,0,16,32,player.x,player.y,units,2*units)
            } else {
                ctx.drawImage(char1Sheet,48,0,16,32,player.x,player.y,units,2*units)
            }
        }
        if ((player.velX > 0) && (player.velX < 1)) {
            ctx.drawImage(char1Sheet,48,0,16,32,player.x,player.y,units,2*units)
        }
        
        if ((player.velX == 0) && (player.lastDir == "l")) {
            ctx.drawImage(char1Sheet,48,0,16,32,player.x,player.y,units,2*units)
        }
        if ((player.velX == 0) && (player.lastDir == "r")) {
            ctx.drawImage(char1Sheet,32,0,16,32,player.x,player.y,units,2*units)
        }
        
    }
    if (player.char == 2) {
        //Set Size
        player.height = 36
        player.width = 12
        if ((player.velX > 1) || (player.lastDir == "l")) {
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
        if ((player.velX < -1) || (player.lastDir == "r")) {
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
        if ((player.velX > 1) || (player.lastDir == "l")) {
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
        if ((player.velX < -1) || (player.lastDir == "r")) {
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
function checkKeys() {
    if (keys[38] || keys[32] || keys[87]) {
        // up arrow or space
        if (!player.jumping && player.grounded) {
            player.jumping = true;
            player.grounded = false;
            if (gravityDown) {
                player.velY = -player.horizSpeed * 2;
            } else {
                player.velY = player.horizSpeed * 2;
            }
        }
    }
    if (keys[39] || keys[68]) {
        // right arrow
        if (player.velX < player.horizSpeed) {
            player.velX+= units/8;
            player.lastDir = "l"
            if (!triggers.firstStep) {
                hint(player.x, 30, "Use the arrow keys to move!");
                triggers.firstStep = true;
            }
        }
    }
    if (keys[37] || keys[65]) {
        // left arrow
        player.lastDir = "r"
        if (player.velX > -player.horizSpeed) {
            player.velX-= units/8;
            if (!triggers.firstStep) {
                hint(player.x, 30, "Use the arrow keys to move!");
                triggers.firstStep = true;
            }
        }
    }
}
function drawBoxes() {
    i = currentLevel.boxes.length;
    while (i--) {
        //draw each one
        ctx.rect(currentLevel.boxes[i].x, currentLevel.boxes[i].y, currentLevel.boxes[i].width, currentLevel.boxes[i].height);
        //Figure out whether we've touched a box
        var dir = colCheck(player, currentLevel.boxes[i]);
        //Do something depending on the direction the collision happened from.
        if (dir === "l" || dir === "r") {
            player.velX = 0;
            player.jumping = false;
        } else if (dir === "b") {
            if (gravityDown) {
                player.grounded = true;
                player.jumping = false;
            } else {
                player.velY *= -1;
            }
        } else if (dir === "t") {
            if (gravityDown) {
                player.velY *= -1;
            } else {
                player.grounded = true;
                player.jumping = false;
            }
        }
        //Loop through each of the mobs in this level, and see if any of them have collided with a box.
        l = currentLevel.mobs.length
        while (l--) {
            currentLevel.mobs[l].collisionDir = colCheck(currentLevel.mobs[l], currentLevel.boxes[i])
            if (currentLevel.mobs[l].collisionDir === "b") {
                currentLevel.mobs[l].grounded = true
            }
        }
    }
    
}
function drawCollectibles() {
    j = currentLevel.collectibles.length;
    while (j--) {
        if (currentLevel.collectibles[j].collected == false) {
            ctx.rect(currentLevel.collectibles[j].x, currentLevel.collectibles[j].y, currentLevel.collectibles[j].width, currentLevel.collectibles[j].height)
            var collectCheck = colCheck(player, currentLevel.collectibles[j]);
            if (collectCheck === "l" || collectCheck === "r" || collectCheck === "t" || collectCheck === "b") {
                currentLevel.collectibles[j].collected = true;
                if (currentLevel.collectibles[j].type === "coin") {
                    player.collected++
                };
                console.log("Collected")
            }
        }
    }
    
}
function drawMobs() {
    k = currentLevel.mobs.length;
    while (k--) {
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
    
}
function displayHints() {
    if (!triggers.firstLevel) {
        if ((currentLevelInt == 0) && (player.x > width - 400)) {
            hint(player.x, 30, "Go to the edge of the screen to go to the next level!");
            triggers.firstLevel = true;
            setTimeout(function() {
                hint(10000, 10000, "")
            }, 3000);
        }
    }
    if (!triggers.firstCoin) {
        if ((currentLevelInt == 2) && (player.x < 100)) {
            hint(player.x, 30, "That Orange thing's a coin! Ten coins give you a powerup! Try and collect all 100!");
            triggers.firstCoin = true;
            setTimeout(function() {
                hint(10000, 10000, "")
            }, 3000);
        }
    }
    
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
function flipGravity() {
    gravity = gravity * -1;
    gravityDown = !gravityDown;
}
function projectile(x,y,targetX,targetY,speed) {
  	this.x = x;
    this.y = y;
    this.targetX = targetX;
    this.targetY = targetY;
    this.deltaX = targetX - x;
    this.deltaY = targetY - y
  	this.speed = speed;
  	this.height = units/3;
  	this.width = units/3;
  	this.angle = Math.atan2(this.deltaY, this.deltaX)
  	this.xIncrement = Math.cos(this.angle) * speed;
    this.yIncrement = Math.sin(this.angle) * speed;
  	this.fire = function() {
      projectiles.push(this);
      console.log(this) 
    };
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
canvas.addEventListener("mousedown", getPosition, false);
function getPosition(event)
{
  var x = event.x;
  var y = event.y;
  x -= canvas.offsetLeft;
  y -= canvas.offsetTop;
  new projectile(player.x,player.y,x,y,6).fire()
}
*/
