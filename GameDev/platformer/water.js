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