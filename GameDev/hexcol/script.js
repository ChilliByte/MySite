var points = 0;
var currentSection;
var wrong;
var shiftedCol;
var shiftArray = [50, 25, 15, 1];
var correctCol;
var count = 0;

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function getRandomHex(min, max) {
    value = getRandomInt(min,max).toString();
    if(value.length == 1) {
        value = "0"+value;
    }
    return value;
}

function getRandomColor() {
    return "#" + getRandomHex(0,256) + "" + getRandomHex(0, 256) + "" + getRandomHex(0, 256);
}

function getWrongColor(correct, diff) {
    shiftedCol = 1 + (2 * getRandomInt(0, 3));
    wrongCol = correct.slice(shiftedCol, shiftedCol + 2);
    wrongCol = parseInt(wrongCol, 16);
    if (wrongCol < shiftArray[diff]) {
        wrongCol += shiftArray[diff];
    } else {
        wrongCol -= shiftArray[diff];
    }
    wrongCol = wrongCol.toString(16);
    return correct.slice(0, shiftedCol) + wrongCol + correct.slice(shiftedCol + 2);
}

function hideMenu() {
    document.getElementsByClassName("menu")[0].style.display = "none";
}

function showMenu() {
    document.getElementsByClassName("menu")[0].style.display = "block";
}

function gameOver() {
    document.getElementById("scores").innerHTML = "Your score is: " + points + "! Well Done!";
    points = 0;
    currentSection.style.display = "none";
    showMenu();
}

function play(difficulty) {
    hideMenu();
    currentSection = document.querySelectorAll("section.game")[difficulty]
    currentSection.style.display = "block";
    count = currentSection.children.length
    wrong = getRandomInt(1, count);
    correctCol = getRandomColor();
    wrongCol = getWrongColor(correctCol, difficulty);
    currentSection.children[0].innerHTML = "Your score is: " + points + "!";
    for (var i = 1; i < count; i++) {
        if (i == wrong) {
            currentSection.children[i].style.backgroundColor = wrongCol;
            currentSection.children[i].onclick = function() {
                points += difficulty + 1;
                play(difficulty);
            };
        } else {
            currentSection.children[i].style.backgroundColor = correctCol;
            currentSection.children[i].onclick = gameOver;
        }
    }
}
