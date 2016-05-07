function checkPlayerMobCollision() {
    currentLevel.mobs[k].hitPlayer = colCheck(currentLevel.mobs[k], player, true);
    if (currentLevel.mobs[k].hitPlayer === "t") {
        currentLevel.mobs[k].health--;
        player.velY *= -0.85;
        console.log("Hit Mob Top")
    }
    if (currentLevel.mobs[k].hitPlayer === "l") {
        player.velY -= 2;
        player.velX -= 8;
        currentLevel.mobs[k].velX += 5;
        console.log("Hit Mob Left");
        player.health -= currentLevel.mobs[k].damage;
    }
    if (currentLevel.mobs[k].hitPlayer === "r") {
        player.velY -= 2;
        player.velX += 8;
        currentLevel.mobs[k].velX -= 5;
        console.log("Hit Mob Right");
        player.health -= currentLevel.mobs[k].damage;
    }
    if (currentLevel.mobs[k].hitPlayer === "b") {
        player.velY -= 2;
        player.velX -= 8;
        console.log("Hit Mob Bottom");
        player.health -= currentLevel.mobs[k].damage;
    }
}

function patrolMobAI() {
    if (currentLevel.mobs[k].mobDir == "right") {
        if (currentLevel.mobs[k].velX < currentLevel.mobs[k].speed) {
            currentLevel.mobs[k].velX++;
        }
        if ((currentLevel.mobs[k].x + currentLevel.offset) > currentLevel.mobs[k].x2Limit) {
            currentLevel.mobs[k].mobDir = "left";
            currentLevel.mobs[k].x -= 5
        }
    }
    if (currentLevel.mobs[k].mobDir == "left") {
        if (currentLevel.mobs[k].velX > -currentLevel.mobs[k].speed) {
            currentLevel.mobs[k].velX--;
        }
        if ((currentLevel.mobs[k].x+currentLevel.offset) < currentLevel.mobs[k].x1Limit) {
            currentLevel.mobs[k].mobDir = "right";
            currentLevel.mobs[k].x += 5
        }
    }
}
function flyingPatrolMobAI() {
    if (currentLevel.mobs[k].mobDir == "down") {
        if (currentLevel.mobs[k].velY < currentLevel.mobs[k].speed) {
            currentLevel.mobs[k].velY++;
        }
        if ((currentLevel.mobs[k].y + currentLevel.offset) > currentLevel.mobs[k].x2Limit) {
            currentLevel.mobs[k].mobDir = "up";
            currentLevel.mobs[k].y -= 5
        }
    }
    if (currentLevel.mobs[k].mobDir == "up") {
        if (currentLevel.mobs[k].velY > -currentLevel.mobs[k].speed) {
            currentLevel.mobs[k].velY--;
        }
        if ((currentLevel.mobs[k].y+currentLevel.offset) < currentLevel.mobs[k].x1Limit) {
            currentLevel.mobs[k].mobDir = "down";
            currentLevel.mobs[k].y += 5
        }
    }
}
function leftMobAI() {
    if (currentLevel.mobs[k].velX > -currentLevel.mobs[k].speed) {
        currentLevel.mobs[k].velX--;
    }
}
function rightMobAI(){
    if (currentLevel.mobs[k].velX < currentLevel.mobs[k].speed) {
        currentLevel.mobs[k].velX++;
    }
}
function boss1AI() {
    patrolMobAI();
    if(Math.random()  0.05) {
        console.log("random");
    }
    if ((currentLevel.mobs[k].health === 0) && (currentLevel.mobs[k].width > units)) {
        currentLevel.mobs.push(new Mob(20, 10, (currentLevel.mobs[k].width/units)-2, (currentLevel.mobs[k].width/units)-2, currentLevel.mobs[k].speed + 2, "boss1", 8, 32, 100, 3));
        currentLevel.mobs[k].health = -1;
    } else if((currentLevel.mobs[k].width == units) && ((currentLevel.mobs[k].health === 0)) {
        completeWorld1();
    }
}
function drawMobs() {
    ctx.beginPath();
    ctx.fillStyle = "#dd335a";
    k = currentLevel.mobs.length;
    while (k--) {
        if ((!currentLevel.mobs[k].dead) && (currentLevel.mobs[k].x < 40*units) && (currentLevel.mobs[k].x > (-1*currentLevel.mobs[k].width))) {
            if(currentLevel.mobs[k].health == 0) {
                currentLevel.mobs[k].dead = true;
            }
            ctx.rect(currentLevel.mobs[k].x, currentLevel.mobs[k].y, currentLevel.mobs[k].width, currentLevel.mobs[k].height);
            
            if (currentLevel.mobs[k].type == "patrol") {
                patrolMobAI();
            };
            if (currentLevel.mobs[k].type == "left") {
                leftMobAI();
            };
            if (currentLevel.mobs[k].type == "right") {
                rightMobAI();
            };
            if (currentLevel.mobs[k].type == "flyingpatrol1") {
                currentLevel.mobs[k].velY -= gravity;
                patrolMobAI();
            };
            
            if ((currentLevel.mobs[k].type == "flyingpatrol2") || (currentLevel.mobs[k].type == "thwomp")) {
                if(currentLevel.mobs[k].mobDir == "right") {
                    currentLevel.mobs[k].mobDir = "down";
                }
                if (currentLevel.mobs[k].type == "flyingpatrol2") {
                    currentLevel.mobs[k].velY -= gravity;    
                }
                flyingPatrolMobAI();
            };
            
            if (currentLevel.mobs[k].type == "boss1") {
                boss1AI();
            };
            
            
            currentLevel.mobs[k].velX *= friction;
            currentLevel.mobs[k].velY += gravity;
            currentLevel.mobs[k].x += currentLevel.mobs[k].velX;
            if (currentLevel.mobs[k].grounded) {
                currentLevel.mobs[k].velY = 0;
                currentLevel.mobs[k].grounded = false;
            }
            currentLevel.mobs[k].y += currentLevel.mobs[k].velY;
            if(currentLevel.mobs[k].y > 40*units) {
                currentLevel.mobs[k].dead = true;
            }
            checkPlayerMobCollision();
        }
    };
    ctx.closePath();
    ctx.fill();
}
