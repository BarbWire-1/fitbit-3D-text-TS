
import document from "document";
import { today } from "user-activity";
import { widgetFactory } from './widgets/widget-factory';
import { shadowText, ShadowTextWidget } from './widgets/shadow-text';

widgetFactory(shadowText);

let myLabel = document.getElementById('myLabel') as ShadowTextWidget;

const steps = () => {
  myLabel.text = String(today.adjusted.steps);
}
setInterval(steps, 1000);
console.log(myLabel.text)
