
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
  //stepsLabel.text = `steps ${today.adjusted.steps}`;
  calsLabel.text = `cals ${today.adjusted.calories}`;
  countDown.text = (`00${--cd}`).slice(-2);

  test.main.style.fill = cd % 2 === 0 ? "limegreen" : "red";
  test.main.style.opacity = cd % 2 === 0 ? 1 : 0.5;
  //console.log(cd)
  if (cd == 0) {
    cd = 100;
  }
}, 1000);

// TESTED SETTINGS ON SHADOW-WIDGET-ELEMENT


//test.x = 200;
//test.y = 200;
//test.textAnchor = "end"; 
//test.letterSpacing = 20;
//test.style.opacity = 0.7;
test.style.fontFamily = "Tungsten-Medium";
//test.style.fontSize = 25;
//test.style.display = "none";

// el.style.fill is NOT applicable on the widget-text directly, as it is composed out of multiple elements!!!
// (the 3 layers to add fill are 'highlight', 'shadow' and 'main')
// instead you can manipulate the fill of the layers like this:

test.shadow.style.fill = "blue";
test.light.style.fill = "yellow";

// settings on classes for layout eg:
//let highlights = document.getElementsByClassName("light");
//highlights.forEach((e: GraphicsElement) => {
//  e.style.fill = "yellow";
//});


//test.main.text = "blah" //
//test.main.textAnchor = "end" // - "same" -
test.shadow.x = 5;
test.shadow.y = 5;
//test.textAnchor = "end";
/*
console.log(test.shadow.style.fill)  
console.log(test.text)               
console.log(test.main.text)          // logs text-buffer 
console.log(test.textAnchor)         
console.log(test.main.textAnchor)    
console.log(test.letterSpacing)      
console.log(test.main.letterSpacing) 

console.log(stepsLabel.textAnchor)
console.log(calsLabel.textAnchor)
console.log(`textAnchor from svg: ${countDown.textAnchor}`)


//countDown.main.textAnchor = "middle";
console.log(`textAnchor ater startup: ${countDown.textAnchor}`)
countDown.text = "blah"
countDown.main.text = "NÖ" // overrides text on element.text
countDown.letterSpacing = 20; 
countDown.textAnchor = "middle" 
countDown.style.fontFamily = "Tungsten-Medium" 
*/
//TODO 1 IMPORTANT: check settings/logs after change to "GraphicsElement" for subs
//TODO 2 play with classes on <use>s

console.log(test.main.text)

//settings on symbol-intern class
//document.getElementsByClassName("light").forEach( (e: GraphicsElement) => {
//    e.style.fill = "yellow";
//  });
test.text = "doof";
test.main.text = "blah"  // overrides main.text EXTERN! so changes don´t get inherited to other subs
test.shadow.style.fill = "white";
test.shadow.x = 10;

const testRect = document.getElementById("testRect");

