const { ipcRenderer,remote } = require('electron');
 window.ipcTest =ipcRenderer
var isScrolling =false;
var isPIP = false;
var isPIPpending = false;
var once = false;

document.addEventListener("DOMContentLoaded", function(event) {
    var css = document.createElement("style"); 
    css.type = "text/css"; 
    css.innerHTML = "div#masthead-ad {display: none !important;}.ytp-big-mode .ytp-time-display {font-size: 150% !important;}.ytp-big-mode .ytp-scrubber-button {height: 20px !important;}.ytp-big-mode .ytp-scrubber-container {top: -8px !important}.ytp-tooltip.ytp-bottom.ytp-preview {transform: translateY(-18px) !important;}.ytp-big-mode .ytp-volume-slider-active .ytp-volume-panel {width: 58px !important;}.ytp-ad-progress {display: none !important;}.video-ads.ytp-ad-module {display: none !important;}ytd-masthead#masthead {padding-top: 12px !important;}div#guide-spacer {margin-top: 68px !important;}ytd-page-manager#page-manager {margin-top: 68px !important;}.fullVideo ytd-page-manager#page-manager { margin: 0 !important;}.fullVideo #masthead-container {top: -68px;transition:200ms}.fullVideo div#player-theater-container {height: 100vh !important;min-height: 0px !important;max-height: none !important;}"
    document.getElementsByTagName("head")[0].appendChild(css);
    document.querySelector("ytd-app").setAttribute('class','ytp-big-mode');
})


document.addEventListener("mousemove", function(event) {
    if(document.querySelector('video')){
        if(once==false){
        
            document.getElementsByClassName("ytp-fullscreen-button")[0].addEventListener('click',function(){
                ipcRenderer.send('asynchronous-message', 'fullscreen')
            });
            document.querySelector('video').addEventListener('dblclick',function(){
                ipcRenderer.send('asynchronous-message', 'fullscreen');
            });
            document.getElementsByClassName("ytp-size-button")[0].addEventListener('click',function(e){
                if(isPIP==false && isPIPpending==false){
                    var height= (550*parseInt(document.getElementsByClassName('video-stream')[0].style.height))/parseInt(document.getElementsByClassName('video-stream')[0].style.width)
                    
                    isPIP=true
                    isPIPpending=true;
                    document.getElementById("columns").style.display="none";
                    document.querySelector("ytd-app").setAttribute('class','fullVideo');
                    ipcRenderer.send('asynchronous-message', 'pip',height)
                    setTimeout(function(event){
                        document.getElementsByClassName("ytp-size-button")[0].click();
                    },30)
                    setTimeout(function(event){
                        isPIPpending=false;
                    },100)
                }else if(isPIP==true && isPIPpending==false){
                    isPIP=false
                    isPIPpending=true;
                    document.getElementById("columns").style.display="";
                    document.querySelector("ytd-app").setAttribute('class','ytp-big-mode fullVideo');
                    ipcRenderer.send('asynchronous-message', 'pipOff')
                    setTimeout(function(event){
                        document.getElementsByClassName("ytp-size-button")[0].click();
                    },30)
                    setTimeout(function(event){
                        isPIPpending=false;
                    },100)
                }                
            });
            
            
            once=true;
        }
        if(document.querySelector('video').hasAttribute('src') && isScrolling==false && isPIP==false){
            if(event.screenY < 250){
                document.getElementById("masthead-container").style.top="0";
                ipcRenderer.send('asynchronous-message', 'showButton')
            }else{
                document.getElementById("masthead-container").style.top="";
                ipcRenderer.send('asynchronous-message', 'hideButton')
            }
        }else if(!document.querySelector('video').hasAttribute('src')){
        isScrolling=false
    }
    }
})

document.addEventListener("mouseout", function(event) { 
    if(document.querySelector('video')){
        if(document.querySelector('video').hasAttribute('src') && isScrolling==false && isPIP==false){ 
            document.getElementById("masthead-container").style.top="";
            ipcRenderer.send('asynchronous-message', 'hideButton')
        }
    }
})

