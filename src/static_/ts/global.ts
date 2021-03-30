export function initGlobal(){

}
// var childWindow;
// var video;
// var audio;
// var devices;
// var engAudio;
// var videoAudio;
// var config;
// var language = {
//     filePath: '',
//     audioOutput: [],
//     duration: 0,
//     current: 0,
//     start: 0,
// }

// if(!localStorage.getItem('config')){
//     console.log("no data");
//     config = {
//         ESP: language,
//         ENG: language
//     }
//     localStorage.setItem('config',JSON.stringify(config))
// }else{
//     console.log("data");
//     config = JSON.parse(localStorage.getItem('config'));
// }

// console.log(config);

// function openWindow() {
//     this.disabled = true;
//     document.querySelector("#play").disabled = false;
//     var windowFeatures = "new_instance=yes, toolbar=no, titlebar=no, scrollbars=no";
//     childWindow=window.open("video.html","Video",windowFeatures);
// }

// function fullSize() {
//     // var elem = a.document.getElementById("vid");
//     // console.log(a.document.fullscreenEnabled)
//     //   if (elem.requestFullscreen) {
//     //     elem.requestFullscreen();
//     //   } else if (elem.webkitRequestFullscreen) { /* Safari */
//     //     elem.webkitRequestFullscreen();
//     //   } else if (elem.msRequestFullscreen) { /* IE11 */
//     //     elem.msRequestFullscreen();
//     //   }
//     //a.resizeTo(screen.availWidth, screen.availHeight);
// }

// (async () => {
//     await navigator.mediaDevices.getUserMedia({audio: true});
//     devices = await navigator.mediaDevices.enumerateDevices();
//     devices = devices.filter(device => (device.kind === 'audiooutput' && device.deviceId != "default" && device.deviceId != "communications"));
//     var selectVideoAudio = document.querySelector('#video-audio');
//     var selectEngAudio = document.querySelector('#eng-audio');
//     for (var i = 0; i < devices.length; i++) {
//         var option = document.createElement("option");
//         option.textContent = devices[i].label;
//         option.value = i;

//         var opt = document.createElement("option");
//         opt.textContent = devices[i].label;
//         opt.value = i;

//         selectVideoAudio.add(option)
//         selectEngAudio.add(opt);
//     }
//     selectEngAudio.value = 1;
// })();

// function playMedia() {
//     video = childWindow.document.querySelector("#vid");
//     audio = document.querySelector("#aud");
//     console.log(video.paused);
//     if(videoAudio != engAudio){
//         video.setSinkId(videoAudio);
//         audio.setSinkId(engAudio);
//         if(video.paused){
//             audio.play();
//             video.play();
//             this.innerHTML = "pause";
//         }else{
//             audio.pause();
//             video.pause();
//             this.innerHTML = "play";
//         }
//     }else{
//         alert("Same Audio Output, please Change it");
//     }
//     // video = childWindow.document.querySelector("#vid");
//     // video.play();
//     // console.log(video);
//     this.di
// }
// function changeVideoAudio() {
// // console.log(this.value," Label:", devices[this.value].label," ID:",devices[this.value].deviceId);
//     videoAudio = devices[this.value].deviceId;
//     config.ESP.audioOutput[0] = this.value
//     config.ESP.audioOutput[1] = devices[this.value].label
//     localStorage.setItem('config',JSON.stringify(config))
// }
// function changeEngAudio() {
// // console.log(this.value," Label:", devices[this.value].label," ID:",devices[this.value].deviceId);
//     engAudio = devices[this.value].deviceId;
//     config.ENG.audioOutput[0] = this.value
//     config.ENG.audioOutput[1] = devices[this.value].label
//     localStorage.setItem('config',JSON.stringify(config))
// }
// document.querySelector('#open').addEventListener("click", openWindow);
// document.querySelector('#full').addEventListener("click", fullSize);
// document.querySelector('#play').addEventListener("click", playMedia);
// document.querySelector('#video-audio').addEventListener("change", changeVideoAudio);
// document.querySelector('#eng-audio').addEventListener("change", changeEngAudio);
