console.log("Lumberbot loaded");

var commandList = ["!tweet","!twitter","!yt","!caps","!adv","!spam","!eng","!thwack","!quote"];
var messages = [
  "Tweet out the stream, tell your friends! <3",
  "Follow @Brhysh on twitter to know when our beloved lumberjack goes live!",
  "If you like what your seeing, leave a like, and if you really love it, then make sure to subscribe! B uploads everyday!",
  "Hey! Easy on the caps! I will time your butt out, ",
  "Please don't advertise here, especially without permission. You have been timed out, do it again and you will be banned, ",
  "Please don't spam the chat. You have been timed out.",
  "English only please! Don't do it again or you will be timed out!",
  "Bai bai troll! THWACK! (>^.^)> --{}"
]
var quotes = [
  "\"I need to pay in beans. Or kidneys.\" - Brhysh, about currency",
  "\"Hmm, I don't think he's AFK. He's killing people! If he is, though, that's a powerful AFK.\" -Brhysh, about Hypixel chat message",  
  "\"You don\'t believe in logs?! What kinda lumberjack are ya? :P\" -Dminer 2014",
  "\"Brhysh doesn't break the rules first! He's at least the second person to do it.\" -Brhysh, GodivaGaming Holiday UHC",
  "\"Cheese is a noble race\" -Ziyi01 2014",
]
var inputBox = document.getElementById("live-comments-input-field");
inputBox.addEventListener("keydown", function(e){
  if(e.keyCode == 223) {
    console.log("Searching for command");
    if(commandList.indexOf(inputBox.innerText) !== -1) {
      if(inputBox.innerText == "!quote") {
        inputBox.innerText = "Quote: " + quotes[Math.floor(Math.random()*quotes.length-1)];
      } else {
        inputBox.innerText = messages[commandList.indexOf(inputBox.innerText)];
      }
    } else {
      inputBox.innerText = "No such command found";
    }
  }
});
