
import document from "document";
import { today } from "user-activity";
import { widgetFactory } from './widgets/widget-factory';
import { shadowText, ShadowTextWidget } from './widgets/shadow-text';

widgetFactory(shadowText);

let test = document.getElementById('test') as ShadowTextWidget;
let calsLabel = document.getElementById('calsLabel') as ShadowTextWidget;
let countDown = document.getElementById('countDown') as ShadowTextWidget;
//let test: ShadowTextWidget = stepsLabel;


let cd = 100;

const update = setInterval(() => {
  test.text = `steps ${today.adjusted.steps}`;
  calsLabel.text = `cals ${today.adjusted.calories}`;
  countDown.text = (`00${--cd}`).slice(-2);

  calsLabel.main.style.fill = cd % 2 === 0 ? "limegreen" : "red";
  calsLabel.main.style.opacity = cd % 2 === 0 ? 1 : 0.5;
  //console.log(cd)
  if (cd == 0) {
    cd = 100;
  }
}, 1000);


test.style.fontSize = 50;
test.style.fontFamily = "Barlow-Regular"
test.main.style.fill = "blue"
test.shadow.style.fill="black"

console.log(`test.light.style.fill: ${test.light.style.fill}`)
console.log(`test.light.x: ${test.light.x}`)
console.log("test.main.textAnchor: "+test.main.textAnchor)
