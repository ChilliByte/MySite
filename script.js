function addClasses() {
    document.body.classList[
    document.body.scrollTop > 100 ? 'add' : 'remove']('scrolled');
    document.getElementsByTagName("html")[0].classList[
    document.body.scrollTop > document.getElementsByTagName("section")[1].offsetTop ? 'add' : 'remove']('scrolled');
    document.getElementsByTagName("nav")[0].classList[
    document.body.scrollTop > document.getElementsByTagName("section")[1].offsetTop - 60 ? 'add' : 'remove']('section1');
    document.getElementsByTagName("nav")[0].classList[
    document.body.scrollTop > document.getElementsByTagName("section")[1].offsetTop + 250 ? 'add' : 'remove']('section2');
    document.getElementsByTagName("nav")[0].classList[
    document.body.scrollTop > document.getElementsByTagName("section")[2].offsetTop - 100 ? 'add' : 'remove']('section3');
}

function vh(x) {
    return Math.round((x / 100) * window.innerHeight) + "px";
}

function setSizes() {
    document.querySelector("#nav").height = vh(22);
    document.querySelector("section:nth-child(3)").height = vh(69);
    document.querySelector("section:nth-child(4)").height = vh(140);
    document.querySelector("section:nth-child(5)").height = vh(83);
    document.querySelector("footer").height = vh(8);
    if (window.innerHeight < 600) {
        document.querySelector("section:nth-child(4)").height = vh(192);
    }
}

if(window.location.href.indexOf("deepsohelia.tk") != -1) {
    window.location.href="//chillibyte.github.io";
}

window.onload = function() {
    console.log("Loaded");
    addClasses();
    setSizes();
    window.addEventListener('scroll', function() {
        console.log("scrolling");
        addClasses();
    });
}
