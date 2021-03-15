import { ableOpenButton, files } from "./button.js";

export function init_filesChoosers() {
  const fileVideoInput: JQuery = $("#video input[type=file]");
  const fileAudioInput: JQuery = $("#audio input[type=file]");
  fileVideoInput.on("change",{ isVideo: true },changeName);
  fileAudioInput.on("change",{ isVideo: false },changeName);

  function changeName(isVideo) {
    if (this.files.length > 0) {
      const fileName: JQuery = $(this).siblings('.file-name');
      fileName.html(this.files[0].name);
      (isVideo)? ableOpenButton() : "";
      (isVideo)? files[0] = this.files[0] : files[1] = this.files[0];
    }
  }
}
