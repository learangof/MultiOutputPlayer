import { setCurrentTime } from "./slider.js"
import { selectedOutputs } from "./audio.js"

let startAt:JSON = JSON.parse('{}');
let playersName:string[] = [];
export function initPlayers() {
    //TODO add right behaviour to play and so on;
    //TODO mix player and button 
    // TODO fix error when close and open mulipletime the video it crash
    initAudioControls();
    initMainControls();
}
function initMainControls() {  
    $('button[data-for="#all"').off();
    playersName.forEach(function(name:string) {
        $('button[data-for="#all"').each(function (index:number) {
            $(this).click(function (event:Event) {
                let btnEvent:string = this.id;
                (btnEvent == 'play')? tooglePlayBtn(this): "";
                let btn:HTMLButtonElement = <HTMLButtonElement>$('button#'+btnEvent+'[data-for="'+name+'"')[0];
                btn.click()
            });
        });
    });
}
function initPlayer(player:HTMLMediaElement){
    let name:string = "#"+player.id
    playersName.push(name);
    $('button[data-for="'+name+'"').each(function (index){
        $(this).click(function (event:Event) {
            EVENTS[this.id.split('-')[0]](this, player);
            //EVENTS[this.id.split('-')[0]](this, name, <HTMLMediaElement>$(name)[0]);
        });
    });
    $(".input[data-for='"+name+"']").on('keyup',function(event:any){
        EVENTS[this.id](this, event)
    });  
}
export function initVideoControls(videoPlayer:HTMLMediaElement) {
    initPlayer(videoPlayer);
    initMainControls();
}
function initAudioControls() {
    let name = '#audio';
    initPlayer(<HTMLMediaElement>$(name)[0])
}
const EVENTS = {
    play(btn:HTMLButtonElement, player:HTMLMediaElement) {
        tooglePlayBtn(btn);
        let playerId:string = "#"+player.id;
        
        if (player.paused) {
            (startAt[playerId] && ($(".input[data-for='"+playerId+"']").val() != ""))?player.currentTime = startAt[playerId]:"";
            let $player:JQuery = $(player);
            // @ts-ignore
            player.setSinkId(selectedOutputs[playerId][0]);
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
    stop(btn:HTMLButtonElement, player:HTMLMediaElement) {
        let playerId:string = "#"+player.id
        if (!player.paused) {
            this.play($("button#play[data-for='"+playerId+"'")[0], player);
            $(player).off( "timeupdate", "**" );
        }
        player.currentTime = 0;
    },
    for(btn:HTMLButtonElement, player:HTMLMediaElement) {
        let playerId:string = "#"+player.id
        let forTime:number = parseInt(btn.id.split('-')[1]);
        player.currentTime += forTime;
        setCurrentTime(player.currentTime, playerId);
    },
    back(btn:HTMLButtonElement, player:HTMLMediaElement) {
        let playerId:string = "#"+player.id
        let forTime:number = parseInt(btn.id.split('-')[1]);
        player.currentTime -= forTime;        
        setCurrentTime(player.currentTime, playerId);
    },
    startTime(input:HTMLInputElement, event:any) {
        let selection: string = window.getSelection().toString();
        if (selection !== '') {
            return;
        }

        if ($.inArray(event.keyCode, [38, 40, 37, 39, 46, 8]) !== -1) {
            return;
        }

        if (input.value.length > 8) {
            input.value = input.value.slice(0, 8);
            return;
        }

        let $input: JQuery = $(input);
        let value: string = <string>$input.val();
        if (value.match(/[^:\d]/)) {
            input.value = input.value.slice(0, -1);
            return;
        }
        value = <string>$input.val();
        //TODO autoformaring to fufill always 00:00:00 format
        value = value.replace(/[\D\s\._\-]+/g, "");
        // let inputArray:string[] = Array.from(input);
        // input = "";
        // for (let index = 0; index < 6; index++) {
        //     (inputArray[index])? input += inputArray[index] : input += "0"; 
        // }
        // console.log(input);
        value = value.replace(/\d{2}/g, "$&:");
        ((value.length == 3 && value.slice(-1) == ":") || (value.length == 6 && value.slice(-1) == ":")) ? value = value.slice(0, -1) : '';
        (value.length > 8) ? value = value.slice(0, 8) : '';
        //TODO Check numbers is limit to 59 to avoi 80seconds or 90minutes so on
        // let inputArray:string[] = input.split(':');
        // input = ""
        // inputArray.forEach(function(ele){
        //     let num:number = parseInt(ele);
        //     (num > 59)? num = 59 : '';
        //     input += num;
        // });
        // input = input.replace(/\d{2}/g, "$&:");
        let time:number = getTimeFromArray(value.split(':'));
        startAt[input.dataset.for] = time;

        $input.val(function () {
            return value;
        });
    }
};
function tooglePlayBtn(btn:HTMLButtonElement) {
    $(btn).find("i").toggleClass("play");
    $(btn).find("i").toggleClass("pause");
}
function getTimeFromArray(timeArray:string[]) {
    let currentTime:number;
    switch (timeArray.length) {
        case 1:
            currentTime = parseInt(timeArray[0]);
            break;
        case 2:
            currentTime = (parseInt(timeArray[0])*60) + parseInt(timeArray[1]);
            break;
        case 3:
            currentTime = (parseInt(timeArray[0])* 3600)+ (parseInt(timeArray[1]) * 60) + parseInt(timeArray[2]);
            break;
        default:
            console.log("time error");
            currentTime = 0;
            break;
    }
    return currentTime;
}
export function allowPlayer(name:string){
    $('button[data-for="'+name+'"').each(function (){
        this.disabled=false;
    });
    if (name != "#all") {
        $(".input[data-for='"+name+"']").each(function(){
            this.disabled=false;
        });
    }
}
