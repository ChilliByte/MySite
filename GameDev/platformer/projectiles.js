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

function checkProjectileMobCollision() {
    j = currentLevel.mobs.length;
    while (j--) {
        var dir = colCheck(currentLevel.projectiles[i], currentLevel.mobs[j], false);
        //Do something depending on the direction the collision happened from.
        if (dir === "l" || dir === "r" || dir === "b" || dir === "t") {
            currentLevel.projectiles[i].y = canvas.height + 10;
            currentLevel.mobs[j].health--;
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
        checkProjectileMobCollision();
        checkProjectileCrateCollision();
        if ((currentLevel.projectiles[i].y > canvas.height) || (currentLevel.projectiles[i].x > canvas.width)) {
            currentLevel.projectiles.splice(i, 1)
        }
    }
    //End drawing and fill
    ctx.closePath()
    ctx.fill();
}
