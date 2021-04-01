import { ableOpenButton } from "./button.js";
import { setDuration } from "./slider.js"
import { allowPlayer } from "./player.js"

let videoSource:File;
let audioSource:File;
let readyFiles = {'#audio':false,'#video':false};
export function init_filesChoosers() {
  //TODO Generalize for audios
  const fileVideoInput: JQuery = $("#video-file input[type=file]");
  const fileAudioInput: JQuery = $("#audio-file input[type=file]");
  console.log(readyFiles);
  
  fileVideoInput.on("change",changeName);
  fileAudioInput.on("change",changeName);

  function changeName() {
    if (this.files.length > 0) {
      const fileName: JQuery = $(this).siblings('.file-name');
      fileName.html(this.files[0].name);

      let fileType:string = this.files[0].type.split('/')[0];
      if (fileType == "video") {
        ableOpenButton();
        videoSource = this.files[0]; 
      } else {
        audioSource = this.files[0];
        setAudio();
      }
    }
  }
}
export function setVideo(player:HTMLVideoElement) {
    let url:string = URL.createObjectURL(videoSource);
    let playerSrc:HTMLSourceElement = player.querySelector("source");
    playerSrc.setAttribute('src', url);
    player.load();
    player.oncanplay = function () {
      let name = "#"+player.id;
      setDuration(player.duration, name);
      allowPlayer(name);
      readyFiles[name] = true;
      (readyFiles['#audio'])? allowPlayer('#all'):"";
    };    
}

function setAudio() {
  let url:string = URL.createObjectURL(audioSource)
  let player:HTMLAudioElement =document.querySelector("#audio")
  let playerSrc:HTMLSourceElement = player.querySelector("source");
  playerSrc.setAttribute('src', url);
  player.load();
  player.oncanplay  = function () {
    let name = "#"+player.id;
    setDuration(player.duration, name); 
    allowPlayer(name);
    readyFiles[name] = true;
    (readyFiles['#video'])? allowPlayer('#all'):"";
  };
}
