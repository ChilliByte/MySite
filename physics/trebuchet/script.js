//Just some set up
var canvas,ctx,sb, au, aa,uL,aL,sE,theta,data;
var config = {
    angle:0,
    distance:0,
    permExt:false
};
var springRestLength = 97;/*mm*/
var springMaxExtension = 100;/*mm*/
var g = 9.81;//m/s^2
var mass = 0.1;//kg
var springConstant = 400;//N/m

function runCode() {
    sb = parseInt(document.getElementsByTagName("input")[0].value);
    au = parseInt(document.getElementsByTagName("input")[1].value);
    aa = parseInt(document.getElementsByTagName("input")[2].value);
    springRestLength = 97;/*mm*/
    springMaxExtension = 100;/*mm*/
    g = 9.81;//m/s^2
    mass = 0.1;//kg
    springConstant = 400;//N/m
    if(validInput(sb,au,aa) && validConfig(sb,au,aa)) {
        findAngle(sb,au,aa);
        drawConfig();
        findDistance(sb,au,aa);
        createDataString();
        output(data);
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

function validInput(sB,aU,aA) {
    //fetch the values and check they're in range
    if(sB !== "" && aU !== "" && aA !== "" && sB >=0 && aU >= 0 && aA >= 0 && sB < 20 && aU < 20 && aA < 9) {
        uL = (aU-sB)*10;
        aL = 50 + (10*aA);
        sE = springRestLength;
        return true
    }
    return false
}
//The spring must be below the arm pivot
function validConfig(sB,aU,aA) {
    if(sB < aU) { return true}
    
    if(Math.abs(uL - aL) > springMaxExtension+springRestLength) {
            return false    
    }
    return false;
}

function findAngle(SB,AU,AA) {
    //find the side lengths of the spring-upright-arm triangle
  
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
    var y2Val = 470 - 10*au + aL*Math.cos(theta);; 
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
}

function findDistance(sb,au,aa) {
    //check max ext
    if((300 - aL) < ((au+1)*10)) {
        if((uL + aL) < springMaxExtension+springRestLength)  {
            springMaxExtension = uL+aL-springRestLength;
        }
    } else {
        maxDeflectionAngle = Math.PI - theta - Math.acos(((au+1)*10)/(300-aL));
        maxExt = Math.sqrt(aL*aL + uL*uL + 2*aL*uL*Math.cos(Math.PI - maxDeflectionAngle)) - springRestLength;
        if (maxExt < springMaxExtension) {
            springMaxExtension = maxExt;
        }
    }
    var releaseVelocity = Math.sqrt(springConstant/mass)*springMaxExtension/1000;
    var distance = releaseVelocity*Math.cos(theta)/g*(releaseVelocity*Math.sin(theta)+Math.sqrt((releaseVelocity*releaseVelocity*Math.sin(theta)*Math.sin(theta)) + 2*9.81*1));
    config.distance = distance;
}    

function genTable() {
    data = "";
    for(var armHolePos = 0; armHolePos < 9; armHolePos++) {
        data +="Arm Hole chosen," + armHolePos + "\n";
        for(var springBoltPos = 0; springBoltPos < 20; springBoltPos++) {
            data += "Spring Hole: " + springBoltPos + ","
            for(var armBoltPos = 0; armBoltPos < 20; armBoltPos++) {
                if(validInput(springBoltPos,armBoltPos,armHolePos) && validConfig(springBoltPos,armBoltPos,armHolePos)) {
                    springRestLength = 97;/*mm*/
                    springMaxExtension = 100;/*mm*/
                    g = 9.81;//m/s^2
                    mass = 0.1;//kg
                    springConstant = 400;//N/m   
                    findAngle(springBoltPos,armBoltPos,armHolePos);
                    findDistance(springBoltPos,armBoltPos,armHolePos);
                    data += "Arm Bolt Location: " + armBoltPos + ", angle: " + config.angle + ", distance: " + config.distance + ",";
                }
                else {
                    data += "Invalid config,0,0,";    
                }
            }
            data += "\n";
        }
        data += "\n \n";
    }
}

function createDataString() {
    data = "For the settings chosen, the trebuchet rests at an angle of " + config.angle + " degrees from the horizontal. <br/><br/>" +
           "This catapult can launch the projectile a distance of " + config.distance + "meters.";
}

function output(str) {
    document.getElementById("output").innerHTML = str;    
}
