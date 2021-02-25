
import document from "document";
import { today } from "user-activity";
import { widgetFactory } from './widgets/widget-factory';
import { shadowText, ShadowTextWidget } from './widgets/shadow-text';

widgetFactory(shadowText);

let stepsLabel = document.getElementById('stepsLabel') as ShadowTextWidget;
let calsLabel = document.getElementById('calsLabel') as ShadowTextWidget;
let countDown = document.getElementById('countDown') as ShadowTextWidget;

let cd = 100;

const update = setInterval(() => {
  stepsLabel.text = `steps ${today.adjusted.steps}`;
  calsLabel.text = `cals ${today.adjusted.calories}`;
  countDown.text = (`00${--cd}`).slice(-2);

  if (cd == 0) {
    cd = 100;
  }
}, 1000);

// TESTED SETTINGS ON SHADOW-WIDGET-ELEMENT

let test = stepsLabel;
//test.x = 200;
//test.y = 200;
//test.textAnchor = "end";
//testLabel.letterSpacing = 5;
//test.style.opacity = 0.2;
//test.style.fontFamily = "Tungsten-Medium";
//test.style.fontSize = 25;
//test.style.display = "none";

// el.style.fill is NOT applicable on the widget-text directly, as it is composed out of multiple elements!!!
// (the 3 classes to add fill are 'highlight', 'shadow' and 'main')
// instead you can manipulate (the fill of) a class like this:

//let highlights = document.getElementsByClassName("highlight");
//highlights.forEach(e => {
//  (e as TextElement).style.fill = "yellow"
  
//});
