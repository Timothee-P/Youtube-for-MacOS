// Modules to control application life and create native browser window
const {app, BrowserWindow} = require('electron')
const path = require('path')
const { ipcMain } = require('electron')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({width: 1600, height: 900, titleBarStyle: 'hidden',fullscreen: false,webPreferences: {
    nodeIntegration: true,
    preload: path.join(__dirname, 'js/test.js')
} } )
  
  // and load the index.html of the app.
  mainWindow.loadURL('https://www.youtube.com/');
  app.dock.show();

  
  mainWindow.webContents.on('did-navigate-in-page', function(e,url){

      setTimeout(function(){

        
        mainWindow.webContents.executeJavaScript("if(window.location.pathname == '/watch'){console.log('300ms Top');document.getElementsByClassName('ytp-fullscreen-button')[0].click();document.querySelector('ytd-app').setAttribute('class','')}else{document.querySelector('ytd-app').setAttribute('class','fullVideo');}",true);
        
    },300)
      setTimeout(function(){

        
        mainWindow.webContents.executeJavaScript("if(!document.querySelector('ytd-app').hasAttribute('masthead-hidden_')){console.log('700ms Top');document.getElementsByClassName('ytp-fullscreen-button')[0].click();}",true);
        
        
      },700)
      setTimeout(function(){
          
        mainWindow.webContents.executeJavaScript("if(window.location.pathname =='/watch'){window.resizeTo(parseInt(document.getElementsByClassName('video-stream')[0].style.width),parseInt(document.getElementsByClassName('video-stream')[0].style.height))}",true);
        
       
    
  },1100)
  var urlPath= new URL(e.sender.history[(e.sender.history.length-1)]).pathname
  if( urlPath =="/watch"){
    mainWindow.setWindowButtonVisibility(false);
}else{ mainWindow.setWindowButtonVisibility(true);}
  })
mainWindow.webContents.on('dom-ready', function(e){
    setTimeout(function(){

        
        mainWindow.webContents.executeJavaScript("if(window.location.pathname == '/watch'){console.log('300ms Top');document.getElementsByClassName('ytp-fullscreen-button')[0].click();document.querySelector('ytd-app').setAttribute('class','')}else{document.querySelector('ytd-app').setAttribute('class','fullVideo');}",true);
        
    },300)
    if(new URL(e.sender.history[(e.sender.history.length-1)]).pathname =="/watch"){
        mainWindow.setWindowButtonVisibility(false);
    }else{ mainWindow.setWindowButtonVisibility(true);}
    
   
})
  // Open the DevTools.
  // mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
})

ipcMain.on('asynchronous-message', (event, arg) => {
  if(arg == 'showButton'){
    mainWindow.setWindowButtonVisibility(true);
  }else if (arg == 'hideButton'){
    mainWindow.setWindowButtonVisibility(false);
  }
})
// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
