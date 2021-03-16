import { setVideo } from "./fileChooser.js"


export let files:File[] = [null,null];

export function init_buttons() {
  let childWindow:Window;
  let openButton:JQuery = $("#open-video");
  let fullScreenButton:JQuery = $("#fullscreen-video");
  let isFullScreen:boolean = false;
  
  function openWindow() {   
    let windowFeatures:string = "new_instance=yes, toolbar=no, titlebar=no, scrollbars=no";
    let isOpen:boolean = false;

    openButton.html("Close Window");
    openButton.off('click');
    openButton.click(closeWindow)
    toggleClassButtons(openButton);
    fullScreenButton.prop("disabled", false);

    childWindow = window.open("video.html", "Video", windowFeatures);
    childWindow.onunload = closeWindowHandler;
    childWindow.onbeforeunload = closeWindowHandler;

    childWindow.onload = function() {      
      setVideo(childWindow.document.querySelector("#video"));
    };

    function closeWindowHandler(){
      //event.preventDefault();
      if (isOpen) {
        toogleCloseWindow();
      }
      isOpen = true;
    }
  }
  function closeWindow() {
    childWindow.close();
    toogleCloseWindow(); 
  }
  function fullScreenVideo() {
    isFullScreen = true;
    let video:any = childWindow.document.getElementById("video");
    if (video.requestFullscreen) {
      video.requestFullscreen();
    }else if (video.webkitRequestFullscreen) {/* Safari */
      video.webkitRequestFullscreen();
    } else if (video.msRequestFullscreen) {/* IE11 */
      video.msRequestFullscreen();
    }else if (video.mozRequestFullScreen) {/* Mozilla */
      video.mozRequestFullScreen();
    }
    fullScreenButton.html("Close Full Screen");
    fullScreenButton.off('click');
    fullScreenButton.click(closeFullScreenVideo)
    toggleClassButtons(fullScreenButton);

  }
  function closeFullScreenVideo() {
    let video:any = childWindow.document.getElementById("video");
    if (video.exitFullscreen) {
      video.exitFullscreen();
    }else if (video.webkitExitFullscreen) {/* Safari */
      video.webkitExitFullscreen();
    } else if (video.msExitFullscreen) {/* IE11 */
      video.msExitFullscreen();
    }else if (video.mozCancelFullScreen) {/* Mozilla */
      video.mozCancelFullScreen();
    }
    fullScreenButton.html("Full Screen");
    fullScreenButton.off('click');
    fullScreenButton.click(fullScreenVideo)
    toggleClassButtons(fullScreenButton);    
  }
  function toggleClassButtons(button:JQuery) {
    button.toggleClass('is-info');
    button.toggleClass('is-danger');
  }
  function toogleCloseWindow() {
    openButton.html("Open Window");
    openButton.off('click');
    openButton.click(openWindow)
    toggleClassButtons(openButton);
    fullScreenButton.prop("disabled", true); 
    if (isFullScreen) {
      closeFullScreenVideo();
    }    
  }

  openButton.click(openWindow);
  fullScreenButton.click(fullScreenVideo);
}

export function ableOpenButton() {
  $("#open-video").prop("disabled", false); 
}