export function init_modal() {
    function toggleModalClasses(event:Event) {
        let target:HTMLElement = <HTMLElement>event.currentTarget;
        let modalId:String = target.dataset.modalId;
        let modal:JQuery = $(modalId);
        modal.toggleClass('is-active');
        $('html').toggleClass('is-clipped');
    }
    $('.open-config').click(toggleModalClasses);
    $('.close-config').click(toggleModalClasses); 
}

