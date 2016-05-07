function drawCollectibles() {
    ctx.beginPath();        
    ctx.fillStyle = "#ea2";
    j = currentLevel.collectibles.length;
    while (j--) {
        if (currentLevel.collectibles[j].collected == false) {
            //ctx.drawImage(heartImg,currentLevel.collectibles[j].x, currentLevel.collectibles[j].y, currentLevel.collectibles[j].width, currentLevel.collectibles[j].height);
            ctx.rect(currentLevel.collectibles[j].x, currentLevel.collectibles[j].y, currentLevel.collectibles[j].width, currentLevel.collectibles[j].height);
            var collectCheck = colCheck(player, currentLevel.collectibles[j]);
            if (collectCheck === "l" || collectCheck === "r" || collectCheck === "t" || collectCheck === "b") {
                currentLevel.collectibles[j].collected = true;
                if (currentLevel.collectibles[j].type === "coin") {
                    player.collected++
                };
                if (currentLevel.collectibles[j].type === "health") {
                    player.health+=10;
                };
                if (currentLevel.collectibles[j].type === "red") {
                    player.reds++;
                };
                console.log("Collected")
            }
        }
    }
    ctx.closePath()        
    ctx.fill();
}
