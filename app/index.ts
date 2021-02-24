
import document from "document";
import { today } from "user-activity";
import { widgetFactory } from './widgets/widget-factory';
import { shadowText, ShadowTextWidget } from './widgets/shadow-text';

widgetFactory(shadowText);

let myLabel = document.getElementById('myLabel') as ShadowTextWidget;
let myLabel2 = document.getElementById('myLabel2') as ShadowTextWidget;
myLabel.letterSpacing = 20;

const update = () => {
  myLabel.text = `steps ${today.adjusted.steps}`;
  myLabel2.text = `cals ${today.adjusted.calories}`;
  myLabel2.textAnchor = "middle";
}
setInterval(update, 1000);
console.log(myLabel.text)
