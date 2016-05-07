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
        currentLevel.mobs[l].collisionDir = colCheck(currentLevel.mobs[l], currentLevel.doors[i], true)
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
