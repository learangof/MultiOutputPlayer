import { getChildWindow } from "./button.js";
export function init_filesChoosers() {
  const fileInput: HTMLInputElement = document.querySelector("#video input[type=file]");
  fileInput.onchange = () => {
    console.log(getChildWindow());
    
    if (fileInput.files.length > 0) {
      const fileName: HTMLElement = document.querySelector("#video .file-name");
      fileName.textContent = fileInput.files[0].name;
    }
  };
}
