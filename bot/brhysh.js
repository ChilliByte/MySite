console.log("Lumberbot loaded");
console.log("Running Bot code");
var listening = false;
document.getElementById("live-comments-input-field").addEventListener("keydown", function(e){
  console.log("Keydown event fired");
  console.log(e.keyCode);
  if(e.keyCode == 223) {
    console.log("command started");
    listening = true;
  }
  if(e.keyCode = 13) {
    console.log("Message sent")
    listening = false;
  }
});
