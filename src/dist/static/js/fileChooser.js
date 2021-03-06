import { ableOpenButton } from "./button.js";
import { setDuration } from "./slider.js";
import { allowPlayer } from "./player.js";
let videoSource;
let audioSource;
let readyFiles = { '#audio': false, '#video': false };
export function init_filesChoosers() {
    const fileVideoInput = $("#video-file input[type=file]");
    const fileAudioInput = $("#audio-file input[type=file]");
    fileVideoInput.on("change", changeName);
    fileAudioInput.on("change", changeName);
    function changeName() {
        if (this.files.length > 0) {
            const fileName = $(this).siblings('.file-name');
            fileName.html(this.files[0].name);
            let fileType = this.files[0].type.split('/')[0];
            if (fileType == "video") {
                ableOpenButton();
                videoSource = this.files[0];
            }
            else {
                audioSource = this.files[0];
                setAudio();
            }
        }
    }
}
export function setVideo(player) {
    let url = URL.createObjectURL(videoSource);
    let playerSrc = player.querySelector("source");
    playerSrc.setAttribute('src', url);
    player.load();
    player.oncanplay = function () {
        let name = "#" + player.id;
        setDuration(player.duration, name);
        allowPlayer(name);
        readyFiles[name] = true;
        (readyFiles['#audio']) ? allowPlayer('#all') : "";
    };
}
function setAudio() {
    let url = URL.createObjectURL(audioSource);
    let player = document.querySelector("#audio");
    let playerSrc = player.querySelector("source");
    playerSrc.setAttribute('src', url);
    player.load();
    player.oncanplay = function () {
        let name = "#" + player.id;
        setDuration(player.duration, name);
        allowPlayer(name);
        readyFiles[name] = true;
        (readyFiles['#video']) ? allowPlayer('#all') : "";
    };
}
