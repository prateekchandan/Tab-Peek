if(!isPeeking) {
    var isKeyDown = false;
    var timer;
    document.onkeydown = function(ev) {
        if(isKeyDown && ev.key == 'x') {
            chrome.runtime.sendMessage("xPressed");
        }
         if(ev.key == 'x') {
             isKeyDown = true;
         }
    }
    document.onkeyup = function(ev) {
        if(ev.key == 'x') {
            isKeyDown = false;
        }
    }

    document.onmouseup = function(ev) {
        clearTimeout(timer);
    }

    document.onmousedown = function(ev) {
        timer = setTimeout(function () {
            chrome.runtime.sendMessage("xPressed");
        }, 1000);
    }
}
else {
    document.onkeydown = null;
    document.onkeyup = function(ev) {
        if(ev.key == 'x') {
            chrome.runtime.sendMessage("xReleased");
        }
    }

    document.onmousedown = null;
    document.onmouseup = function(ev) {
        chrome.runtime.sendMessage("xReleased");
    }
}
