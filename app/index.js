// this widget gets integrated by the widget-factory written by Gondwanasoft:  https://github.com/gondwanasoft/fitbit-simple-widget
import document from "document";
import { today } from "user-activity";
import { widgetFactory } from './widgets/widget-factory';
import {shadowText} from './widgets/shadow-text';
import {dumpProperties, inspectObject} from './devTools'




widgetFactory(shadowText);



let test = document.getElementById('test');
let calsLabel = document.getElementById('calsLabel');
let countDown = document.getElementById('countDown');
let allLights = document.getElementsByClassName('light');


let cd = 100;

setInterval(() => {
  test.text = `steps ${today.adjusted.steps}`;
  calsLabel.text = `cals ${today.adjusted.calories}`;
  countDown.text = (`00${--cd}`).slice(-2);
  

  calsLabel.main.style.fill = cd % 2 === 0 ? "limegreen" : "grey";
  
  //console.log(cd)
  if (cd == 0) {
    cd = 100;
  }
}, 1000);
// 
//calsLabel.light.style.opacity = 1;
countDown.light.style.opacity = 1;
test.style.fontSize = 50;
test.x = 168;
test.style.fontFamily = "Barlow-Bold"
test.main.style.fill = "blue"
test.shadow.style.fill="white"
//test.light.x = -15;
test.light.style.fill = "white"
test.light.style.opacity = 1;
test.light.style.display = "inline";

// console.log(`test.light.style.fill: ${test.light.style.fill}`)
// console.log(`test.light.x: ${(test.light.x)}`)
// console.log("test.main.textAnchor: "+test.main.textAnchor);

//allLights.forEach(el => el.style.fill = "black");

test.light.style.fill = "limegreen"

test.light.x = -2
test.light.y = -2

test.light.style.fontSize = 100;
//console.log(test.light.style.fontSize) //undefined and not applied

//TODO WRITE NEW EXCEPTION (all notes "undone""...grrr)
//TODO set el-props to main-props?
//TODO how to get the props owner id here?

// INSPECT PROTOTYPECHAIN ©️ Gondwana
 dumpProperties('test', test, true) // widget

// INSPECT key:value
inspectObject('test',test)// test redraw: undefined 
inspectObject('test.light', test.light) 
// test.light style: {}
// test.light x: -2
// test.light y: -2
inspectObject('test.light.style', test.light.style) 
// test.light.style fill: "#32CD32"
// test.light.style opacity: 1 
// test.light.style display: "inline"
