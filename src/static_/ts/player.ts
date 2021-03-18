import { setDuration } from "./slider.js"

export function initPlayer() {
    initMainControls();
    initVideoControls();
    initAudioControls();
}
function initMainControls() {
    $("#play-all").click(play)
}
function initVideoControls() {
    $("#play-video").click(play)
}
function initAudioControls() {
    $("#play-audio").click(play)
}
function play(event:Event, sources:JSON) {
    $(this).find("i").toggleClass("play");
    $(this).find("i").toggleClass("pause");
    let target:HTMLElement = <HTMLElement>event.currentTarget;
    let playerId:String = target.dataset.for;
    let player:HTMLMediaElement = <HTMLMediaElement>$(playerId)[0];
    //(player.paused)?player.play():player.pause();
    setDuration(player.duration,playerId)    
}