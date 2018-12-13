var ynought,ymax;
window.onload = function () {
	window.scrollTo(0,0);
	ynought = document.querySelector("#icons a:nth-of-type(1)").getBoundingClientRect().y;
	ymax = document.body.offsetHeight - (document.documentElement.clientWidth/20)
	document.getElementById("scroller").style.top = parseInt(ynought - (document.documentElement.clientWidth/20)) + "px";
		document.getElementById("scroller").style.top = parseInt(ynought - (document.documentElement.clientWidth/20)) + "px";
}

window.addEventListener('scroll', function(e) {
	document.getElementById("scroller").style.top = parseInt(ynought - (document.documentElement.clientWidth/20) + ((ymax-ynought + (document.documentElement.clientWidth/20)) * window.scrollY /(document.body.scrollHeight - document.body.offsetHeight))) + "px";
	if(parseInt(document.getElementById("scroller").style.top) < ynought) { 
		document.getElementById("scroller").style.height = (document.documentElement.clientWidth/20) + parseInt(document.getElementById("scroller").style.top) - ynought + "px";
		document.getElementById("scroller").style.top = ynought + "px";
	} else {
		document.getElementById("scroller").style.height = parseInt(document.documentElement.clientWidth/20) + "px"
	} 
	
	if(window.scrollY > document.getElementsByTagName("section")[0].offsetHeight + document.getElementsByTagName("section")[1].offsetHeight + document.getElementsByTagName("section")[2].offsetHeight + document.getElementsByTagName("section")[3].offsetHeight/2) {
			document.getElementsByTagName("section")[4].className = "active";
	} else if(window.scrollY > document.getElementsByTagName("section")[0].offsetHeight + document.getElementsByTagName("section")[1].offsetHeight + document.getElementsByTagName("section")[2].offsetHeight/2) {
			document.getElementsByTagName("section")[3].className = "active";
	} else if(window.scrollY > document.getElementsByTagName("section")[0].offsetHeight + document.getElementsByTagName("section")[1].offsetHeight/2) {
			document.getElementsByTagName("section")[2].className = "active";
	} else if(window.scrollY > document.getElementsByTagName("section")[0].offsetHeight/2) {
		document.getElementsByTagName("section")[1].className = "active";
	}
	
});