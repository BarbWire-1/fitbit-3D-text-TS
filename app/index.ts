
import document from "document";
import { today } from "user-activity";
import { widgetFactory } from './widgets/widget-factory';
import { shadowText, ShadowTextWidget } from './widgets/shadow-text';

widgetFactory(shadowText);

let stepsLabel = document.getElementById('stepsLabel') as ShadowTextWidget;
let calsLabel = document.getElementById('calsLabel') as ShadowTextWidget;
let countDown = document.getElementById('countDown') as ShadowTextWidget;
let test: ShadowTextWidget = stepsLabel;


let cd = 100;

const update = setInterval(() => {
  stepsLabel.text = `steps ${today.adjusted.steps}`;
  calsLabel.text = `cals ${today.adjusted.calories}`;
  countDown.text = (`00${--cd}`).slice(-2);
  test.main.style.fill = cd % 2 === 0? "limegreen" : "red";
  console.log(cd)
  if (cd == 0) {
    cd = 100;
  }
}, 1000);

// TESTED SETTINGS ON SHADOW-WIDGET-ELEMENT


//test.x = 200;
//test.y = 200;
//test.textAnchor = "middle";
test.letterSpacing = 3;
//test.style.opacity = 0.7;
test.style.fontFamily = "Tungsten-Medium";
//test.style.fontSize = 25;
//test.style.display = "none";

// el.style.fill is NOT applicable on the widget-text directly, as it is composed out of multiple elements!!!
// (the 3 layers to add fill are 'highlight', 'shadow' and 'main')
// instead you can manipulate the fill of the layers like this:

test.shadow.style.fill = "blue";
test.light.style.fill = "yellow";


//let highlights = document.getElementsByClassName("highlight");
//highlights.forEach(e => {
//  (e as TextElement).style.fill = "yellow"
  
//});
console.log(JSON.stringify(test.children))
console.log(JSON.stringify(document.getElementsByClassName("highlight")));
console.log(JSON.stringify(document.getElementsByTypeName("shadowText")));
//(test.getElementById("main") as ShadowTextWidget).style.fill = "red" // working: need document in widget index to reach "main" as child?

//test.main.style.fill = "white" //not working
