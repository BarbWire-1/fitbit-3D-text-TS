
import document from "document";
import { today } from "user-activity";
import { widgetFactory } from './widgets/widget-factory';
import { shadowText, ShadowTextWidget } from './widgets/shadow-text';

widgetFactory(shadowText);

let myLabel = document.getElementById('myLabel') as ShadowTextWidget;
let myLabel2 = document.getElementById('myLabel2') as ShadowTextWidget;


const update = () => {
  myLabel.text = `steps ${today.adjusted.steps}`;
  myLabel2.text = `cals ${today.adjusted.calories}`;
   
}
setInterval(update, 1000);
console.log(myLabel.text)
