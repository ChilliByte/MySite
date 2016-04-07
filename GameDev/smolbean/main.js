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
    if((colCheck(mouse,player) !== null) && (!player.jumping) && (player.love < 100)) {
        player.velY -= 6;
        player.jumping = true;
        player.love += 10;
        if (player.love > 100) {
            player.love = 100;
        }
    }
}
