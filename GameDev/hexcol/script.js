var points = 0;
var currentSection;
var wrong;
var shiftedCol;
var shiftArray = [30,15,5,1];
var correctCol;
var count = 0;

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function getRandomColor() {
  return "#" + getRandomInt(0,256).toString(16) + "" + getRandomInt(0,256).toString(16) + "" + getRandomInt(0,256).toString(16);
}

function getWrongColor(correct,diff) {
  shiftedCol = 1+(2*getRandomInt(0,3));
  wrongCol = correct.slice(shiftedCol,shiftedCol+2);
  wrongCol = parseInt(wrongCol,16);
  if(wrongCol < shiftArray[diff]) {
    wrongCol += shiftArray[diff];
  } else {
    wrongCol -= shiftArray[diff];
  }
  wrongCol = wrongCol.toString(16);
  return correct.slice(0,shiftedCol)+wrongCol+correct.slice(shiftedCol+2);
}

function hideMenu() {
    document.getElementsByClassName("menu")[0].style.display = "none";
}

function showMenu() {
    document.getElementsByClassName("menu")[0].style.display = "block";
}

function gameOver() {
    document.getElementById("scores").innerHTML = "Your score: " + points +"! Well Done!";
}
function play(difficulty) {
  hideMenu();
  currentSection = document.querySelectorAll("section.game")[difficulty]
  currentSection.style.display = "block";
  count = currentSection.children.length
  wrong = getRandomInt(1,count);
  correctCol = getRandomColor();
  wrongCol = getWrongColor(correctCol,difficulty);
  while(count-- > 0) {
    if(count == wrong) {
      currentSection.children[count].style.backgroundColor = wrongCol;
      currentSection.children[count].onclick = function() {
        points+= difficulty+1;
        play(difficulty);
      };
    } else {
      currentSection.children[count].style.backgroundColor = correctCol;
      currentSection.children[count].onclick = gameOver;
      }
    }
  }
}
