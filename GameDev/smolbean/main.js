function saveBean() {
    var d = new Date();
    d.setTime(d.getTime() + (3650*24*60*60*1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = "bean=" + JSON.stringify(player) + "; " + expires;
}

function deleteBean() {
    var expires = "expires=Thu, 01 Jan 1970 00:00:01 GMT";
    document.cookie = "bean=; " + expires;
}

function getBean() {
    var name = "bean=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
    }
    return "";
}

function play() {
    document.getElementById("title").style.display = "none";
    if(getBean() != "") {
        document.getElementById("beanSvg").style.display = "none";
        player = JSON.parse(getBean());
        document.getElementsByTagName("path")[0].style.fill=player.color;
        document.getElementsByTagName("ellipse")[0].style.fill=player.eyecolor;
        document.getElementsByTagName("ellipse")[1].style.fill=player.eyecolor;
    }
}
function createBean() {
    player = new Bean(beanColor.value,beaneyecolor.value,beanName.value+"bean");
    document.getElementById("beanSvg").style.display = "none";
    saveBean();
 
}

window.onload = function() {
  var beanCols = document.querySelectorAll("input[type=color]");
  beanCols[0].onchange = function(e) {
      document.getElementsByTagName("path")[0].style.fill=this.value;
  }
  beanCols[1].onchange = function(e) {
      document.getElementsByTagName("ellipse")[0].style.fill=this.value;
      document.getElementsByTagName("ellipse")[1].style.fill=this.value;
  }
}
function colCheck(shapeA, shapeB) {
    // get the vectors to check against
    var vX = (shapeA.x + (shapeA.w / 2)) - (shapeB.x + (shapeB.w / 2)),
        vY = (shapeA.y + (shapeA.h / 2)) - (shapeB.y + (shapeB.h / 2)),
        // add the half widths and half heights of the objects
        hWidths = (shapeA.w / 2) + (shapeB.w / 2),
        hHeights = (shapeA.h / 2) + (shapeB.h / 2),
        colDir = null;
 
    // if the x and y vector are less than the half width or half height, they we must be inside the object, causing a collision
    if (Math.abs(vX) < hWidths && Math.abs(vY) < hHeights) {         // figures out on which side we are colliding (top, bottom, left, or right)         
      var oX = hWidths - Math.abs(vX),             
          oY = hHeights - Math.abs(vY);         
      if (oX >= oY) {
            if (vY > 0) {
                colDir = "t";
                shapeA.y += oY;
            } else {
                colDir = "b";
                shapeA.y -= oY;
            }
      } else {
            if (vX > 0) {
                colDir = "l";
                shapeA.x += oX;
            } else {
                colDir = "r";
                shapeA.x -= oX;
            }
        }
    }
    return colDir;
}
function updateHUD() {
    document.getElementById("funBar").value    = player.fun;
    document.getElementById("waterBar").value  = player.water;
    document.getElementById("foodBar").value   = player.food;
    document.getElementById("healthBar").value = player.health;
    document.getElementById("socialBar").value = player.social;
    document.getElementById("loveBar").value   = player.love;
    document.getElementById("sleepBar").value  = player.sleep;
    document.getElementById("cleanBar").value  = player.clean;
}

function updateValues() {
    timeDiff = Date.now() - player.lastUpdated;
    modifier = timeDiff / 846000;
    if(Math.floor(modifier) > 0) {
        modifier = Math.floor(modifier);
        player.fun    -= modifier;
        player.water  -= modifier;
        player.food   -= modifier;
        player.health -= modifier;
        player.social -= modifier;
        player.love   -= modifier;
        if(player.sleeping) {
            player.sleep  += 3*modifier;
        } else {
            player.sleep  -= modifier;
        }
        player.clean  -= modifier;
        if(player.fun    < 0) {player.fun    = 0} 
        if(player.water  < 0) {player.water  = 0}  
        if(player.food   < 0) {player.food   = 0} 
        if(player.health < 0) {player.health = 0} 
        if(player.social < 0) {player.social = 0} 
        if(player.love   < 0) {player.love   = 0} 
        if(player.sleep  < 0) {player.sleep  = 0}  
        if(player.sleep  < 0) {player.sleep  = 0}  
        if(player.clean  < 0) {player.clean  = 0}  
        player.lastUpdated = Date.now();

    }
    if(timeDiff > 100) {
        saveBean(); 
        if(player.watching) {
            player.fun++;
        }
        if(player.showering) {
            player.clean++;
        }
    }
}

function getPosition(event) {
    evX = event.x;
    evY = event.y;
    evX -= canvas.offsetLeft;
    evY -= canvas.offsetTop;
    evX = (evX/parseInt(window.getComputedStyle(canvas).width))*canvas.width;
    evY = (evY/parseInt(window.getComputedStyle(canvas).height))*canvas.height;
    checkClickCollisions({
        x:evX,
        y:evY,
        w:1,
        h:1
    });
}

function checkClickCollisions(mouse) {
    console.log(mouse);
    var moved = false;
    if(currentLevel.left) {
       if(colCheck(mouse,{x:36,y:410,w:64,h:80})) {
           player.worldX--;
           moved = true;
       }
    }
    if(currentLevel.right) {
       if(colCheck(mouse,{x:1500,y:410,w:64,h:80})) {
           player.worldX++;
           moved = true;
       }
    }    
    if(currentLevel.above) {
       if(colCheck(mouse,{x:760,y:36,w:80,h:64})) {
           player.worldY--;
           moved = true;
       }
    }
    if(currentLevel.below) {
       if(colCheck(mouse,{x:760,y:800,w:80,h:36})) {
           player.worldY++;
           moved = true
       }
    }
    if((colCheck(mouse,player) !== null) && (!player.jumping) && (player.love < 100)) {
        player.velY -= 6;
        player.jumping = true;
        player.love += 10;
        if (player.love > 100) {
            player.love = 100;
        }
    }
    var i = currentLevel.specialBoxes.length;
    while(i--) {
        if(colCheck(mouse,currentLevel.specialBoxes[i])) {
           console.log("clicked special");
           var sBoxType = currentLevel.specialBoxes[i].type;
           if(sBoxType == "door") {
               player.worldX = currentLevel.specialBoxes[i].data.toX;
               player.worldY = currentLevel.specialBoxes[i].data.toY;
           }
           if(sBoxType == "sink") {
               player.water += 50;
               if (player.water > 100) {
                   player.water = 100;
               }
           }
           if(sBoxType == "fridge") {
               player.food += 50;
               if(player.food > 100) {
                   player.food = 100;
               }
           }
           if(sBoxType == "bed") {
               player.sleeping = !player.sleeping;
               if(player.sleeping) {
                   player.x = currentLevel.specialBoxes[i].data.x;
                   player.y = currentLevel.specialBoxes[i].data.y;
               } else {
                   player.velX += 3;
                   player.velY -= 6;
               }
           }
            if(sBoxType == "shower") {
               player.showering = !player.showering;
           }
           if(sBoxType == "tv") {
               player.watching = !player.watching;
           }
       }
    }
    if (moved) {
        player.sleeping = false;
        player.showering = false;
        player.watching = false;
    }
}

function drawArrows() {
    if(currentLevel.left) {
        ctx.fillStyle = "#fd0"
        ctx.beginPath();
        ctx.moveTo(100,410);
        ctx.lineTo(100,490);
        ctx.lineTo(36,450);
        ctx.fill();
    }    
    if(currentLevel.right) {
        ctx.fillStyle = "#fd0"
        ctx.beginPath();
        ctx.moveTo(1500,410);
        ctx.lineTo(1500,490);
        ctx.lineTo(1564,450);
        ctx.fill();
    }    
    if(currentLevel.above) {
        ctx.fillStyle = "#fd0"
        ctx.beginPath();
        ctx.moveTo(760,100);
        ctx.lineTo(840,100);
        ctx.lineTo(800,36);
        ctx.fill();
    }
    if(currentLevel.below) {
        ctx.fillStyle = "#fd0"
        ctx.beginPath();
        ctx.moveTo(760,800);
        ctx.lineTo(840,800);
        ctx.lineTo(800,864);
        ctx.fill();
    }
}
