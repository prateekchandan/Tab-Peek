if(!isPeeking) {
    var isKeyDown = false;
    var timer;
    document.onkeydown = function(ev) {
        if(isKeyDown && ev.code == 'KeyA' && ev.ctrlKey && ev.shiftKey) {
            chrome.runtime.sendMessage("xPressed");
        }
         if(ev.code == 'KeyA'  && ev.ctrlKey && ev.shiftKey) {
             isKeyDown = true;
         }
    }
    document.onkeyup = function(ev) {
        if(ev.code == 'KeyA') {
            if(isKeyDown) {
                chrome.runtime.sendMessage("switch"); 
            }
            isKeyDown = false;
        }
    }

    document.onmouseup = function(ev) {
        clearTimeout(timer);
    }

    document.onmousemove = function(ev) {
        clearTimeout(timer);
    }

    document.onmousedown = function(ev) {
        timer = setTimeout(function () {
            chrome.runtime.sendMessage("xPressed");
        }, 500);
    }
}
else {
    document.onkeydown = null;
    document.onkeyup = function(ev) {
        if(ev.code == 'KeyA') {
            chrome.runtime.sendMessage("xReleased");
        }
    }

    document.onmousedown = null;
    document.onmouseup = function(ev) {
        chrome.runtime.sendMessage("xReleased");
    }
}
