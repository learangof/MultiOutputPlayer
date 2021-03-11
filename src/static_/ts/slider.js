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
  $(".slider-jq").each(function (index) { 
    this.append(new Slider(sliderDefault).getSlider()[0]);
  });
}

