var svg;
function Bean(color,name) {
  this.x = 10;
  this.y = 10;
  this.velX = 0;
  this.velY = 0;
  this.name = name;
  this.color = color;
  this.fun = 100;
  this.food = 100;
  this.water = 100;
  this.love = 100;
}
var Deep = new Bean("#07E","Deep");
function drawBean(bean) {
  if(bean.fun < 50) {
  } else if (bean.food < 50) {
  } else if (bean.water < 50) {
  } else if (bean.love < 50) {
  } else {
    svg = '<svg width="64" height="64" xmlns="http://www.w3.org/2000/svg">'+
              ' <g>'+
              '    <title>background</title>'+
              '    <rect fill="none" id="canvas_background" height="402" width="582" y="-1" x="-1"/>'+
              '  </g>'+
              '  <g>'+
              '    <title>Layer 1</title>'+
              '    <g id="svg_2">'+
              '      <path fill="'+bean.color+'" fill-opacity="null" stroke="#000" stroke-width="1.5" stroke-linejoin="null" stroke-linecap="null" stroke-opacity="null" d="m9,92c-8,-46.72376 1.0663,-91 53,-91c51.9337,0 19,83.13812 61,82c42,-1.13812 21.98343,61.61188 11.47514,73.14641c-10.50829,11.53453 -31.50829,12.85359 -57.47514,12.85359c-51.9337,0 -60,-30.27624 -68,-77z" id="svg_1"/>'+
              '      <ellipse fill="#333" stroke="#000" stroke-width="1.5" stroke-opacity="null" fill-opacity="null" cx="46.5" cy="72.5" id="svg_4" rx="7" ry="7"/>'+
              '      <ellipse fill="#333" stroke-width="1.5" stroke-opacity="null" fill-opacity="null" cx="71.5" cy="68" id="svg_5" rx="7" ry="7" stroke="#000"/>'+
              '      <path fill="#f99" fill-opacity="null" stroke-width="1.5" stroke-linejoin="null" stroke-linecap="null" stroke-opacity="null" d="m50.25,91.98459c0,-8.29581 6.71271,-4.35229 15,-4.35229c8.28729,0 15,-3.94351 15,4.35229c0,8.29581 -6.71271,15.01541 -15,15.01541c-8.28729,0 -15,-6.7196 -15,-15.01541z" id="svg_7" stroke="#000" transform="rotate(-10 65.24999999999974,96.84779357910153) "/>'+
              '    </g>'+
              '  </g>'+
              '</svg>';
  }
  document.getElementById(beanSvg).innerHTML = svg;
}
