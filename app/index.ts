
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
/*
const update = setInterval(() => {
  //stepsLabel.text = `steps ${today.adjusted.steps}`;
  calsLabel.text = `cals ${today.adjusted.calories}`;
  countDown.text = (`00${--cd}`).slice(-2);

  calsLabel.mainText.style.fill = cd % 2 === 0 ? "limegreen" : "red";
  calsLabel.mainText.style.opacity = cd % 2 === 0 ? 1 : 0.5;
  //console.log(cd)
  if (cd == 0) {
    cd = 100;
  }
}, 1000);
*/
// TESTED SETTINGS ON SHADOW-WIDGET-ELEMENT
// on the <use> itself
test.text = "TEST";
test.x = 168;
test.y = 180;

test.style.fontFamily = "Barlow-Bold";
test.letterSpacing = 1;
test.textAnchor = "middle";


// desirable settings on mainText (main)
test.mainText.style.fill = "red";  // NO x,y on mainText as 0,0 => coords of the <use>
test.mainText.style.opacity = 1;
test.mainText.style.display = "inline";
test.mainText.style.visibility = "visible";


// desirable settings on shadowText (shadow)
test.shadowText.x = 5;
test.shadowText.y = 5;
test.shadowText.style.fill = "red";  // NO x,y on mainText as 0,0 => coords of the <use>
test.shadowText.style.opacity = 1;
test.shadowText.style.display = "inline";
test.shadowText.style.visibility = "visible";



// desirable settings on shadowText (shadow)
test.lightText.x = 5;
test.lightText.y = 5;
test.lightText.style.fill = "red";  // NO x,y on mainText as 0,0 => coords of the <use>
test.lightText.style.opacity = 1;
test.lightText.style.display = "inline";
test.lightText.style.visibility = "visible";

// settings on classes for layout eg:
//let highlights = document.getElementsByClassName("light");
//highlights.forEach((e: GraphicsElement) => {
//  e.style.fill = "yellow";
//});

//TODO 1 IMPORTANT: Implement UNWANTED and console.log for each - check settings/logs after change to "GraphicsElement" for subs
//TODO 2 play with classes on <use>s






