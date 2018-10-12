//Just some set up
var canvas,ctx,sb, au, aa,uL,aL,sE,theta;
var config = {
    angle:0,
    distance:0,
    permExt:false
};
var springRestLength = 97/*mm*/
var springMaxExtension = 0.1/*mm*/
var g = 9.81;

function runCode() {
    if(validInput() && validConfig()) {
        findAngle();
        drawConfig();
        findDistance();
        /*createDataString();
        output(data);*/
        output("valid")
    } else {
        output("Please make sure the inputs are filled with valid numbers. The first two should be integers from 0-19 inclusive, and the last one 0-8 inclusive.");   
    }
}

window.onload = function() {
    document.getElementById("run").addEventListener("click", runCode);
    document.getElementsByTagName("input")[0].addEventListener("input", runCode);
    document.getElementsByTagName("input")[1].addEventListener("input", runCode);
    document.getElementsByTagName("input")[2].addEventListener("input", runCode);
    canvas = document.getElementById("canv");
    ctx = canvas.getContext("2d");
    canvas.width = 500;
    canvas.height = 500;
    ctx.rect(20, 480, 300, 12);
    ctx.rect(170, 282, 12, 210);
    ctx.fill()
}

function validInput() {
    sb = parseInt(document.getElementsByTagName("input")[0].value);
    au = parseInt(document.getElementsByTagName("input")[1].value);
    aa = parseInt(document.getElementsByTagName("input")[2].value);
    //fetch the values and check they're in range
    if(sb !== "" && au !== "" && aa !== "" && sb >=0 && au >= 0 && aa >= 0 && sb < 20 && au < 20 && aa < 9) {
        if(Math.abs(uL - aL) > springMaxExtension) {
            return false    
        }
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
    uL = (au-sb)*10;
    aL = 50 + (10*aa);
    sE = springRestLength;
    //see if the spring can natrually come to a rest
    if((Math.abs(uL - aL)) > springRestLength) {
        config.permExt = true;    
        sE = Math.abs(uL - aL);
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
    ctx.lineWidth = 3;
    ctx.rect(20, 480, 300, 12);
    ctx.rect(170, 282, 12, 210);
    ctx.fill()
    //draw the spring
    ctx.fillStyle = "#bbb";
    ctx.strokeStyle = "#bbb";
    ctx.beginPath();
    var y1Val = 470 - 10*sb; 
    ctx.arc(176,y1Val,4,0,2*Math.PI);
    var x2Val = 176 + aL*Math.sin(theta); 
    console.log("x2 calc:");
    console.log(aL,theta,Math.sin(theta));
    console.log("x2 value: " + x2Val);
    var y2Val = 470 - 10*au + aL*Math.cos(theta);; 
    console.log("y2 calc:");
    console.log(au,theta,Math.cos(theta));
    console.log("x2 value: " + x2Val);
    ctx.arc(x2Val,y2Val,4,0,2*Math.PI);
    ctx.fill()
    ctx.beginPath();
    ctx.moveTo(176,y1Val);
    ctx.lineTo(x2Val,y2Val);    
    ctx.stroke();
    //draw the arm
    ctx.fillStyle = "#888";
    ctx.strokeStyle = "#888";
    ctx.beginPath();
    ctx.lineWidth=12
    ctx.moveTo(x2Val,y2Val);
    var y3Val = 470 - 10*au;
    var x4Val = 176-((300-aL)*Math.sin(theta));
    var y4Val = y3Val - ((300-aL)*Math.cos(theta));
    ctx.lineTo(x4Val,y4Val);
    ctx.stroke();
    ctx.beginPath();
    ctx.fillStyle = "#bbb";
    ctx.strokeStyle = "#bbb";
    ctx.arc(176,y3Val,4,0,2*Math.PI);
    ctx.fill()
    console.log(x4Val,y4Val);
}

function findDistance() {
    var springConstant = prompt("Enter the spring constant");
    var mass = prompt("enter the mass of the projectile");
    var releaseVelocity = Math.sqrt(springConstant/mass)*springMaxExtension;
    var distance = releaseVelocity*Math.cos(theta)/g*(releaseVelocity*Math.sin(theta)+Math.sqrt((releaseVelocity*releaseVelocity*Math.sin(theta)*Math.sin(theta)) + 2*9.81*1));
    config.distance = distance;
}    

function output(str) {
    document.getElementById("output").innerHTML = str;    
}
