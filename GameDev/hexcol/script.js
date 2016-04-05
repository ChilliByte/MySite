function getRandomColor() {
  return "#000000";
}

function play(difficulty) {
  document.getElementsByClassName("menu")[0].style.display = "none";
  document.querySelectorAll("section.game")[difficulty].style.display = "block";
}
