console.log("Lumberbot loaded");
console.log("Running Bot code");
document.getElementById("live-comments-input-field").addEventListener("keydown", function(e){
  console.log("Keydown event fired");
  console.log(e);
  console.log(e.keyCode);
  console.log(e.key);
  console.log(e.char);
});
