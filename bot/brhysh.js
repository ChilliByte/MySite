console.log("Lumberbot loaded");
console.log("Running Bot code");
var listening = false;
document.getElementById("live-comments-input-field").addEventListener("keydown", function(e){
  if(e.keyCode == 223) {
    console.log("command started");
    listening = true;
  }
  if(e.keyCode == 13) {
    console.log("Input: " + document.getElementById("live-comments-input-field").innerText)
    console.log("Hidden: " + document.getElementById("live-comments-input-field-hid").value)
    alert();
    console.log("Message sent")
    listening = false;
  }
});
