var yStart, yEnd, scrollerHeight, docHeight, iconHeight;
window.addEventListener('load', function(e) {        
    document.documentElement.scrollTo(0,0);
    scrollerHeight = document.documentElement.clientWidth / 20; 
    yStart = document.querySelector("#icons a:nth-of-type(1)").getBoundingClientRect().y - scrollerHeight;
    yEnd = document.documentElement.clientHeight - scrollerHeight;
    yRange = yEnd - yStart;
    docHeight = document.documentElement.scrollHeight;

    document.getElementById("scroller").style.top = yStart + "px";
    
    window.onresize = function () {
        //redefine scroller params in case of resize
        scrollerHeight = document.documentElement.clientWidth / 20; 
        yStart = document.querySelector("#icons a:nth-of-type(1)").getBoundingClientRect().y - scrollerHeight;
        yEnd = document.documentElement.clientHeight - scrollerHeight;
        yRange = yEnd - yStart;
        docHeight = document.documentElement.scrollHeight;
    }


    window.addEventListener('scroll', function(e) {        
        if (document.documentElement.scrollTop > 0) {
            document.getElementById("scroller").style.visibility = "visible";    
        }

        //Scrolling from Start to "about"
        if (document.documentElement.scrollTop < document.getElementById("about").offsetTop) {
            document.getElementById("scroller").style.top = parseFloat(yStart + scrollerHeight) + "px";
            document.getElementById("scroller").style.height = parseInt(scrollerHeight * (document.documentElement.scrollTop / document.getElementById("about").offsetTop),10) + "px";
        }
        //Animation trigger for "about" section
        if (document.documentElement.scrollTop + (document.documentElement.clientHeight/2) > document.getElementById("about").offsetTop) {
            document.getElementById("about").className = "active";
        }  

        //Scrolling from "about" to "services"
        if ((document.documentElement.scrollTop < document.getElementById("services").offsetTop) && (document.documentElement.scrollTop >= document.getElementById("about").offsetTop)) {
            document.getElementById("scroller").style.top = parseFloat(yStart + (scrollerHeight)*(1 + ((document.documentElement.scrollTop - document.getElementById("about").offsetTop)/(document.getElementById("services").offsetTop - document.getElementById("about").offsetTop))) ) + "px";
            document.getElementById("scroller").style.height = parseInt(scrollerHeight,10) + "px";
        }
        //Animation trigger for "services" section
        if (document.documentElement.scrollTop + (document.documentElement.clientHeight/2) > document.getElementById("services").offsetTop) {
            document.getElementById("services").className = "active";
        }

        //Scrolling from "services" to "work"
        if ((document.documentElement.scrollTop < document.getElementById("work").offsetTop) && (document.documentElement.scrollTop >= document.getElementById("services").offsetTop)) {
            document.getElementById("scroller").style.top = parseFloat(yStart + (scrollerHeight)*(2 + ((document.documentElement.scrollTop - document.getElementById("services").offsetTop)/(document.getElementById("work").offsetTop - document.getElementById("services").offsetTop))) ) + "px";
            document.getElementById("scroller").style.height = parseInt(scrollerHeight,10) + "px";
        }
        //Animation trigger for "work" section
        if (document.documentElement.scrollTop + (document.documentElement.clientHeight/2) > document.getElementById("work").offsetTop) {
            document.getElementById("work").className = "active";
        }

        //Scrolling from "work" to "contact"
        if ((document.documentElement.scrollTop < document.getElementById("contact").offsetTop) && (document.documentElement.scrollTop >= document.getElementById("work").offsetTop)) {
            document.getElementById("scroller").style.top = parseFloat(yStart + (scrollerHeight)*(3 + ((document.documentElement.scrollTop - document.getElementById("work").offsetTop)/(document.getElementById("contact").offsetTop - document.getElementById("work").offsetTop))) ) + "px";
            document.getElementById("scroller").style.height = parseInt(scrollerHeight,10) + "px";
        }
        //Animation trigger for "contact" section
        if (document.documentElement.scrollTop + (document.documentElement.clientHeight/2) > document.getElementById("contact").offsetTop) {
            document.getElementById("contact").className = "active";
        }
         
        if (document.documentElement.scrollTop + document.documentElement.clientHeight >= document.getElementsByTagName("footer")[0].offsetTop) {
            document.getElementById("scroller").style.top = parseFloat(yStart + (4 * scrollerHeight) - 50 + document.documentElement.scrollHeight - (document.documentElement.scrollTop + document.documentElement.clientHeight)) + "px";
            
            document.getElementById("icons").style.bottom = parseInt(50 - (document.documentElement.scrollHeight - ( document.documentElement.scrollTop + document.documentElement.clientHeight)),10) + "px";
            
            document.getElementById("scroller").style.height = parseInt(scrollerHeight,10) + "px";
        } else {
            document.getElementById("icons").style.bottom = 0;
        }
        
    });
    
    document.documentElement.style.scrollBehavior="smooth";
});

