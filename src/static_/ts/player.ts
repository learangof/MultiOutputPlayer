import { setCurrentTime } from "./slider.js"
let startAt:JSON = JSON.parse('{}');
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
        startAt[name] = 0;
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
            let $player:JQuery = $(player);
            player.play();
            $player.on("timeupdate", (event: Event) => {
                setCurrentTime(player.currentTime, playerId);
            });
            $player.on("ended", function(){
                $(btn).find("i").toggleClass("play");
                $(btn).find("i").toggleClass("pause");
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

$(".input[data-for='#audio']").on('keyup', function (event:any) {

    let selection:string = window.getSelection().toString();
    if (selection !== '') {
        return;
    }

    if ($.inArray(event.keyCode, [38, 40, 37, 39, 46, 8]) !== -1) {
        return;
    }

    if(this.value.length > 8) {
        this.value = this.value.slice(0,8);
        return;
    }

    let $this:JQuery = $(this);
    let input:string = <string>$this.val();
    if (input.match(/[^:\d]/)) {
        this.value = this.value.slice(0, -1);
        return;
    }
    input = <string>$this.val();
    //TODO autoformaring to fufill always 00:00:00 format
    let time:string[] = input.split(':');
    
    input = input.replace(/[\D\s\._\-]+/g, "");
    // let inputArray:string[] = Array.from(input);
    // input = "";
    // for (let index = 0; index < 6; index++) {
    //     (inputArray[index])? input += inputArray[index] : input += "0"; 
    // }
    // console.log(input);
    
    input = input.replace(/\d{2}/g, "$&:");
    (input.length > 8 )? input = input.slice(0,8) : '';    
    
    $this.val(function () {        
        return input;
    });
});
