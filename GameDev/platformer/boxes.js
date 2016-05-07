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
    ctx.fillStyle = currentLevel.boxColor;
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