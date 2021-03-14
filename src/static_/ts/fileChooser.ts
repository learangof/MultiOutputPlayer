import { getChildWindow, ableOpenButton } from "./button.js";

export function init_filesChoosers() {
  const fileInput: HTMLInputElement = document.querySelector("#video input[type=file]");
  fileInput.onchange = () => {    
    if (fileInput.files.length > 0) {
      ableOpenButton();
      const fileName: HTMLElement = document.querySelector("#video .file-name");
      fileName.textContent = fileInput.files[0].name;
    }
  };
}
