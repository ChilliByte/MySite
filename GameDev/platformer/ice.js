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
    ctx.fillStyle = "#DFF";
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