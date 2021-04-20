import { selectedOutputs } from './audio.js';

export function init_modal() {
    $('.open-config').click(toggleModalClasses);
    $('.close-config').click(checkAudioOutputs); 
}
function toggleModalClasses(event:Event) {
    let target:HTMLElement = <HTMLElement>event.currentTarget;
    let modalId:String = target.dataset.modalId;
    let modal:JQuery = $(modalId);
    modal.toggleClass('is-active');
    $('html').toggleClass('is-clipped');
}
function checkAudioOutputs(event:Event) {
    let tempItem:string = '';
    let sameOutputs:boolean = false;
    for (const item in selectedOutputs) {
        if (tempItem == selectedOutputs[item][0]) {
            sameOutputs = true;
        }
        tempItem = selectedOutputs[item][0]
    }
    if (sameOutputs) {
        alert ("Warning! \nThe Audio outputs are the same");
    }
    toggleModalClasses(event);
}

