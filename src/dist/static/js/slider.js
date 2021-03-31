import Slider from "./lib/Slider.js";
export let sliders = {};
export function init_slider() {
    let sliderDefault = {
        Duration: 5585,
        backgroundColor: 'rgb(203, 255, 251)',
        barColor: 'blueviolet',
        height: '1.5rem',
        hasBall: true,
        hasIndicator: true,
        ballRadius: '15px',
        scale: '2',
        formatProgress: true
    };
    $(".slider-jq").each(function (index) {
        let sliderFor = this.dataset.for;
        sliders[sliderFor] = new Slider(sliderDefault);
        this.append(sliders[sliderFor].getSlider()[0]);
    });
}
export function setDuration(duration, sliderFor) {
    sliders[sliderFor].setDuration(duration);
}
export function setCurrentTime(progress, sliderFor) {
    sliders[sliderFor].setCurrent(progress);
}
