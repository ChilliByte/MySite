window.onload = function() {
    document.addEventListener('click', function(evt) {
        console.log(evt.target.parentNode);
        console.log(evt.target.innerText);
        console.log(evt.target.tagName)
        if((evt.target.tagName == "A") && (evt.target.innerText == "Read more")) {
            evt.preventDefault();
            evt.target.parentElement.style.background = "#OOFFOO";
        }
    }, false);
}
