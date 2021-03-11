import Slider from "./lib/Slider.js";
export function init_slider() {
  let sliderDefault = {
    Duration: 5585,
    backgroundColor: 'rgb(203, 255, 251)',
    barColor: 'blueviolet',
    height:'1.5rem',
    hasBall: true,
    hasIndicator: true,
    ballRadius: '15px',
    scale:'2',
    formatProgress: true
  };
  let slider1 = new Slider(sliderDefault);
  let slider2 = new Slider(sliderDefault);
  $('#slider1').append(slider1.getSlider());
  $('#slider2').append(slider2.getSlider());
}

