import { setDuration, setCurrentTime } from "./slider.js"
export function initPlayer() {
    initMainControls();
    initVideoControls();
    initAudioControls();
}
function initMainControls() {
   // $("#play-all").click(play)
}
function initVideoControls() {
   // $("#play-video").click(play)
}
function initAudioControls() {
    let name = '#audio';
    $('button[data-for="'+name+'"').each(function (index){
        $(this).click(function (event:Event) {
            EVENTS[this.id](this, name, <HTMLMediaElement>$(name)[0]);
        });
    });
}
const EVENTS = {
    play(btn:HTMLButtonElement, playerId:string, player:HTMLMediaElement) {
        $(btn).find("i").toggleClass("play");
        $(btn).find("i").toggleClass("pause");
        setDuration(player.duration, playerId);
        player.paused ? player.play() : player.pause();
        player.addEventListener("timeupdate", (event: Event) => {
            //TODO: improve to add the event just one time
            setCurrentTime(player.currentTime, playerId);
        });
    },
    stop(btn:HTMLButtonElement, playerId:string, player:HTMLMediaElement) {
        (!player.paused)?this.play($("button#play[data-for='"+playerId+"'")[0], playerId, player):'';
        player.currentTime = 0;
    }
};