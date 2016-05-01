//Set Level to 1
currentLevelInt = 0
currentLevel = levels[currentLevelInt];
//Game Event Handler
var triggers = {};
triggers.firstStep = false;
(function() {
    var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
    window.requestAnimationFrame = requestAnimationFrame;
})();

function update() {
    //Clear The Last Frame
    ctx.clearRect(0, 0, 40 * units, 20 * units);

    //Check keys
    checkKeys()

    //Choose the right frictional and grvitational coefficients
    if (touchingIce) {
        player.vertiSpeed = normalVertiSpeed;
        gravity = normalGravity;
        friction = iceFriction;
    } else if (!inWater || touchingEdge) {
        player.vertiSpeed = normalVertiSpeed;
        gravity = normalGravity;
        friction = normalFriction;
    } else {
        player.vertiSpeed = waterVertiSpeed;
        gravity = waterGravity;
        friction = waterFriction;
    }
    
    if ((player.powerups.glide) && (player.isGliding)) {
        gravity = 0.15;
    } 
    
    if(!gravityDown) {
        gravity *= -1;
    }
    
    //Factor in Friction and Gravity
    player.velX *= friction;
    player.velY += gravity;

    player.grounded = false;

    drawProjectiles();
    drawBoxes();
    drawWater();
    drawIce();
    drawSwitches();
    drawDoors();
    drawCollectibles();
    drawMobs();
    drawCrates();
    
    if(player.powerups.shrink) {
        player.height = units;
    } else {
        player.height = 2*units;
    }
    
    if (player.grounded) {
        player.velY = 0;
    }

    if ((player.lastDir == "r") && (currentLevel.offset < 0)) {
        scrolling = false;
    }
    if ((player.lastDir == "l") && (currentLevel.offset > currentLevel.width - (tilesX * units))) {
        scrolling = false;
    }

    if ((player.x < 9 * units) && (currentLevel.offset > 0)) {
        player.x = 9.0000001 * units;
        scrolling = true;
        player.velX = -4;
        console.log("Pushing Forward");
    }
    if ((player.x > 10 * units) && (currentLevel.offset < currentLevel.width - (tilesX * units))) {
        player.x = 9.999999999 * units;
        scrolling = true;
        player.velX = 4;
        console.log("Pushing Backward");
    }

    if (!scrolling) {
        player.x += player.velX;
    } else {
        if (Math.abs(player.velX) > 3) {
            scrollLevel(player.velX);
            currentLevel.offset += player.velX;
        }
    }
    player.y += player.velY;
    if (debug) {
        document.getElementById("stats").style.display = "block"
        document.getElementById("stats").innerHTML = "X: " + player.x + ", <br>Units: " + player.x / units + "<br>Y: " + player.y + ",<br> Units: " + player.y / units + "<br>velX: " + player.velX + "<br>velY: " + player.velY + "<br>Scrolling? " + scrolling + "<br>Open key: " + openKeyPressed;
    }
    if (player.y > canvas.height) {
        player.health = 0;
    }
    if (player.health < 1) {
        alert("You died");
        player.x = units;
        player.y = 12*units;
        player.velX = 0;
        player.velY = 0;
        scrollLevel(currentLevel.offset*-1);
        currentLevel.offset = 0;
        if(player.lives < 0) {
            currentLevelInt = 0;
            resetCount = levels.length;
            while (resetCount--){
                currentLevel = levels[resetCount];
                scrollLevel(currentLevel.offset*-1);
                currentLevel.offset = 0;
            }
            currentLevel = levels[0];
            alert("Game Over");
            player.lives = 2;
        }
        player.health = 200;
    } else {
        checkLevelChange();
    }
    displayHints();
    drawChar();
    drawHUD();
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
    setInterval(function() {
        frame++;
        if (frame == 5) {
            frame = 0;
        }
    }, 250)
    update();
});

canvas.addEventListener("mousedown", getPosition, false);

