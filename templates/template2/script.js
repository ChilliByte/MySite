window.onload = function() {
    document.addEventListener('click', function(evt) {
        console.log(evt.target.parentNode);
        if(evt.target.tagName == "a" && evt.tag.innerText = "Read More") {
            alert("YAY!")
        }
    }, false);
}
