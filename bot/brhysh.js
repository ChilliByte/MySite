console.log("Lumberbot loaded");

var commandList = ["!tweet","!twitter","!yt","!caps","!adv","!spam"];
var messages = [
  "Tweet out the stream, tell your friends! <3",
  "Follow @Brhysh on twitter to know when our beloved lumberjack goes live!",
  "If you like what your seeing, leave a like, and if you really love it, then make sure to subscribe! B uploads everyday!",
  "Hey! Easy on the caps! I will time your butt out, ",
  "Please don't advertise here, especially without permission. You have been timed out, do it again and you will be banned, ",
  "Please don't spam the chat. You have been timed out."
]

var inputBox = document.getElementById("live-comments-input-field");
inputBox.addEventListener("keydown", function(e){
  if(e.keyCode == 223) {
    console.log("Searching for command");
    if(commandList.indexOf(inputBox.innerText) !== -1) {
      inputBox.innerText = messages[commandList.indexOf(inputBox.innerText)]
    } else {
      inputBox.innerText = "No such command found";
    }
  }
});