document.addEventListener("scroll", function(event) {
    if(document.querySelector('video')){
        if(once==false){
          
        
            
            document.getElementsByClassName("ytp-fullscreen-button")[0].addEventListener('click',function(){
                ipcRenderer.send('asynchronous-message', 'fullscreen');
            });
            document.querySelector('video').addEventListener('dblclick',function(){
                ipcRenderer.send('asynchronous-message', 'fullscreen');
            });
            document.getElementsByClassName("ytp-size-button")[0].addEventListener('click',function(e){
				if(isPIP==false && isPIPpending==false){
                    isPIP=true
                    isPIPpending=true;
                    document.getElementById("columns").style.display="none";
                    document.querySelector("ytd-app").setAttribute('class','fullVideo');
                    ipcRenderer.send('asynchronous-message', 'pip')
                    setTimeout(function(event){
                        document.getElementsByClassName("ytp-size-button")[0].click();
                    },30)
                    setTimeout(function(event){
                        isPIPpending=false;
                    },100)
                }else if(isPIP==true && isPIPpending==false){
                    isPIP=false
                    isPIPpending=true;
                    document.getElementById("columns").style.display="";
                    document.querySelector("ytd-app").setAttribute('class','ytp-big-mode fullVideo');
                    ipcRenderer.send('asynchronous-message', 'pipOff')
                    setTimeout(function(event){
                        document.getElementsByClassName("ytp-size-button")[0].click();
                    },30)
                    setTimeout(function(event){
                        isPIPpending=false;
                    },100)
                }      
            });
            once=true;
        }
        if(document.querySelector('video').hasAttribute('src') && isPIP==false){
            if(window.scrollY > 0){
                isScrolling=true;
                document.getElementById("masthead-container").style.top="0";
                ipcRenderer.send('asynchronous-message', 'showButton')
            }else{
                isScrolling=false;
                document.getElementById("masthead-container").style.top="";
                ipcRenderer.send('asynchronous-message', 'hideButton')
            }
        }else if(!document.querySelector('video').hasAttribute('src')){
        isScrolling=false
    }
    }
})


var swipeGestureTimeout = -1

var horizontalMouseMove = 0
var verticalMouseMove = 0

var beginningScrollLeft = null
var beginningScrollRight = null

var hasShownSwipeArrow  = false

function resetCounters () {
  horizontalMouseMove = 0
  verticalMouseMove = 0

  beginningScrollLeft = null
  beginningScrollRight = null

  hasShownSwipeArrow = false
}

function onSwipeGestureFinish () {

  // swipe to the left to go forward
  if (horizontalMouseMove - beginningScrollRight > 150 && Math.abs(horizontalMouseMove / verticalMouseMove) > 2.5) {
    if (beginningScrollRight < 10) {
      resetCounters()
      ipcRenderer.send('asynchronous-message','goForward')
    }
  }

  // swipe to the right to go backwards
  if (horizontalMouseMove + beginningScrollLeft < -150 && Math.abs(horizontalMouseMove / verticalMouseMove) > 2.5) {
    if (beginningScrollLeft < 10) {
      resetCounters()
      ipcRenderer.send('asynchronous-message','goBack')
    }
  }

  resetCounters()
}

window.addEventListener('wheel', function (e) {
  verticalMouseMove += e.deltaY
  horizontalMouseMove += e.deltaX

  if (!beginningScrollLeft || !beginningScrollRight) {
    beginningScrollLeft = document.scrollingElement.scrollLeft
    beginningScrollRight = document.scrollingElement.scrollWidth - document.scrollingElement.clientWidth - document.scrollingElement.scrollLeft
  }

  if (Math.abs(e.deltaX) >= 20 || Math.abs(e.deltaY) >= 20) {
    clearTimeout(swipeGestureTimeout)

    if (horizontalMouseMove < -150 && Math.abs(horizontalMouseMove / verticalMouseMove) > 2.5 && !hasShownSwipeArrow) {
      hasShownSwipeArrow = true
      ipcRenderer.send('asynchronous-message','showBackArrow')
      isScrolling=true;
    } else if (horizontalMouseMove > 150 && Math.abs(horizontalMouseMove / verticalMouseMove) > 2.5 && !hasShownSwipeArrow) {
      hasShownSwipeArrow = true
      ipcRenderer.send('asynchronous-message','showForwardArrow')
      isScrolling=true;
    }

    swipeGestureTimeout = setTimeout(onSwipeGestureFinish, 70)
  }

  /* default zoom modifier is ctrl. Mac uses cmd/meta/super so an exeption will be made below */
  var platformZoomKey = e.ctrlKey

  /* if platform is Mac, enable pinch zoom
  	the browser engine detects pinches as ctrl+mousewheel on Mac,
  	therefore, it should not affect other platforms that uses ctrl+mousewheel to zoom.
  */
  if (navigator.platform === 'MacIntel') {
    if (e.ctrlKey && !e.defaultPrevented) {
      if (verticalMouseMove > 10) {
        zoomOut()
        verticalMouseMove = 0
      }
      if (verticalMouseMove < -10) {
        zoomIn()
        verticalMouseMove = 0
      }

      e.preventDefault()
    }
    platformZoomKey = e.metaKey
  }
  /* cmd-key while scrolling should zoom in and out */

  if (verticalMouseMove > 55 && platformZoomKey) {
    verticalMouseMove = -10
    zoomOut()
  }

  if (verticalMouseMove < -55 && platformZoomKey) {
    verticalMouseMove = -10
    zoomIn()
  }

  if (platformZoomKey) {
    e.preventDefault()
  }
})