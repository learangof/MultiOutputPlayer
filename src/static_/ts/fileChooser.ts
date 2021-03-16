import { ableOpenButton } from "./button.js";

let videoSource:File;
let audioSource:File;
export function init_filesChoosers() {
  const fileVideoInput: JQuery = $("#video input[type=file]");
  const fileAudioInput: JQuery = $("#audio input[type=file]");
  fileVideoInput.on("change",{ isVideo: true },changeName);
  fileAudioInput.on("change",{ isVideo: false },changeName);

  function changeName() {
    if (this.files.length > 0) {
      const fileName: JQuery = $(this).siblings('.file-name');
      fileName.html(this.files[0].name);

      let fileType:string = this.files[0].type.split('/')[0];
      if (fileType == "video") {
        ableOpenButton();
        videoSource = this.files[0]; 
      } else {
        audioSource = this.file[0];
      }
    }
  }
}
export function setVideo(player:HTMLVideoElement) {
    let url:string = URL.createObjectURL(videoSource)
    let playerSrc:HTMLSourceElement = player.querySelector("source");
    playerSrc.setAttribute('src', url);
    player.load();
}
