import { init_buttons } from "./button.js";
import { init_filesChoosers } from "./fileChooser.js";
import { init_slider } from "./slider.js";
import { init_modal } from "./modal.js";
import { initAudio } from "./audio.js";
import { initPlayers } from "./player.js";
import { initGlobal } from "./global.js";
if (document.readyState == "loading") {
}
document.addEventListener('readystatechange', e => {
    switch (document.readyState) {
        case "interactive":
            break;
        case "complete":
            initGlobal();
            initAudio();
            initPlayers();
            init_modal();
            init_slider();
            init_filesChoosers();
            init_buttons();
            break;
    }
});
