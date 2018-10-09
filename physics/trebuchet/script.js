//Just some set up
var canvas,ctx,sb, au, aa,uL,aL,sE,theta;
var config = {
    angle:0,
    distance:0,
    permExt:false
};
var springRestLength = 97/*mm*/

window.onload = function() {
    document.getElementById("run").addEventListener("click", function(){
        if(validInput() && validConfig()) {
            findAngle();
            drawConfig();
            /*findDistance();
            createDataString();
            output(data);*/
            alert("valid")
        } else {
            output("Please make sure the inputs are filled with valid numbers. The first two should be integers from 0-19 inclusive, and the last one 0-8 inclusive.");   
        }
    });
    canvas = document.getElementById("canv");
    ctx = canvas.getContext("2d");
    canvas.width = 500;
    canvas.height = 500;
    ctx.rect(20, 480, 300, 12);
    ctx.rect(170, 282, 12, 210);
    ctx.fill()
}

function validInput() {
    sb = document.getElementsByTagName("input")[0].value;
    au = document.getElementsByTagName("input")[1].value;
    aa = document.getElementsByTagName("input")[2].value;
    //fetch the values and check they're in range
    if(sb !== "" && au !== "" && aa !== "" && sb >=0 && au >= 0 && aa >= 0 && sb < 20 && au < 20 && aa < 9) {
        return true
    }
    return false
}
//The spring must be below the arm pivot
function validConfig() {
    if(sb < au) { return true;}
    return false;
}

function findAngle() {
    //find the side lengths of the spring-upright-arm triangle
    uL = au-sb*10;
    aL = 50 + 10*aa;
    sE = springRestLength;
    //see if the spring can natrually come to a rest
    if((uL - aL) > springRestLength) {
        config.permExt = true;    
        sE = uL - aL;
    }
    //cosine rule to find the side, taken away from 90 to find the complementary angle, converted to degrees
    theta = Math.acos(((aL*aL)+(uL*uL)-(sE*sE))/(2*aL*uL));
    config.angle = ((Math.PI/2) - theta) * (180/Math.PI);
}

function drawConfig() {
    //clear the canvas
    ctx.clearRect(0,0,1000,1000);
    //draw the base and upright
    ctx.fillStyle = "#000";
    ctx.rect(20, 480, 300, 12);
    ctx.rect(170, 282, 12, 210);
    ctx.fill()
    //draw the spring
    ctx.fillStyle = "#888";
    ctx.beginPath();
    var y1Val = 470 - 10*sb; 
    ctx.arc(176,y1Val,4,0,2*Math.PI);
    var x2Val = 176 + aL*Math.sin(theta); 
    var y2Val = 470 - 10*au - aL*Math.cos(theta);; 
    ctx.arc(176,y1Val,4,0,2*Math.PI);
    ctx.moveTo(176,y1Val);
    ctx.lineTo(x2Val,y2Val);    
    ctx.fill()
    console.log(y1Val,x2Val,y2Val);
}
function output(str) {
    document.getElementById("output").innerHTML = str;    
}
