function addClasses() {
    document.body.classList[
        document.body.scrollTop > 100 ? 'add': 'remove'
    ]('scrolled');
}

window.onload = function() {
    console.log("Loaded");
    window.addEventListener('scroll', function () {
        console.log("scrolling");
        addClasses();
    });
}
