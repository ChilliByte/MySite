console.log("Lumberbot loaded");
console.log("Running Bot code");
var listening = false;
var inputBox = document.getElementById("live-comments-input-field");
var hiddenInput = document.getElementById("live-comments-input-field-hid");
inputBox.addEventListener("keydown", function(e){
  if(e.keyCode == 223) {
    console.log("command started");
    listening = true;
  }
  if(e.keyCode == 13) {
    console.log("Input: " + inputBox.innerText)
    console.log("Hidden: " + hiddenInput.value)
    if(hiddenInput.value == "`tweet") {
      hiddenInput.value = "Follow @Brhysh on twitter! <3";
    }
    console.log("Message sent")
    listening = false;
  }
});
