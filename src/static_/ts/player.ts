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
$(".input[data-for='#audio']").on('keydown', function (event:any) {
    var selection = window.getSelection().toString();
    if (selection !== '') {
        return;
    }
    if ($.inArray(event.keyCode, [38, 40, 37, 39, 46, 8]) !== -1) {
        return;
    }
    var $this = $(this);
    var input = $this.val();
    if (input.match(/[^:\d]/) || this.value.length > 7) {
        this.value = this.value.slice(0, -1);
        return;
    }
    //TODO autoformaring to fufill always 00:00:00 format
    input = input.replace(/[\D\s\._\-]+/g, "");
    input = input.replace(/\d{2}/g, "$&:");
    $this.val(function () {        
        return input;
    });
});
