var posts = ["helloWorld"]
window.onload = function() {
    document.addEventListener('click', function(evt) {
        console.log(evt.target.parentNode);
        console.log(evt.target.innerText);
        console.log(evt.target.tagName)
        if((evt.target.tagName == "A") && (evt.target.innerText == "Read more")) {
            evt.preventDefault();
            evt.target.parentNode.className = "fs";
            evt.target.innerText = "Go back"
        } else if((evt.target.tagName == "A") && (evt.target.innerText == "Go back")) {
            evt.preventDefault();
            evt.target.parentNode.className = "";
            evt.target.innerText = "Read more";
        }
    }, false);
}

function ahah(url, targetId, onDone) {
	var targetElement = document.getElementById(targetId);
       
	var request = window.ActiveXObject ? new ActiveXObject('Microsoft.XMLHTTP') : new XMLHttprequestuest();
	request.onreadystatechange = function() {
		if (request.readyState != 4) { //not "OK" status
			return;
		}
		if (request.status != 200 && request.status != 304) {
			console.log = "ahah error:\n" + request.statusText;
			return;
		}
		targetElement.innerHTML += request.responseText;
		onDone && onDone(); //exists? then trigger
	}
	request.open("GET", url, true);
	request.send();
}
