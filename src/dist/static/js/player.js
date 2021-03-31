import { setCurrentTime } from "./slider.js";
let startAt = JSON.parse('{}');
let playersName = [];
export function initPlayers() {
    initAudioControls();
    initMainControls();
}
function initMainControls() {
    $('button[data-for="#all"').off();
    playersName.forEach(function (name) {
        $('button[data-for="#all"').each(function (index) {
            $(this).click(function (event) {
                let btnEvent = this.id;
                (btnEvent == 'play') ? tooglePlayBtn(this) : "";
                let btn = $('button#' + btnEvent + '[data-for="' + name + '"')[0];
                btn.click();
            });
        });
    });
}
function initPlayer(player) {
    let name = "#" + player.id;
    playersName.push(name);
    $('button[data-for="' + name + '"').each(function (index) {
        $(this).click(function (event) {
            EVENTS[this.id.split('-')[0]](this, player);
        });
    });
    $(".input[data-for='" + name + "']").on('keyup', function (event) {
        EVENTS[this.id](this, event);
    });
}
export function initVideoControls(videoPlayer) {
    initPlayer(videoPlayer);
    initMainControls();
}
function initAudioControls() {
    let name = '#audio';
    initPlayer($(name)[0]);
}
const EVENTS = {
    play(btn, player) {
        tooglePlayBtn(btn);
        let playerId = "#" + player.id;
        if (player.paused) {
            (startAt[playerId] && ($(".input[data-for='" + playerId + "']").val() != "")) ? player.currentTime = startAt[playerId] : "";
            let $player = $(player);
            player.play();
            $player.on("timeupdate", (event) => {
                setCurrentTime(player.currentTime, playerId);
            });
            $player.on("ended", function () {
                $(btn).find("i").toggleClass("play");
                $(btn).find("i").toggleClass("pause");
            });
        }
        else {
            player.pause();
            $(player).off("timeupdate", "**");
        }
    },
    stop(btn, player) {
        let playerId = "#" + player.id;
        if (!player.paused) {
            this.play($("button#play[data-for='" + playerId + "'")[0], player);
            $(player).off("timeupdate", "**");
        }
        player.currentTime = 0;
    },
    for(btn, player) {
        let playerId = "#" + player.id;
        let forTime = parseInt(btn.id.split('-')[1]);
        player.currentTime += forTime;
        setCurrentTime(player.currentTime, playerId);
    },
    back(btn, player) {
        let playerId = "#" + player.id;
        let forTime = parseInt(btn.id.split('-')[1]);
        player.currentTime -= forTime;
        setCurrentTime(player.currentTime, playerId);
    },
    startTime(input, event) {
        let selection = window.getSelection().toString();
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
        let $input = $(input);
        let value = $input.val();
        if (value.match(/[^:\d]/)) {
            input.value = input.value.slice(0, -1);
            return;
        }
        value = $input.val();
        value = value.replace(/[\D\s\._\-]+/g, "");
        value = value.replace(/\d{2}/g, "$&:");
        ((value.length == 3 && value.slice(-1) == ":") || (value.length == 6 && value.slice(-1) == ":")) ? value = value.slice(0, -1) : '';
        (value.length > 8) ? value = value.slice(0, 8) : '';
        let time = getTimeFromArray(value.split(':'));
        startAt[input.dataset.for] = time;
        $input.val(function () {
            return value;
        });
    }
};
function tooglePlayBtn(btn) {
    $(btn).find("i").toggleClass("play");
    $(btn).find("i").toggleClass("pause");
}
function getTimeFromArray(timeArray) {
    let currentTime;
    switch (timeArray.length) {
        case 1:
            currentTime = parseInt(timeArray[0]);
            break;
        case 2:
            currentTime = (parseInt(timeArray[0]) * 60) + parseInt(timeArray[1]);
            break;
        case 3:
            currentTime = (parseInt(timeArray[0]) * 3600) + (parseInt(timeArray[1]) * 60) + parseInt(timeArray[2]);
            break;
        default:
            console.log("time error");
            currentTime = 0;
            break;
    }
    return currentTime;
}
