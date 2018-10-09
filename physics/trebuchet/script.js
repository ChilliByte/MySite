var canvas,ctx,sb, au, aa;
var config = {
    valid:false,
    reason:"",
    angle:0,
    distance:0,
    permExt:false
};

window.onload = function() {
    document.getElementById("run").addEventListener("click", function(){
        if(validInput() && validConfig()) {
            /*findAngle();
            findDistance();
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

function output(str) {
    document.getElementById("output").innerHTML = str;    
}
