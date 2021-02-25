
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


