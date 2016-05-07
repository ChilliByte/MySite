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
