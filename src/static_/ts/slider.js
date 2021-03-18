import Slider from "./lib/Slider.js";
export let sliders = {};
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
    let sliderFor = this.dataset.for;
    sliders[sliderFor] = new Slider(sliderDefault);
    updateSlider(this,sliders[sliderFor]);
    });
}
export function setDuration(duration, sliderFor) {
  sliders[sliderFor].Duration = duration;
  updateSlider($(".slider-jq[data-for='"+ sliderFor +"']")[0],sliders[sliderFor]);
}
function updateSlider(slider, data) {
  $(slider).html("");
  slider.append(data.getSlider()[0]);
}