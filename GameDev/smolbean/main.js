function play() {
  document.getElementById("title").style.display = "none";
}
function createBean() {
  player = new Bean(beanColor.value,beaneyecolor.value,beanName.value);
  document.getElementById("beanSvg").style.display = "none";
}

window.onload = function() {
  var beanCols = document.querySelectorAll("input[type=color]");
  for(var i = 0; i < beanCols.length; i++) {
    beanCols[i].onchange = function(e) {
      alert("color changed to " + this.value);
      console.log(e);
    }
  }
}
