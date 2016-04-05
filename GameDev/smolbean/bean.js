var svg,player;
function Bean(color,eyecol,name) {
  this.x = 10;
  this.y = 10;
  this.velX = 0;
  this.velY = 0;
  this.name = name;
  this.color = color;
  this.eyecolor = eyecol
  this.fun = 100;
  this.food = 100;
  this.water = 100;
  this.love = 100;
  this.state = "Content";
}
function createBean() {
  player = new Bean(beanColor.value,beaneyecolor.value,beanName.value);
}
function drawBean(bean) {
  if((bean.water == 100) && (bean.food == 100) && (bean.love == 100) && (bean.fun == 10)) { 
    svg = '<svg width="165" height="169" xmlns="http://www.w3.org/2000/svg">'+
          ' <g>'+
          '  <title>background</title>'+
          '  <rect fill="none" id="canvas_background" height="171" width="167" y="-1" x="-1"/>'+
          ' </g>'+
          ' <g>'+
          '   <title>Layer 1</title>'+
          '   <path fill="'+ bean.color+'" fill-opacity="null" stroke="#000" stroke-width="1.5" stroke-linejoin="null" stroke-linecap="null" stroke-opacity="null" d="m9,92c-8,-46.72376 1.0663,-91 53,-91c51.9337,0 19,83.13812 61,82c42,-1.13812 21.98343,61.61188 11.47514,73.14641c-10.50829,11.53453 -31.50829,12.85359 -57.47514,12.85359c-51.9337,0 -60,-30.27624 -68,-77z" id="svg_1"/>'+
          '   <path stroke="#000" fill="#f99" fill-opacity="null" stroke-width="1.5" stroke-linejoin="null" stroke-linecap="null" stroke-opacity="null" d="m33.159,105.23217c0,-20.96475 18.11972,-10.99889 40.48973,-10.99889c22.37001,0 40.48973,-9.96584 40.48973,10.99889c0,20.96475 -18.11972,37.94619 -40.48973,37.94619c-22.37001,0 -40.48973,-16.98143 -40.48973,-37.94619z" id="svg_7" transform="rotate(-13.678772926330566 73.64873504638662,117.52222442626955) "/>'+
          '   <path id="svg_3" d="m119,57" opacity="0.5" fill-opacity="null" stroke-opacity="null" stroke-width="1.5" stroke="#000" fill="#fff"/>'+
          '   <path id="svg_16" d="m20,74" opacity="0.5" fill-opacity="null" stroke-opacity="null" stroke-width="1.5" stroke="#000" fill="#fff"/>'+
          '   <path id="svg_17" d="m6,67" opacity="0.5" fill-opacity="null" stroke-opacity="null" stroke-width="1.5" stroke="#000" fill="#fff"/>'+
          '   <path stroke="#000" id="svg_18" d="m25,80.95473c6.09527,-33.54869 34.86756,-18.87236 29.88648,8.33363" fill-opacity="null" stroke-opacity="null" stroke-width="1.5" fill="'+bean.color+'"/>'+
          '   <path stroke="#000" id="svg_20" d="m63,72.95473c6.09527,-33.54869 34.86756,-18.87236 29.88648,8.33363" fill-opacity="null" stroke-opacity="null" stroke-width="1.5" fill="'+bean.color+'"/>'+
          '   <path transform="rotate(20 139.93428039550776,34.88282775878907) " id="svg_21" d="m133.99838,47.23848c-10.66661,-7.5106 -14.48035,-12.26167 -14.51125,-18.07784c-0.02819,-5.30215 4.67968,-10.41951 9.55855,-10.39c2.43629,0.01477 7.66229,1.96625 9.51283,3.55231c0.93241,0.79915 1.37405,0.72035 3.44997,-0.6156c5.64977,-3.63589 11.16683,-3.7122 14.73992,-0.20388c5.71056,5.60704 4.67089,12.30288 -2.9887,19.24827c-4.07228,3.69257 -12.96523,10.2434 -13.90573,10.2434c-0.28618,0 -2.92119,-1.6905 -5.85558,-3.75666l0,0z" fill-opacity="null" stroke-opacity="null" stroke-width="1.5" stroke="#000" fill="#f99"/>'+
          '  </g>'+
          '</svg>'
  } else if ((bean.water < 50) || (bean.food  < 50)) {
    svg = '<svg width="165" height="169" xmlns="http://www.w3.org/2000/svg">'+
          ' <g>'+
          '  <title>background</title>'+
          '  <rect fill="none" id="canvas_background" height="171" width="167" y="-1" x="-1"/>'+
          ' </g>'+
          ' <g>'+
          '  <title>Layer 1</title>'+
          '  <path fill="'+ bean.color+'" fill-opacity="null" stroke="#000" stroke-width="1.5" stroke-linejoin="null" stroke-linecap="null" stroke-opacity="null" d="m9,92c-8,-46.72376 1.0663,-91 53,-91c51.9337,0 19,83.13812 61,82c42,-1.13812 21.98343,61.61188 11.47514,73.14641c-10.50829,11.53453 -31.50829,12.85359 -57.47514,12.85359c-51.9337,0 -60,-30.27624 -68,-77z" id="svg_1"/>'+
          '  <ellipse fill="'+ bean.eyecolor + '" stroke="#000" stroke-width="1.5" stroke-opacity="null" fill-opacity="null" cx="46.5" cy="72.5" id="svg_4" rx="7" ry="7"/>'+
          '  <ellipse fill="' + bean.eyecolor + '" stroke-width="1.5" stroke-opacity="null" fill-opacity="null" cx="71.5" cy="68" id="svg_5" rx="7" ry="7" stroke="#000"/>'+
          '  <path stroke="#f55" fill="#fff" fill-opacity="null" stroke-width="1.5" stroke-linejoin="null" stroke-linecap="null" stroke-opacity="null" d="m49.14874,90.41111c0,-3.60119 6.71271,-1.88932 15,-1.88932c8.28729,0 15,-1.71187 15,1.88932c0,3.60119 -6.71271,6.51815 -15,6.51815c-8.28729,0 -15,-2.91696 -15,-6.51815z" id="svg_7" transform="rotate(171 64.14874267578125,92.52222442626953) "/>'+
          '  <rect stroke="#000" fill="#fff" stroke-width="1.5" x="52" y="45" width="108" height="11" id="svg_3" transform="rotate(-51 106,50.5) "/>'+
          '  <line stroke="#F00" fill="none" stroke-width="1.5" stroke-opacity="null" fill-opacity="null" x1="72" y1="92" x2="133" y2="18" id="svg_6" stroke-linejoin="null" stroke-linecap="null"/>'+
          ' </g>'+
          '</svg>';
  } else if (bean.love  < 50) {
    svg = '<svg width="165" height="169" xmlns="http://www.w3.org/2000/svg">'+
          ' <g>'+
          '  <title>background</title>'+
          '  <rect fill="none" id="canvas_background" height="171" width="167" y="-1" x="-1"/>'+
          ' </g>'+
          ' <g>'+
          '  <title>Layer 1</title>'+
          '  <path fill="'+bean.color+'" fill-opacity="null" stroke="#000" stroke-width="1.5" stroke-linejoin="null" stroke-linecap="null" stroke-opacity="null" d="m9,92c-8,-46.72376 1.0663,-91 53,-91c51.9337,0 19,83.13812 61,82c42,-1.13812 21.98343,61.61188 11.47514,73.14641c-10.50829,11.53453 -31.50829,12.85359 -57.47514,12.85359c-51.9337,0 -60,-30.27624 -68,-77z" id="svg_1"/>'+
          '  <ellipse fill="'+bean.eyecolor+'" stroke="#000" stroke-width="1.5" stroke-opacity="null" fill-opacity="null" cx="46.5" cy="72.5" id="svg_4" rx="7" ry="7"/>'+
          '  <ellipse fill="'+bean.eyecolor+'" stroke-width="1.5" stroke-opacity="null" fill-opacity="null" cx="71.5" cy="68" id="svg_5" rx="7" ry="7" stroke="#000"/>'+
          '  <path stroke="#000" fill="#fff" fill-opacity="null" stroke-width="1.5" stroke-linejoin="null" stroke-linecap="null" stroke-opacity="null" d="m32.159,98.23217c0,-20.96475 18.11972,-10.99889 40.48973,-10.99889c22.37001,0 40.48973,-9.96584 40.48973,10.99889c0,20.96475 -18.11972,37.94619 -40.48973,37.94619c-22.37001,0 -40.48973,-16.98143 -40.48973,-37.94619z" id="svg_7" transform="rotate(171 72.64873504638672,110.52222442626953) "/>'+
          '  <path id="svg_3" d="m119,57" opacity="0.5" fill-opacity="null" stroke-opacity="null" stroke-width="1.5" stroke="#000" fill="#fff"/>'+
          '  <path transform="rotate(-31 94.17671966552732,46.579029083251946) " stroke="#000" id="svg_2" d="m77.8357,48.74821c-7.84099,6.10994 17.61592,-11.89435 25.20317,-10.7879c7.58725,1.10645 8.96113,4.17365 8.96113,8.02177c0,3.84813 -2.49402,7.46855 -8.40106,9.12822c-5.90704,1.65968 -17.92226,-12.47203 -25.76324,-6.3621z" stroke-opacity="null" stroke-linecap="null" stroke-linejoin="null" stroke-width="1.5" fill-opacity="null" fill="#fff"/>'+
          '  <path stroke="#000" id="svg_8" d="m100.8357,64.74821c-7.84099,6.10994 17.61592,-11.89435 25.20317,-10.7879c7.58726,1.10645 8.96113,4.17364 8.96113,8.02177c0,3.84813 -2.49402,7.46855 -8.40106,9.12823c-5.90704,1.65967 -17.92225,-12.47204 -25.76324,-6.3621z" stroke-opacity="null" stroke-linecap="null" stroke-linejoin="null" stroke-width="1.5" fill-opacity="null" fill="#fff"/>'+
          '  <path transform="rotate(10 132.17671203613287,36.57902908325187) " stroke="#000" id="svg_9" d="m115.8357,38.74821c-7.84099,6.10994 17.61592,-11.89435 25.20317,-10.7879c7.58726,1.10645 8.96113,4.17364 8.96113,8.02177c0,3.84813 -2.49402,7.46855 -8.40106,9.12823c-5.90704,1.65967 -17.92225,-12.47204 -25.76324,-6.3621z" stroke-opacity="null" stroke-linecap="null" stroke-linejoin="null" stroke-width="1.5" fill-opacity="null" fill="#fff"/>'+
          '  <path transform="rotate(6 23.158197402954094,55.691001892089844) " stroke="#000" id="svg_10" d="m42.91382,57.9739c9.47944,6.43025 -21.29693,-12.5179 -30.46961,-11.35344c-9.17269,1.16445 -10.83364,4.39244 -10.83364,8.4423c0,4.04986 3.01517,7.86008 10.15654,9.60677c7.14137,1.74668 21.66727,-13.12587 31.14671,-6.69563z" stroke-opacity="null" stroke-linecap="null" stroke-linejoin="null" stroke-width="1.5" fill-opacity="null" fill="#fff"/>'+
          '  <path transform="rotate(-46 17.158193588256815,97.69100952148439) " stroke="#000" id="svg_12" d="m36.91382,99.9739c9.47944,6.43025 -21.29693,-12.5179 -30.4696,-11.35344c-9.17269,1.16445 -10.83365,4.39243 -10.83365,8.4423c0,4.04986 3.01517,7.86008 10.15654,9.60677c7.14137,1.74667 21.66728,-13.12588 31.14671,-6.69563z" stroke-opacity="null" stroke-linecap="null" stroke-linejoin="null" stroke-width="1.5" fill-opacity="null" fill="#fff"/>'+
          ' </g>'+
          '</svg>';
  } else if (bean.fun   < 50) { 
    svg = '<svg width="165" height="169" xmlns="http://www.w3.org/2000/svg">'+
          ' <g>'+
          '  <title>background</title>'+
          '  <rect fill="none" id="canvas_background" height="171" width="167" y="-1" x="-1"/>'+
          ' </g>'+
          ' <g>'+
          '  <title>Layer 1</title>'+
          '  <g id="svg_2">'+
          '   <path fill="'+bean.color+'" fill-opacity="null" stroke="#000" stroke-width="1.5" stroke-linejoin="null" stroke-linecap="null" stroke-opacity="null" d="m9,92c-8,-46.72376 1.0663,-91 53,-91c51.9337,0 19,83.13812 61,82c42,-1.13812 21.98343,61.61188 11.47514,73.14641c-10.50829,11.53453 -31.50829,12.85359 -57.47514,12.85359c-51.9337,0 -60,-30.27624 -68,-77z" id="svg_1"/>'+
          '   <ellipse fill="'+bean.eyecolor+'" stroke="#000" stroke-width="1.5" stroke-opacity="null" fill-opacity="null" cx="46.5" cy="72.5" id="svg_4" rx="7" ry="7"/>'+
          '   <ellipse fill="'+bean.eyecolor+'" stroke-width="1.5" stroke-opacity="null" fill-opacity="null" cx="71.5" cy="68" id="svg_5" rx="7" ry="7" stroke="#000"/>'+
          '   <path stroke="#000" fill="#f99" fill-opacity="null" stroke-width="1.5" stroke-linejoin="null" stroke-linecap="null" stroke-opacity="null" d="m50.25,91.98459c0,-8.29581 6.71271,-4.35229 15,-4.35229c8.28729,0 15,-3.94351 15,4.35229c0,8.29581 -6.71271,15.01541 -15,15.01541c-8.28729,0 -15,-6.7196 -15,-15.01541z" id="svg_7" transform="rotate(171 65.25,96.8478012084961) "/>'+
          '  </g>'+
          ' </g>'+
          '</svg>';
  } else{
    svg = '<svg width="165" height="169" xmlns="http://www.w3.org/2000/svg">'+
          '<g>'+
          '<title>background</title>'+
          '<rect fill="none" id="canvas_background" height="402" width="582" y="-1" x="-1"/>'+
          '</g>'+
          '<g>'+
          '<title>Layer 1</title>'+
          '<g id="svg_2">'+
          '<path fill="'+ bean.color+'" fill-opacity="null" stroke="#000" stroke-width="1.5" stroke-linejoin="null" stroke-linecap="null" stroke-opacity="null" d="m9,92c-8,-46.72376 1.0663,-91 53,-91c51.9337,0 19,83.13812 61,82c42,-1.13812 21.98343,61.61188 11.47514,73.14641c-10.50829,11.53453 -31.50829,12.85359 -57.47514,12.85359c-51.9337,0 -60,-30.27624 -68,-77z" id="svg_1"/>'+
          '<ellipse fill="'+bean.eyecolor+'" stroke="#000" stroke-width="1.5" stroke-opacity="null" fill-opacity="null" cx="46.5" cy="72.5" id="svg_4" rx="7" ry="7"/>'+
          '<ellipse fill="'+bean.eyecolor+'" stroke-width="1.5" stroke-opacity="null" fill-opacity="null" cx="71.5" cy="68" id="svg_5" rx="7" ry="7" stroke="#000"/>'+
          '<path fill="#f99" fill-opacity="null" stroke-width="1.5" stroke-linejoin="null" stroke-linecap="null" stroke-opacity="null" d="m50.25,91.98459c0,-8.29581 6.71271,-4.35229 15,-4.35229c8.28729,0 15,-3.94351 15,4.35229c0,8.29581 -6.71271,15.01541 -15,15.01541c-8.28729,0 -15,-6.7196 -15,-15.01541z" id="svg_7" stroke="#000" transform="rotate(-10 65.24999999999974,96.84779357910153) "/>'+
          '</g>'+
          '</g>'+
          '</svg>';
  }
  return svg;
}
