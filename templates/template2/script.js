window.onload = function() {
    document.addEventListener('click', function(evt) {
        console.log(evt.target.parentNode);
        console.log(evt.target.innerText);
        if(evt.target.tagName == "a" && evt.target.innerText == "Read more") {
            alert("YAY!")
        }
    }, false);
}
