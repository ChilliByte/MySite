document.body.addEventListener("keydown", function(e) {
    keys[e.keyCode] = true;
});
document.body.addEventListener("keyup", function(e) {
    keys[e.keyCode] = false;
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

    if ((keys[83] || keys[40]) && player.powerups.doors) {
        openKeyPressed = true;
    } else {
        openKeyPressed = false;
    }
    
    if((keys[87]) && (player.powerups.antigrav)) {
        flipGravity();
    }
}
