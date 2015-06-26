window.onload = function() {
    console.log("Loaded")
    document.body.addEventListener('scroll', function () {
        console.log("scrolling")
        document.body.classList[
            document.body.scrollTop > 100 ? 'add': 'remove'
        ]('scrolled');
    });
}