window.addEventListener('click', function(e) {
	if(e.path[1].tagName == "FIGURE" && e.path[2].id == "work") {
		 e.target.parentElement.parentElement.className = "active " + e.target.parentElement.id;
	}
});

/*
var ynought, ymax, height;
window.onload = function () {
	body = document.body,
    html = document.documentElement;
    window.scrollTop = 0;
    body.scrollTop = 0;
    html.scrollTop = 0;
    vw5 = (document.documentElement.clientWidth/20);
    height = Math.max( body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight );

	ynought = document.querySelector("#icons a:nth-of-type(1)").getBoundingClientRect().y - vw5;
    ymax = document.body.offsetHeight - vw5
    yrange = document.querySelector("#icons a:nth-of-type(4)").getBoundingClientRect().y - ynought;

    document.getElementById("scroller").style.top = parseInt(ynought - vw5) + "px";
    
    window.addEventListener('scroll', function(e) {
        //Move Scrollbar
        document.getElementById("scroller").style.top = parseFloat(ynought + (document.documentElement.scrollTop/ymax) * yrange,10) + "px";
        
        //Change Scrollbar height
        if(parseInt(document.getElementById("scroller").style.top) < ynought) { 
            document.getElementById("scroller").style.height = (document.documentElement.clientWidth/20) + parseInt(document.getElementById("scroller").style.top) - ynought + "px";
            document.getElementById("scroller").style.top = ynought + "px";
        } else {
            document.getElementById("scroller").style.height = parseInt(document.documentElement.clientWidth/20) + "px";
        } 

        //Hide scrollbar at top;
        if(document.documentElement.scrollTop !== 0) {
            document.getElementById("scroller").style.visibility = "visible";
        }

        if(document.documentElement.scrollTop > document.getElementsByTagName("section")[0].offsetHeight + document.getElementsByTagName("section")[1].offsetHeight + document.getElementsByTagName("section")[2].offsetHeight + document.getElementsByTagName("section")[3].offsetHeight) {
            document.getElementById("icons").style.bottom = Math.max(50 - (height - document.documentElement.scrollTop - document.documentElement.clientHeight),0) + "px";
            document.getElementById("scroller").style.top = parseInt(document.getElementById("scroller").style.top) - Math.max(50 - (height - document.documentElement.scrollTop - document.documentElement.clientHeight),0) + "px";
            document.getElementById("icons").className = "active";
        } 

        if(document.documentElement.scrollTop > document.getElementsByTagName("section")[0].offsetHeight + document.getElementsByTagName("section")[1].offsetHeight + document.getElementsByTagName("section")[2].offsetHeight + document.getElementsByTagName("section")[3].offsetHeight/2) {
            document.getElementsByTagName("section")[4].className = "active";
        } else if(document.documentElement.scrollTop > document.getElementsByTagName("section")[0].offsetHeight + document.getElementsByTagName("section")[1].offsetHeight + document.getElementsByTagName("section")[2].offsetHeight/2) {
            document.getElementsByTagName("section")[3].className = "active";
        } else if(document.documentElement.scrollTop > document.getElementsByTagName("section")[0].offsetHeight + document.getElementsByTagName("section")[1].offsetHeight/2) {
            document.getElementsByTagName("section")[2].className = "active";
        } else if(document.documentElement.scrollTop > document.getElementsByTagName("section")[0].offsetHeight/2) {
            document.getElementsByTagName("section")[1].className = "active";
        }
    });
    
    html.style.scrollBehavior="smooth";
}

window.addEventListener('click', function(e) {
	if(e.path[1].tagName == "FIGURE" && e.path[2].id == "work") {
		 e.target.parentElement.parentElement.className = "active " + e.target.parentElement.id;
	}
});*/