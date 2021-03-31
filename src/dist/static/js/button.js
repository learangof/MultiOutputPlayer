import { setVideo } from "./fileChooser.js";
import { initVideoControls } from "./player.js";
export let files = [null, null];
export let videoPlayer;
export function init_buttons() {
    let childWindow;
    let openButton = $("#open-video");
    let fullScreenButton = $("#fullscreen-video");
    let isFullScreen = false;
    function openWindow() {
        let windowFeatures = "new_instance=yes, toolbar=no, titlebar=no, scrollbars=no";
        let isOpen = false;
        openButton.html("Close Window");
        openButton.off('click');
        openButton.click(closeWindow);
        toggleClassButtons(openButton);
        fullScreenButton.prop("disabled", false);
        childWindow = window.open("video.html", "Video", windowFeatures);
        childWindow.onunload = closeWindowHandler;
        childWindow.onbeforeunload = closeWindowHandler;
        childWindow.onload = function () {
            videoPlayer = childWindow.document.querySelector("#video");
            setVideo(videoPlayer);
            initVideoControls(videoPlayer);
        };
        function closeWindowHandler() {
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
        let video = childWindow.document.getElementById("video");
        if (video.requestFullscreen) {
            video.requestFullscreen();
        }
        else if (video.webkitRequestFullscreen) {
            video.webkitRequestFullscreen();
        }
        else if (video.msRequestFullscreen) {
            video.msRequestFullscreen();
        }
        else if (video.mozRequestFullScreen) {
            video.mozRequestFullScreen();
        }
        fullScreenButton.html("Close Full Screen");
        fullScreenButton.off('click');
        fullScreenButton.click(closeFullScreenVideo);
        toggleClassButtons(fullScreenButton);
    }
    function closeFullScreenVideo() {
        let video = childWindow.document.getElementById("video");
        if (video.exitFullscreen) {
            video.exitFullscreen();
        }
        else if (video.webkitExitFullscreen) {
            video.webkitExitFullscreen();
        }
        else if (video.msExitFullscreen) {
            video.msExitFullscreen();
        }
        else if (video.mozCancelFullScreen) {
            video.mozCancelFullScreen();
        }
        fullScreenButton.html("Full Screen");
        fullScreenButton.off('click');
        fullScreenButton.click(fullScreenVideo);
        toggleClassButtons(fullScreenButton);
    }
    function toggleClassButtons(button) {
        button.toggleClass('is-info');
        button.toggleClass('is-danger');
    }
    function toogleCloseWindow() {
        openButton.html("Open Window");
        openButton.off('click');
        openButton.click(openWindow);
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
