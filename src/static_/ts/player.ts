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
function play(sources:JSON) {
    $(this).find("i").toggleClass("play");
    $(this).find("i").toggleClass("pause");
}