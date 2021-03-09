//import * as $ from "./lib/jquery.min.js"
import { init_buttons } from "./button.js";
import { init_filesChoosers } from "./fileChooser.js";
//import bulmaSlider from "./bulma-slider/index.js"
import { init_slider } from "./slider.js";

if(document.readyState == "loading") {
  // The document is still loading.
  //console.log("loading");
}
document.addEventListener('readystatechange', e => {
  switch (document.readyState) {
    case "interactive":
      // The document has finished loading. We can now access the DOM elements.
      // But sub-resources such as images, stylesheets and frames are still loading.
      //console.log("ready without external resources");
      break;
    case "complete":
      // The page is fully loaded.
      //console.log("ready");
      //bulmaSlider.attach();
      init_slider();
      init_buttons();
      init_filesChoosers();
      break;
  }
});
