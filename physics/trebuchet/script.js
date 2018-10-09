var canvas,ctx,sb, au, aa,uL,aL,sE;
var config = {
    valid:false,
    reason:"",
    angle:0,
    distance:0,
    permExt:false
};
var springRestLength = 97/*mm*/

window.onload = function() {
    document.getElementById("run").addEventListener("click", function(){
        if(validInput() && validConfig()) {
            findAngle();
            /*findDistance();
            drawConfig();
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
    ctx.rect(480, 480, 300, 12);
    ctx.rect(630, 282, 12, 210);
    ctx.fill()
}

function validInput() {
    sb = document.getElementsByTagName("input")[0].value;
    au = document.getElementsByTagName("input")[1].value;
    aa = document.getElementsByTagName("input")[2].value;
    if(sb !== "" && au !== "" && aa !== "" && sb >=0 && au >= 0 && aa >= 0 && sb < 20 && au < 20 && aa < 9) {
        return true
    }
    return false
}

function validConfig() {
    if(sb < au) { return true;}
    return false;
}

function findAngle() {
    uL = au-sb*10;
    aL = 50 + 10*aa;
    sE = springRestLength;
    if((uL - aL) > springRestLength) {
        config.permExt = true;    
        sE = uL - aL;
    }
    theta = (Math.PI/2) - Math.acos(((aL*aL)+(uL*uL)-(sE*sE))/(2*aL*uL));
    output(theta);
    /*
    cosine rule a2 = b2 + c2 - 2bccosA
    a = sE
    b = aL
    c = uL
    A = theta
    cos A = b2 +c2 - a2 all over 2bc
    */
}

function output(str) {
    document.getElementById("output").innerHTML = str;    
}
