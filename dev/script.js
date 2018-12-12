var ynought,ymax;
window.onload = function () {
	console.log("test");
	ynought = document.querySelector("#icons a:nth-of-type(1)").getBoundingClientRect().y;
	ymax = document.body.offsetHeight - (document.documentElement.clientWidth/20)
	document.getElementById("scroller").style.top = parseInt(ynought - (document.documentElement.clientWidth/20)) + "px";
		document.getElementById("scroller").style.top = parseInt(ynought - (document.documentElement.clientWidth/20)) + "px";
}

window.addEventListener('scroll', function(e) {
	console.log("x")
	document.getElementById("scroller").style.top = parseInt(ynought - (document.documentElement.clientWidth/20) + ((ymax-ynought + (document.documentElement.clientWidth/20)) * window.scrollY /(document.body.scrollHeight - document.body.offsetHeight))) + "px";
	if(parseInt(document.getElementById("scroller").style.top) < ynought) { 
		document.getElementById("scroller").style.height = (document.documentElement.clientWidth/20) + parseInt(document.getElementById("scroller").style.top) - ynought + "px";
		document.getElementById("scroller").style.top = ynought + "px";
	} else {
		document.getElementById("scroller").style.height = parseInt(document.documentElement.clientWidth/20) + "px"
	} 
});