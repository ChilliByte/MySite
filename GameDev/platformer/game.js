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
    ctx.fillStyle = currentLevel.bgColor;
    ctx.fillRect(0, 0, 40 * units, 20 * units)
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

    if (!gravityDown) {
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

    if (player.powerups.shrink) {
        player.height = units;
    } else {
        player.height = 2 * units;
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
        hint((window.innerWidth/2)-150,(window.innerHeight/2)-50,"You died");
        setTimeout(function() {
            hint(10000, 10000, "");
        }, 5000);
        player.x = units;
        player.y = 12 * units;
        player.velX = 0;
        player.velY = 0;
        scrollLevel(currentLevel.offset * -1);
        currentLevel.offset = 0;
        scrolling = false;
        if (player.lives < 0) {
            currentLevelInt = 0;
            resetCount = levels.length;
            while (resetCount--) {
                currentLevel = levels[resetCount];
                scrollLevel(currentLevel.offset * -1);
                currentLevel.offset = 0;
            }
            currentLevel = levels[0];
            alert("Game Over");
            player.lives = 2;
        }
        player.health = 200;
        respawnMobs();
    } else {
        checkLevelChange();
    }
    displayHints();
    drawChar();
    drawHUD();
    requestAnimationFrame(update);
}

window.addEventListener("load", function() {
    console.log("Loaded");
    char1Sheet = document.getElementById("char1SpriteSheet");
    heartImg = document.getElementById("heartIcon");
    setInterval(function() {
        frame++;
        if (frame == 5) {
            frame = 0;
        }
    }, 250);
    update();
});

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
    ctx.fillStyle = "#E22";
    ctx.beginPath();
    ctx.rect(units, units, player.health, units);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = "#FFF";
    ctx.beginPath();
    ctx.font = "24px Arial";
    ctx.fillText(player.health, units * 2, units * 1.75);
    ctx.closePath();
    ctx.fill();
    ctx.textAlign = 'center';
    ctx.fillStyle = "#ea2";
    ctx.beginPath();
    ctx.rect(38 * units, units, units, units);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = "#FFF";
    ctx.beginPath();
    ctx.font = "24px Arial";
    ctx.fillText(player.collected, units * 38.5, units * 1.75);
    ctx.closePath();
    ctx.fill();
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

function completeWorld1() {
    level4.doors[0].isOpen = true;
    level4.doors[1].isOpen = true;
    level4.collectibles.push(new Collectible(19, 10, 2, 2, "blue"));
}

hint(player.x, 30, "A and D to move, Space to Jump!");
setTimeout(function() {
    hint(10000, 10000, "");
}, 5000);