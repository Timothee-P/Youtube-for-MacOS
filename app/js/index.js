
const { ipcRenderer,remote } = require('electron');
var browser = remote.getCurrentWindow();
var oncePreload=false;
const webview = document.querySelector('webview')


webview.addEventListener('dom-ready', () => {
    webview.style.opacity = 1
    //webview.openDevTools();


})

webview.addEventListener('page-title-updated', (e) => {
    var urlPath = new URL(e.target.src).pathname
    if (urlPath == "/watch") {
        webview.setAttribute("class", "video");
        webview.executeJavaScript("document.querySelector('ytd-app').setAttribute('class','ytp-big-mode fullVideo')", true);
        browser.setWindowButtonVisibility(false);
        setTimeout(function(){
            webview.executeJavaScript("window.ipcTest.send('asynchronous-message-resize',document.getElementsByClassName('video-stream')[0].style.width,document.getElementsByClassName('video-stream')[0].style.height)", true);
        
        },1500)
        if(oncePreload==false){
            webview.executeJavaScript("var button1 = document.getElementsByClassName('ytp-miniplayer-button')[0].innerHTML;var button2 = document.getElementsByClassName('ytp-size-button')[0].innerHTML;document.getElementsByClassName('ytp-miniplayer-button')[0].innerHTML=button2;document.getElementsByClassName('ytp-size-button')[0].innerHTML=button1;",true);
            oncePreload=true
        }
    } else {
        webview.removeAttribute("class")
        webview.executeJavaScript("document.querySelector('ytd-app').setAttribute('class','ytp-big-mode')", true);
        browser.setWindowButtonVisibility(true);
        ipcRenderer.send("asynchronous-message","resizeOff");
    }
})

