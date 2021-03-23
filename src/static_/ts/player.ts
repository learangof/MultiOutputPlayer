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
            if(startAt[playerId]){
                switch (startAt[playerId].length) {
                    case 1:
                        player.currentTime = parseInt(startAt[playerId][0]);
                        break;
                    case 2:
                        player.currentTime = (startAt[playerId][0]*60) + parseInt(startAt[playerId][1]);
                        break;
                    case 3:
                        player.currentTime = (startAt[playerId][0]* 3600)+ (startAt[playerId][1] * 60) + parseInt(startAt[playerId][2]);
                        break;
                }
            }else{
                player.currentTime = 0;
            }
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
    input = input.replace(/[\D\s\._\-]+/g, "");
    // let inputArray:string[] = Array.from(input);
    // input = "";
    // for (let index = 0; index < 6; index++) {
    //     (inputArray[index])? input += inputArray[index] : input += "0"; 
    // }
    // console.log(input);
    input = input.replace(/\d{2}/g, "$&:");
    ((input.length == 3 && input.slice(-1) == ":") || (input.length == 6 && input.slice(-1) == ":"))? input = input.slice(0,-1) : '';
    (input.length > 8)? input = input.slice(0,8) : '';
    //TODO Check numbers is limit to 59 to avoi 80seconds or 90minutes so on
    // let inputArray:string[] = input.split(':');
    // input = ""
    // inputArray.forEach(function(ele){
    //     let num:number = parseInt(ele);
    //     (num > 59)? num = 59 : '';
    //     input += num;
    // });
    // input = input.replace(/\d{2}/g, "$&:");
    startAt[this.dataset.for] = input.split(':');
    
    $this.val(function () {        
        return input;
    });
});
