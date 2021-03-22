import { setCurrentTime } from "./slider.js"
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
            EVENTS[this.id.split('-')[0]](this, name, <HTMLMediaElement>$(name)[0]);
        });
    });
}
const EVENTS = {
    play(btn:HTMLButtonElement, playerId:string, player:HTMLMediaElement) {
        $(btn).find("i").toggleClass("play");
        $(btn).find("i").toggleClass("pause");
        if (player.paused) {
            player.play();
            $(player).on("timeupdate", (event: Event) => {
                setCurrentTime(player.currentTime, playerId);
            });
        } else {
            player.pause();
            $(player).off( "timeupdate", "**" );
        }
    },
    stop(btn:HTMLButtonElement, playerId:string, player:HTMLMediaElement) {
        if (!player.paused) {
            this.play($("button#play[data-for='"+playerId+"'")[0], playerId, player);
            $(player).off( "timeupdate", "**" );
        }
        player.currentTime = 0;
    },
    for(btn:HTMLButtonElement, playerId:string, player:HTMLMediaElement) {
        let forTime:number = parseInt(btn.id.split('-')[1]);
        player.currentTime += forTime;
        setCurrentTime(player.currentTime, playerId);
    },
    back(btn:HTMLButtonElement, playerId:string, player:HTMLMediaElement) {
        let forTime:number = parseInt(btn.id.split('-')[1]);
        player.currentTime -= forTime;        
        setCurrentTime(player.currentTime, playerId);
    }
};
$(".input[data-for='#audio']").on('input', function (){
    let input:string = <string>this.value.slice(-1);
    if (input.match(/[^:\d]/)) {
        this.value = this.value.slice(0,-1);        
    }
});
