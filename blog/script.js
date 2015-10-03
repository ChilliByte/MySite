var posts = ["hello-world","which-streaming-platform"]

function ahah(url) {
	var targetElement = document.body;
       
	var request = window.ActiveXObject ? new ActiveXObject('Microsoft.XMLHTTP') : new XMLHttpRequest();
	request.onreadystatechange = function() {
		if (request.readyState != 4) { //not "OK" status
			return;
		}
		if (request.status != 200 && request.status != 304) {
			console.log = "ahah error:\n" + request.statusText;
			return;
		}
		//targetElement.innerHTML += request.responseText;
		console.log(request.responseText)
		console.log(request.split("<article id="))
	}
	request.open("GET", url, true);
	request.send();
}
var numOfPosts;
function loadPosts() {
	numOfPosts = posts.length;
	while(numOfPosts--) {
		document.body.innerHTML+="<article id=\"" + posts[numOfPosts] + "\"></article>"
		ahah("posts/" + posts[numOfPosts] + ".html");
	}
}

window.onload = function() {
    document.addEventListener('click', function(evt) {
        console.log(evt.target.parentNode);
        console.log(evt.target.innerText);
        console.log(evt.target.tagName)
        console.log(evt.target.parentNode.id)
        if((evt.target.tagName == "A") && (evt.target.innerText == "Read more")) {
            evt.preventDefault();
            evt.target.parentNode.className = "fs";
            evt.target.innerText = "Go back"
            history.pushState({}, evt.target.parentNode.id + ".html", window.location.href + "/" + evt.target.parentNode.id + ".html");
        } else if((evt.target.tagName == "A") && (evt.target.innerText == "Go back")) {
            evt.preventDefault();
            evt.target.parentNode.className = "";
            evt.target.innerText = "Read more";
            history.pushState({}, "Blog", "http://chillibyte.github.io/blog");
        }
    }, false);
    loadPosts()
}
