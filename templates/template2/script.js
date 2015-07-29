window.onload = function() {
    document.addEventListener('click', function(evt) {
        console.log(evt.target.parentNode);
        console.log(evt.tag.innerText);
        if(evt.target.tagName == "a" && evt.tag.innerText == "Read more") {
            alert("YAY!")
        }
    }, false);
}
