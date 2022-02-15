// this widget gets integrated by the widget-factory written by Gondwanasoft:  https://github.com/gondwanasoft/fitbit-simple-widget
import document from "document";
import { today } from "user-activity";
import { widgetFactory } from './widgets/widget-factory';
import { shadowText, ShadowTextWidget } from './widgets/shadow-text';
import {dumpProperties,inspectObject} from './devTools'
//import { ShadowTextWidget } from './widgets/shadow-text/index';

widgetFactory(shadowText);

let test = document.getElementById('test') as ShadowTextWidget;
let calsLabel = document.getElementById('calsLabel') as ShadowTextWidget;
let countDown = document.getElementById('countDown') as ShadowTextWidget;
let allLights = document.getElementsByClassName('light') as ShadowTextWidget[];


let cd = 100;

setInterval(() => {
  test.text = `steps ${today.adjusted.steps}`;
  calsLabel.text = `cals ${today.adjusted.calories}`;
  countDown.text = (`00${--cd}`).slice(-2);
  

 // calsLabel.main.style.fill = cd % 2 === 0 ? "limegreen" : "red";
  
  //console.log(cd)
  if (cd == 0) {
    cd = 100;
  }
}, 1000);
// 
// countDown.light.style.opacity = 1;
test.style.fontSize = 50;
test.x = 168;
test.style.fontFamily = "Barlow-Regular"
test.main.style.fill = "blue"
test.shadow.style.fill="black"
//test.light.x = -15;
//test.light.style.fill = "white"
test.light.style.opacity = 1;
test.light.style.display = "inline";
test.style.fill = "yellow"//NOT ASSIGNED
// TODO set el-props to main-props?
// test.x DOES get applied...tss


// console.log(`test.light.style.fill: ${test.light.style.fill}`)
// console.log(`test.light.x: ${JSON.stringify(test.light.x)}`)
// console.log("test.main.textAnchor: "+test.main.textAnchor);

//allLights.forEach(el => el.style.fill = "black");

//console.log(JSON.stringify(allLights))
test.light.style.fill = "limegreen"
//test.main.letterSpacing = 50;


//INSPECT OBJECT PROTOTYPE CHAIN
//dumpProperties('test', test, true)

//TODO vheck why this is not working in this structure
// as encapsulated?
//Inspect object key:value
inspectObject('test.light',test.light.style)
console.log('I try to get keys' + Object.keys(test.light))  


