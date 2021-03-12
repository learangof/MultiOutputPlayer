export function init_buttons() {
  let childWindow:Window;
  let openButton:JQuery = $("#open-video");
  
  function openWindow() {   
    let windowFeatures:string = "new_instance=yes, toolbar=no, titlebar=no, scrollbars=no";
    let isOpen:boolean = false;

    //openButton.prop("disabled", true);
    openButton.html("Close Window");
    openButton.off('click');
    openButton.click(closeWindow)
    toggleClassButtons(openButton);

    childWindow = window.open("video.html", "Video", windowFeatures);
    childWindow.onunload = closeWindowHandler;
    childWindow.onbeforeunload = closeWindowHandler;
    
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
  
  function toggleClassButtons(button:JQuery) {
    button.toggleClass('is-info');
    button.toggleClass('is-danger');
  }
  function toogleCloseWindow() {
    openButton.html("Open Window");
    openButton.off('click');
    openButton.click(openWindow)
    toggleClassButtons(openButton);
  }

  openButton.click(openWindow);
}