var shadeEditor;
var isTint;
function getRandomRed() {
  shadeEditor = Math.floor(Math.random()*120);
  isTint = Math.random()<.5;
  if(isTint) {
    return "rgb(255," + shadeEditor + "," + shadeEditor + ")"
  } else {
    shadeEditor = 255 - shadeEditor
    return "rgb(" + shadeEditor + ",0,0)"    
  }
}
var tilesX = 12;
var tileWidth = Math.ceil(window.innerWidth/tilesX);
var tilesY = Math.ceil(window.innerHeight/tileWidth);
document.getElementsByTagName("svg")[0].style.height = tileWidth * tilesY;
document.getElementsByTagName("svg")[0].style.width  = tileWidth * tilesX;
var xPos = 0;
var yPos = 0;
var counter = 0;
loopVar = Math.ceil(window.innerWidth/tileWidth) * Math.ceil(window.innerHeight/tileWidth) + (5 * tilesX);
var svgns = "http://www.w3.org/2000/svg";
var css = "";
for (var x = 0; x < loopVar; x++) {
    var rect = document.createElementNS(svgns, 'rect');
    rect.setAttributeNS(null, 'x', xPos);
    rect.setAttributeNS(null, 'y', yPos);     
    rect.setAttributeNS(null, 'height', ''+tileWidth);
    rect.setAttributeNS(null, 'width', ''+tileWidth);
    rect.setAttributeNS(null, 'fill', getRandomRed());
    rect.setAttributeNS(null, 'id', "rectangle"+x)
    rect.setAttributeNS(null, 'class', "rect")
    document.getElementById('svgOne').appendChild(rect);
    if (Math.random()>0.9) {
      css+="@keyframes rectAnimNum" + x + "{0% {fill:" + getRandomRed() + ";} 100% {fill:" + getRandomRed() + ";}} #rectangle"+x +" {animation: rectAnimNum" + x + " 5s linear 2s infinite alternate;}"
    }
    xPos += tileWidth;
    counter++
    if (counter > tilesX) {
      xPos = 0;
      counter = 0;
      yPos+=tileWidth;
    }
}
window.onload = function() {
    window.addEventListener('scroll', function () {
        console.log("scrolling");
        document.body.classList[
            document.body.scrollTop > document.querySelector("section:nth-child(4)").offsetTop + 60 ? 'add': 'remove'
        ]('scrolled');
    });
}
