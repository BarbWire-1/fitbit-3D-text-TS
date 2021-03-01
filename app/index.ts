
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


// TESTED SETTINGS ON SHADOW-WIDGET-ELEMENT
// <use>
// NORMAL settings on <use>
//test.text = "TEST"; 
//console.log(`text: ${test.text}`); // text: undefined (as redrawn in closure - but working)
test.x = 168; "✔️"
//console.log(`x: ${test.x}`) // x: 168;
test.y = 180; "✔️"
//console.log(`y: ${test.y}`) // x: 180;
test.style.fontFamily = "Barlow-Bold"; "✔️"
//console.log(`fontFamily: ${test.style.fontFamily}`) // fontFamily: Barlow-Bold
test.letterSpacing = 0; "✔️"
//console.log(`letterSpacing: ${test.letterSpacing}`) // letterSpacing: undefined (as redrawn in closure - but working)
test.textAnchor = "middle"; "✔️"
//console.log(`textAnchor: ${test.textAnchor}`) // textAnchor: undefined (as redrawn in closure - but working)


// UNWANTED settings on <use>
test.style.fill = "white"; "✔️"
//console.log(`fill: ${test.style.fill}`) // fill: #FFFFFF (gets applied, but at the invisible #text)
//##########################################################################################################################################


/*
// desirable settings on mainT (main)
test.mainT.style.fill = "red";  // NO x,y on mainT as 0,0 => coords of the <use>
test.mainT.style.opacity = 1;
test.mainT.style.display = "inline";
test.mainT.style.visibility = "visible";


// desirable settings on shadowT (shadow)
test.shadowT.x = 5;
test.shadowT.y = 5;
test.shadowT.style.fill = "red";  // NO x,y on mainT as 0,0 => coords of the <use>
test.shadowT.style.opacity = 1;
test.shadowT.style.display = "inline";
test.shadowT.style.visibility = "visible";



// desirable settings on shadowT (shadow)
test.lightT.x = 5;
test.lightT.y = 5;
test.lightT.style.fill = "red";  // NO x,y on mainT as 0,0 => coords of the <use>
test.lightT.style.opacity = 1;
test.lightT.style.display = "inline";
test.lightT.style.visibility = "visible";
*/
// settings on classes for layout eg:
//let highlights = document.getElementsByClassName("light");
//highlights.forEach((e: GraphicsElement) => {
//  e.style.fill = "yellow";
//});

//TODO 1 IMPORTANT: Implement UNWANTED and console.log for each - check settings/logs after change to "GraphicsElement" for subs
//TODO 2 play with classes on <use>s




console.log(`test light.x: ${test.light.x}`) // mainT.x: 100 - correct value here, but not applied
test.light.y = -1;
console.log(`test light.y: ${test.light.y}`)

test.light.x = -1;
test.light.y = -1;
test.light.text = "orange"; // WHY???
//test.light.style.fontSize = 5; // WTF???

test.style.fontSize = 40;
test.light.style.fill = "yellow"; // gets overridden if redrawn
//test.text = String(today.adjusted.steps);
