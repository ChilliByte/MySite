function play() {
  document.getElementById("title").style.display = "none";
}
function createBean() {
  player = new Bean(beanColor.value,beaneyecolor.value,beanName.value);
  document.getElementById("beanSvg").style.display = "none";
}

window.onload = function() {
  var beanCols = document.querySelectorAll("input[type=color]");
  beanCols[0].onchange = function(e) {
      document.getElementsByTagName("path")[0].style.fill=this.value;
  }
  beanCols[1].onchange = function(e) {
      document.getElementsByTagName("ellipse")[0].style.fill=this.value;
      document.getElementsByTagName("ellipse")[1].style.fill=this.value;
  }
}
