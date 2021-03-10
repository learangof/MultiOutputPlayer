import Slider from "./lib/Slider.js";
export function init_slider() {
    let slider2 = new Slider({
        Duration: 322,
        backgroundColor: 'rgb(203, 255, 251)',
        barColor: 'blueviolet',
        height:'1.5rem',
        hasBall: true,
        hasIndicator: true,
        ballRadius: '15px',
        scale:'2',
        formatProgress: true,
      });
    $('#slider2').append(slider2.getSlider());
}

