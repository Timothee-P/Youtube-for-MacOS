
const { ipcRenderer,remote } = require('electron');
var browser = remote.getCurrentWindow();
var oncePreload=false;
const webview = document.querySelector('webview')
const body = document.querySelector('body')

webview.addEventListener('dom-ready', () => {
    webview.style.opacity = 1
    webview.openDevTools();


})

webview.addEventListener('page-title-updated', (e) => {
    var urlPath = new URL(e.target.src).pathname
    CinemaMode(urlPath);
    
})

ipcRenderer.on('asynchronous-swipe', (event, arg, arg1) => {
    if (arg == 'showBack') {
        var backArrow = document.getElementById('leftArrowContainer')
        backArrow.classList.toggle('shown')
        backArrow.classList.toggle('animating')
        setTimeout(function () {
        backArrow.classList.toggle('shown')
        }, 600)
        setTimeout(function () {
        backArrow.classList.toggle('animating')
        }, 900)
    
    } else if (arg == 'showForward') {  
        var forwardArrow = document.getElementById('rightArrowContainer')
        forwardArrow.classList.toggle('shown')
        forwardArrow.classList.toggle('animating')
        setTimeout(function () {
        forwardArrow.classList.toggle('shown')
        }, 600)
        setTimeout(function () {
        forwardArrow.classList.toggle('animating')
        }, 900)
    
    }else if (arg == 'goBack') {
        webview.goBack();
        setTimeout(function () {
            var urlPath =new URL(webview.getURL()).pathname
            CinemaMode(urlPath)
        },100)
        
    }else if (arg == 'goForward') {
        webview.goForward();
        setTimeout(function () {
            var urlPath =new URL(webview.getURL()).pathname
            CinemaMode(urlPath)
        },100)
    
    }
});





function CinemaMode(urlPath){
    if (urlPath == "/watch") {
        body.setAttribute("class", "video");
        webview.executeJavaScript("document.querySelector('ytd-app').setAttribute('class','ytp-big-mode fullVideo');", true);
        browser.setWindowButtonVisibility(false);
        setTimeout(function(){
            webview.executeJavaScript("if(document.querySelector('.ytp-gradient-bottom.top')){document.querySelector('.ytd-img-top').setAttribute('src',document.querySelector('.ytd-video-owner-renderer img').src);document.querySelector('.ytd-title-top').innerHTML = document.querySelector('h1.ytd-video-primary-info-renderer').innerText;}else{var img = document.createElement('img');img.setAttribute('id','img');img.setAttribute('class','ytd-img-top');img.setAttribute('src',document.querySelector('.ytd-video-owner-renderer img').src);var h1 = document.createElement('h1');h1.setAttribute('class','ytd-title-top');h1.innerHTML = document.querySelector('h1.ytd-video-primary-info-renderer').innerText;var div = document.createElement('div');div.setAttribute('class','ytp-gradient-bottom top');div.appendChild(h1);div.appendChild(img);document.querySelector('#movie_player').appendChild(div);}", true);
        
        },200)
        setTimeout(function(){
            webview.executeJavaScript("window.ipcTest.send('asynchronous-message-resize',document.getElementsByClassName('video-stream')[0].style.width,document.getElementsByClassName('video-stream')[0].style.height)", true);
        
        },1500)
        if(oncePreload==false){
            webview.executeJavaScript("var button1 = document.getElementsByClassName('ytp-miniplayer-button')[0].innerHTML;var button2 = document.getElementsByClassName('ytp-size-button')[0].innerHTML;document.getElementsByClassName('ytp-miniplayer-button')[0].innerHTML=button2;document.getElementsByClassName('ytp-size-button')[0].innerHTML=button1;",true);
            oncePreload=true
        }
    } else {
        body.removeAttribute("class")
        webview.executeJavaScript("document.querySelector('ytd-app').setAttribute('class','ytp-big-mode')", true);
        browser.setWindowButtonVisibility(true);
        ipcRenderer.send("asynchronous-message","resizeOff");
    }
}