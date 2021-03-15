import { getChildWindow, ableOpenButton } from "./button.js";

let video:File;
let audio:File;
export function init_filesChoosers() {
  const fileVideoInput: JQuery = $("#video input[type=file]");
  const fileAudioInput: JQuery = $("#audio input[type=file]");
  fileVideoInput.on("change",{ isVideo: true },changeName);
  fileAudioInput.on("change",{ isVideo: false },changeName);

  function changeName(isVideo) {
    console.log(this);
    if (this.files.length > 0) {
      const fileName: JQuery = $(this).siblings('.file-name');
      console.log(fileName);
      fileName.html(this.files[0].name);
      (isVideo)? ableOpenButton() : "";
      (isVideo)? video = this.files[0] : audio = this.files[0];
    }
  }
}
export function getFile(type:string) {
  let file:File;
  (type == 'video')? file = video : file = audio;
  return file; 
}
