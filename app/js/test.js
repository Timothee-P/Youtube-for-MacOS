const { ipcRenderer } = require('electron')

setTimeout( function () {
  
    var css = document.createElement("style"); 
    css.type = "text/css"; 
    css.innerHTML = ".fullVideo  ytd-guide-signin-promo-renderer.style-scope.ytd-guide-renderer {display: none;}#container.ytd-masthead{padding-top: 12px !important;}.fullVideo div#footer {display: none;}.fullVideo div#guide-content {width: 71px;}.fullVideo h3.style-scope.ytd-guide-section-renderer {display: none;}.fullVideo  app-drawer{width: 70px !important;}.fullVideo ytd-page-manager#page-manager {margin-top: 68px !important;margin-left: 70px;}"
    document.getElementsByTagName("head")[0].appendChild(css);

},100);

window.onresize = function(){
    if(window.location.pathname !=="/watch"){//Bug: window.rezieto() change bound when on watch
        if(document.getElementById('test')){
            document.getElementById('test').remove();
        }
        var css1 = document.createElement("style"); 
        css1.type = "text/css"; 
        css1.id = "test";
        var width= document.querySelector("ytd-two-column-browse-results-renderer").clientWidth + 214;
        css1.innerHTML = "ytd-two-column-browse-results-renderer.style-scope.ytd-browse{width:"+ width + "px !important;}"
        document.getElementsByTagName("head")[0].appendChild(css1);
    }
}



  
document.addEventListener('DOMContentLoaded', function(){
    if(window.location.pathname !=="/watch" ){console.log('eee');document.querySelector('ytd-app').setAttribute('class','fullVideo')}
    if(document.getElementById('test')){document.getElementById('test').remove();}
    var css11 = document.createElement("style"); 
    css11.type = "text/css"; 
    css11.id = "test";
    var width= document.querySelector("ytd-two-column-browse-results-renderer").clientWidth + 214;
    css11.innerHTML = "ytd-two-column-browse-results-renderer.style-scope.ytd-browse{width:"+ width + "px !important;}"
    document.getElementsByTagName("head")[0].appendChild(css11);
    console.log("dddd")
    document.addEventListener('mousemove', function(e){
        if(e.clientY<80 && document.querySelector('video').hasAttribute('src')){
            document.querySelector('ytd-app').removeAttribute('masthead-hidden_');
            ipcRenderer.send('asynchronous-message', 'showButton')
        }else if(document.querySelector('video').hasAttribute('src') && window.scrollY == 0){
            document.querySelector('ytd-app').setAttribute('masthead-hidden_','');
            ipcRenderer.send('asynchronous-message', 'hideButton')
        }
    })
    document.addEventListener('scroll', function(e){
        if(window.scrollY == 0 && document.querySelector('video').hasAttribute('src')){
            document.querySelector('ytd-app').removeAttribute('masthead-hidden_');
            ipcRenderer.send('asynchronous-message', 'hideButton')
        }else if(document.querySelector('video').hasAttribute('src') && window.scrollY > 0){
            ipcRenderer.send('asynchronous-message', 'showButton')
        }
    })
});
  
