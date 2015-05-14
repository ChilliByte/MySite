(<canvas id="canvas"></canvas>
<script>
function () {
    var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
    window.requestAnimationFrame = requestAnimationFrame;
})();

var canvas = document.getElementById("canvas"),
    ctx = canvas.getContext("2d"),
    width = 600,
    height = 500,
    player = {
        x: width / 2,
        y: height - 15,
        width: 5,
        height: 5,
        speed: 3,
        velX: 0,
        velY: 0,
        jumping: false,
        grounded: false
    },
    keys = [],
    friction = 0.8,
    gravity = 0.3;

var boxes = [];

// dimensions
boxes.push({
    x: 250,
    y: 200,
    width: 100,
    height: 100
});

canvas.width = width;
canvas.height = height;

function update() {
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = "black";
    ctx.beginPath();
    
    ctx.rect(boxes[0].x, boxes[0].y, boxes[0].width, boxes[0].height);
    ctx.fill();    
    
    var dir = newColCheck(player, boxes[0]);
    if (dir === "l") {
      ctx.fillStyle = "green";
    } else if (dir === "r") {
      ctx.fillStyle = "blue";
    } else if (dir === "b") {
      ctx.fillStyle = "yellow";
    } else if (dir === "t") {
      ctx.fillStyle = "purple";
    } else {
      ctx.fillStyle = "red";
    }
    ctx.fillRect(player.x, player.y, 100, 100);

    requestAnimationFrame(update);
}

function newColCheck(shapeA, shapeB) {
  colDir = ""// get the vectors to check against
    if ((shapeB.x < shapeA.x + shapeA.width) && (shapeB.y < shapeA.y + shapeA.height) && (shapeA.x < shapeB.x + shapeB.width)) {colDir = "t"}
    /*if ((shapeA.x < shapeB.x)) {colDir = "b"}
    if ((shapeA.x < shapeB.x)) {colDir = "l"}
    if ((shapeA.x < shapeB.x)) {colDir = "r"}*/
    return colDir;
}

function colCheck(shapeA, shapeB) {
    // get the vectors to check against
    var vX = (shapeA.x + (shapeA.width / 2)) - (shapeB.x + (shapeB.width / 2)),
        vY = (shapeA.y + (shapeA.height / 2)) - (shapeB.y + (shapeB.height / 2)),
        // add the half widths and half heights of the objects
        hWidths = (shapeA.width / 2) + (shapeB.width / 2),
        hHeights = (shapeA.height / 2) + (shapeB.height / 2),
        colDir = null;

    // if the x and y vector are less than the half width or half height, they we must be inside the object, causing a collision
    if (Math.abs(vX) < hWidths && Math.abs(vY) < hHeights) {
        // figures out on which side we are colliding (top, bottom, left, or right)
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

document.body.addEventListener("keydown", function (e) {
    keys[e.keyCode] = true;
});

document.body.addEventListener("keyup", function (e) {
    keys[e.keyCode] = false;
});

canvas.addEventListener("mousemove", function (event) {
    player.x = (event.pageX - 10);
    player.y = (event.pageY - 10);
});

window.addEventListener("load", function () {
    update();
});
</script>
