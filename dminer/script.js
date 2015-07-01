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
var tilesY = 8;
var tileWidth = Math.ceil(window.innerWidth/tilesX)
document.getElementsByTagName("svg")[0].height = tileWidth * tilesY;
document.getElementsByTagName("svg")[0].width  = tileWidth * tilesX;
var svgns = "http://www.w3.org/2000/svg";
for (var x = 0; x < 100; x++) {
    var rect = document.createElementNS(svgns, 'rect');
    rect.setAttributeNS(null, 'x', xPos);
    rect.setAttributeNS(null, 'y', yPos);     
    rect.setAttributeNS(null, 'height', '50');
    rect.setAttributeNS(null, 'width', '50');
    rect.setAttributeNS(null, 'fill', getRandomRed());
    document.getElementById('svgOne').appendChild(rect);
    }
}
