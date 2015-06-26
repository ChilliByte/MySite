window.onload = function() {
    console.log("Loaded")
    document.body.addEventListener('scroll', function () {
        document.body.classList[
            document.body.scrollTop > window.innerHeight/3 ? 'add': 'remove'
        ]('scrolled');
    });
}
