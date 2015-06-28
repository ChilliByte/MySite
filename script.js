function addClasses() {
    document.body.classList[
        document.body.scrollTop > 100 ? 'add': 'remove'
    ]('scrolled');
    document.getElementsByTagName("html")[0].classList[
        document.body.scrollTop > document.getElementsByTagName("section")[1].offsetTop ? 'add': 'remove'
    ]('scrolled');
}

window.onload = function() {
    console.log("Loaded");
    addClasses();
    window.addEventListener('scroll', function () {
        console.log("scrolling");
        addClasses();
    });
}