function getPosition(event) {
    if (player.powerups.shoot) {
        evX = event.x;
        evY = event.y;
        evX -= canvas.offsetLeft;
        evY -= canvas.offsetTop;
        evX = evX * (units / tileDisplayWidth);
        evY = evY * (units / tileDisplayWidth);
        dx = evX - (player.x + units / 4);
        dy = (player.y + units) - evY;
        length = Math.sqrt((dx * dx) + (dy * dy));
        cosTheta = ((length * length) + (dx * dx) - (dy * dy)) / (2 * length * dx)
        theta = toDegrees(Math.acos(cosTheta));
        if (dy < 0) {
            theta = 360 - theta;
        }
        currentLevel.projectiles.push(new Projectile(player.x, player.y, theta, units / 5, 0.125, 0.125, player.velX))
    }
}

function scrollLevel(scrollX) {
    i = currentLevel.boxes.length
    while (i--) {
        currentLevel.boxes[i].x -= scrollX;
    }
    i = currentLevel.water.length
    while (i--) {
        currentLevel.water[i].x -= scrollX;
    }
    i = currentLevel.ice.length
    while (i--) {
        currentLevel.ice[i].x -= scrollX;
    }
    i = currentLevel.switches.length
    while (i--) {
        currentLevel.switches[i].x -= scrollX;
        currentLevel.doors[i].x -= scrollX;
    }
    i = currentLevel.projectiles.length
    while (i--) {
        currentLevel.projectiles[i].x -= scrollX;
    }
    i = currentLevel.crates.length
    while (i--) {
        currentLevel.crates[i].x -= scrollX;
    }
    i = currentLevel.mobs.length
    while (i--) {
        currentLevel.mobs[i].x -= scrollX;
    }
    i = currentLevel.collectibles.length
    while (i--) {
        currentLevel.collectibles[i].x -= scrollX;
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

function drawHUD() {
    ctx.fillStyle = "#F00";
    ctx.beginPath();
    ctx.rect(units,units, player.health,units);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = "#FFF";
    ctx.beginPath();
    ctx.font = "24px Arial";
    ctx.fillText(player.health,units*1.5,units*1.75);
    ctx.closePath();
    ctx.fill();
    
    ctx.fillStyle = "orange";
    ctx.beginPath();
    ctx.rect(38*units,units, units,units);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = "#FFF";
    ctx.beginPath();
    ctx.font = "24px Arial";
    ctx.fillText(player.collected,units*38.2,units*1.75);
    ctx.closePath();
    ctx.fill();
}

function checkKeys() {
    if (keys[38] || keys[32]) {
        // up arrow or space
        if (!inWater) {
            if (!player.jumping && player.grounded) {
                player.jumping = true;
                player.grounded = false;

                if (gravityDown) {
                    player.velY = -player.vertiSpeed;
                } else {
                    player.velY = player.vertiSpeed;
                }
            }
        } else {
            if (gravityDown) {
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
        if ((player.x > 9 * units) && (player.x < 10 * units)) {
            scrolling = true;
        }
    }
    if (keys[37] || keys[65]) {
        // left arrow
        player.lastDir = "r"
        if (player.velX > -player.horizSpeed) {
            player.velX -= player.horizSpeed;
        }
        if ((player.x > 9 * units) && (player.x < 10 * units)) {
            scrolling = true;
        }
    }

    if (keys[83] || keys[40]) {
        openKeyPressed = true;
    } else {
        openKeyPressed = false;
    }
    
    if((keys[87]) && (player.powerups.antigrav)) {
        flipGravity();
    }
}

function drawChar() {
    if (player.char == 1) {
        if (player.velX < -1) {
            if (frame > 3) {
                //Facing Right, Left Leg Forward
                ctx.drawImage(char1Sheet, 0, 0, 16, 32, player.x, player.y, units, 2 * units)
            } else {
                ctx.drawImage(char1Sheet, 32, 0, 16, 32, player.x, player.y, units, 2 * units)
            }
        }
        if ((player.velX < 0) && (player.velX > -1)) {
            ctx.drawImage(char1Sheet, 32, 0, 16, 32, player.x, player.y, units, 2 * units)
        }
        if (player.velX > 1) {
            if (frame > 3) {
                ctx.drawImage(char1Sheet, 64, 0, 16, 32, player.x, player.y, units, 2 * units)
            } else {
                ctx.drawImage(char1Sheet, 48, 0, 16, 32, player.x, player.y, units, 2 * units)
            }
        }
        if ((player.velX > 0) && (player.velX < 1)) {
            ctx.drawImage(char1Sheet, 48, 0, 16, 32, player.x, player.y, units, 2 * units)
        }

        if ((player.velX == 0) && (player.lastDir == "l")) {
            ctx.drawImage(char1Sheet, 48, 0, 16, 32, player.x, player.y, units, 2 * units)
        }
        if ((player.velX == 0) && (player.lastDir == "r")) {
            ctx.drawImage(char1Sheet, 32, 0, 16, 32, player.x, player.y, units, 2 * units)
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
    var dir = colCheck(player, currentLevel.water[i], false);
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
        if (!player.powerups.swim) {
            player.health--
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

function checkPlayerSwitchCollision() {
    if (openKeyPressed) {
        if (!triggered) {
            var dir = colCheck(player, currentLevel.switches[i], false);
            //Do something depending on the direction the collision happened from.
            if (dir === "l" || dir === "r" || dir === "b" || dir === "t") {
                currentLevel.switches[i].isOn = !currentLevel.switches[i].isOn;
                console.log("Switch Number " + i + " toggled. Is on? " + currentLevel.switches[i].isOn)
                currentLevel.doors[i].isOpen = currentLevel.switches[i].isOn;
            } else {
                touchingEdge = false;
            }
            triggered = true;
        }
    } else {
        triggered = false;
    }
}

function drawSwitches() {
    //Change to pink and begin drawing
    ctx.fillStyle = "#f99";
    ctx.beginPath();

    i = currentLevel.switches.length;
    while (i--) {
        //Draw each box
        checkPlayerSwitchCollision();
        ctx.rect(currentLevel.switches[i].x, currentLevel.switches[i].y, currentLevel.switches[i].width, currentLevel.switches[i].height);
    }

    //End drawing and fill
    ctx.closePath()
    ctx.fill();
}

function checkPlayerDoorCollision() {
    var dir = colCheck(player, currentLevel.doors[i], true);
    //Do something depending on the direction the collision happened from.
    if (dir === "l" || dir === "r") {
        touchingIce = false;
        player.velX = 0;
        player.jumping = false;
        scrolling = false;
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
        if (!currentLevel.doors[i].isOpen) {
            //Draw each box
            ctx.rect(currentLevel.doors[i].x, currentLevel.doors[i].y, currentLevel.doors[i].width, currentLevel.doors[i].height);
            //Figure out whether we've touched a box
            checkPlayerDoorCollision()
            checkMobDoorCollision()
        }
    }

    //End drawing and fill
    ctx.closePath()
    ctx.fill();
}

function checkPlayerBoxCollision() {
    var dir = colCheck(player, currentLevel.boxes[i], true);
    //Do something depending on the direction the collision happened from.
    if (dir === "l" || dir === "r") {
        touchingIce = false;
        player.velX = 0;
        player.jumping = false;
        scrolling = false;
        if (currentLevel.boxes[i].waterEdge) {
            touchingEdge = true
        }
    } else if (dir === "b") {
        touchingIce = false;
        if (gravityDown) {
            player.grounded = true;
            player.jumping = false;
        } else {
            player.velY *= -1;
        }
        if (currentLevel.boxes[i].waterEdge) {
            touchingEdge = true
        }
    } else if (dir === "t") {
        touchingIce = false;
        if (gravityDown) {
            player.velY *= -1;
        } else {
            player.grounded = true;
            player.jumping = false;
        }
        if (currentLevel.boxes[i].waterEdge) {
            touchingEdge = true
        }
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

function checkPlayerIceCollision() {
    var dir = colCheck(player, currentLevel.ice[i], true);
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

function moveProjectiles() {
    currentLevel.projectiles[i].x += currentLevel.projectiles[i].velX;
    currentLevel.projectiles[i].y -= currentLevel.projectiles[i].velY;
    currentLevel.projectiles[i].velY -= gravity / 4;
    /*
    currentLevel.projectiles[i].velX = Math.sqrt((currentLevel.projectiles[i].speed * currentLevel.projectiles[i].speed) - (currentLevel.projectiles[i].velY * currentLevel.projectiles[i].velY));
    if ((currentLevel.projectiles[i].theta > 90) && (currentLevel.projectiles[i].theta < 270)) {
        currentLevel.projectiles[i].velX = -1 * Math.abs(currentLevel.projectiles[i].velX);
    }
    */

}

function checkProjectileBoxCollision() {
    j = currentLevel.boxes.length;
    while (j--) {
        var dir = colCheck(currentLevel.projectiles[i], currentLevel.boxes[j], false);
        //Do something depending on the direction the collision happened from.
        if (dir === "l" || dir === "r" || dir === "b" || dir === "t") {
            currentLevel.projectiles[i].y = canvas.height + 10;
        }
    }
}

function checkProjectileCrateCollision() {
    j = currentLevel.crates.length;
    while (j--) {
        var dir = colCheck(currentLevel.projectiles[i], currentLevel.crates[j], false);
        //Do something depending on the direction the collision happened from.
        if (dir === "l" || dir === "r" || dir === "b" || dir === "t") {
            currentLevel.projectiles[i].y = canvas.height + 10;
            currentLevel.crates[j].broken = true;
        }
    }
}

function drawProjectiles() {
    //Change to green and begin drawing
    ctx.fillStyle = "#F00";
    ctx.beginPath();
    i = currentLevel.projectiles.length;
    while (i--) {
        //Draw each box
        ctx.rect(currentLevel.projectiles[i].x, currentLevel.projectiles[i].y, currentLevel.projectiles[i].height, currentLevel.projectiles[i].width);
        //Figure out whether we've touched a box
        moveProjectiles();
        checkProjectileBoxCollision();
        checkProjectileCrateCollision();
        if ((currentLevel.projectiles[i].y > canvas.height) || (currentLevel.projectiles[i].x > canvas.width)) {
            currentLevel.projectiles.splice(i, 1)
        }
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
    currentLevel.mobs[k].hitPlayer = colCheck(currentLevel.mobs[k], player, true);
    if (currentLevel.mobs[k].hitPlayer === "t") {
        currentLevel.mobs[k].dead = true;
        console.log("Hit Mob Top")
    }
    if (currentLevel.mobs[k].hitPlayer === "l") {
        player.velY -= 2;
        player.velX -= 8;
        currentLevel.mobs[k].velX += 5;
        console.log("Hit Mob Left");
        player.health -= 10;
    }
    if (currentLevel.mobs[k].hitPlayer === "r") {
        player.velY -= 2;
        player.velX += 8;
        currentLevel.mobs[k].velX -= 5;
        console.log("Hit Mob Right");
        player.health -= 10;
    }
    if (currentLevel.mobs[k].hitPlayer === "b") {
        player.velY -= 2;
        player.velX -= 8;
        console.log("Hit Mob Bottom");
        player.health -= 20;
    }
}

function patrolMobAI() {
    if (mobDir == "right") {
        if (currentLevel.mobs[k].velX < currentLevel.mobs[k].speed) {
            currentLevel.mobs[k].velX++;
        }
        if ((currentLevel.mobs[k].x + currentLevel.offset) > currentLevel.mobs[k].x2Limit) {
            mobDir = "left";
            currentLevel.mobs[k].x -= 5
        }
    }
    if (mobDir == "left") {
        if (currentLevel.mobs[k].velX > -currentLevel.mobs[k].speed) {
            currentLevel.mobs[k].velX--;
        }
        if ((currentLevel.mobs[k].x+currentLevel.offset) < currentLevel.mobs[k].x1Limit) {
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
        if ((!currentLevel.mobs[k].dead) && (currentLevel.mobs[k].x < 40*units)) {
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

function checkPlayerCrateCollision() {
    var dir = colCheck(player, currentLevel.crates[i], true);
    //Do something depending on the direction the collision happened from.
    if (dir === "l" || dir === "r") {
        currentLevel.crates[i].velX = player.velX;
        player.velX *= 0.75;
        player.jumping = false;
    } else if (dir === "b") {
        touchingIce = false;
        if (gravityDown) {
            player.grounded = true;
            player.jumping = false;
        } else {
            currentLevel.crates[i].broken = true;
        }
    } else if (dir === "t") {
        touchingIce = false;
        if (gravityDown) {
            currentLevel.crates[i].broken = true;
        } else {
            player.grounded = true;
            player.jumping = false;
        }
    } else {
        touchingEdge = false;
    }
}

function checkCrateBoxCollision() {
    j = currentLevel.boxes.length;
    while (j--) {
        var dir = colCheck(currentLevel.crates[i], currentLevel.boxes[j], true);
        //Do something depending on the direction the collision happened from.
        if (dir === "l" || dir === "r") {
            currentLevel.crates[i].velX = 0;
            player.velX *= 0;
            currentLevel.crates[i].grounded = true;
        } else if (dir === "b") {
            if (gravityDown) {
                currentLevel.crates[i].grounded = true;
            } else {
                currentLevel.crates[i].broken = true;
            }
        } else if (dir === "t") {
            if (gravityDown) {
                currentLevel.crates[i].broken = true;
            } else {
                currentLevel.crates[i].grounded = true;
            }
        }
    }
}

function checkCrateIceCollision() {
    j = currentLevel.ice.length;
    while (j--) {
        var dir = colCheck(currentLevel.crates[i], currentLevel.ice[j], true);
        //Do something depending on the direction the collision happened from.
        if (dir === "l" || dir === "r") {
            currentLevel.crates[i].velX = 0;
            player.velX *= 0;
            currentLevel.crates[i].grounded = true;
        } else if (dir === "b") {
            if (gravityDown) {
                currentLevel.crates[i].grounded = true;
            } else {
                currentLevel.crates[i].broken = true;
            }
        } else if (dir === "t") {
            if (gravityDown) {
                currentLevel.crates[i].broken = true;
            } else {
                currentLevel.crates[i].grounded = true;
            }
        }
    }
}


function drawCrates() {
    ctx.beginPath();
    ctx.fillStyle = "#FF6";
    i = currentLevel.crates.length;
    while (i--) {
        if (!currentLevel.crates[i].broken) {
            ctx.rect(currentLevel.crates[i].x, currentLevel.crates[i].y, currentLevel.crates[i].width, currentLevel.crates[i].height)

            currentLevel.crates[i].velX *= friction;
            currentLevel.crates[i].velY += gravity;
            currentLevel.crates[i].x += currentLevel.crates[i].velX;
            if (currentLevel.crates[i].grounded) {
                currentLevel.crates[i].velY = 0;
                currentLevel.crates[i].grounded = false;
            }
            currentLevel.crates[i].y += currentLevel.crates[i].velY;

            checkPlayerCrateCollision();
            checkCrateBoxCollision();
            checkCrateIceCollision();
        }
    };
    ctx.closePath();
    ctx.fill();
}

function displayHints() {
    if (!triggers.firstLevel) {
        if ((currentLevelInt == 0) && (currentLevel.offset > 1)) {
            hint(player.x, 30, "Go to the right to get to the end of the level!");
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
                if (solid) {
                    shapeA.y += oY;
                }
            } else {
                colDir = "b";
                if (solid) {
                    shapeA.y -= oY;
                }
            }
        } else {
            if (vX > 0) {
                colDir = "l";
                if (solid) {
                    shapeA.x += oX;
                }
            } else {
                colDir = "r";
                if (solid) {
                    shapeA.x -= oX;
                }
            }
        }
    }
    if (debug && logCols && (colDir != null)) {
        console.log(colDir)
    };
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
hint(player.x, 30, "A and D to move, Space to Jump!");
setTimeout(function() {
    hint(10000, 10000, "")
}, 5000);
