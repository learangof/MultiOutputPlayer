import { selectedOutputs } from './audio.js';
export function init_modal() {
    $('.open-config').click(toggleModalClasses);
    $('.close-config').click(checkAudioOutputs);
}
function toggleModalClasses(event) {
    let target = event.currentTarget;
    let modalId = target.dataset.modalId;
    let modal = $(modalId);
    modal.toggleClass('is-active');
    $('html').toggleClass('is-clipped');
}
function checkAudioOutputs(event) {
    let tempItem = '';
    let sameOutputs = false;
    for (const item in selectedOutputs) {
        if (tempItem == selectedOutputs[item][0]) {
            sameOutputs = true;
        }
        tempItem = selectedOutputs[item][0];
    }
    if (!sameOutputs) {
        toggleModalClasses(event);
    }
    else {
        alert("audio outputs are the same");
    }
}
