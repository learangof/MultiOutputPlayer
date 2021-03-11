export function init_modal() {
    function toggleModalClasses(event) {
        let modalId = event.currentTarget.dataset.modalId;
        let modal = $(modalId);
        modal.toggleClass('is-active');
        $('html').toggleClass('is-clipped');
    }
    $('.open-config').click(toggleModalClasses);
    $('.close-config').click(toggleModalClasses); 
}

