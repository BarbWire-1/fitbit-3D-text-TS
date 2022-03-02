// this widget gets integrated by the widget-factory written by Gondwanasoft:  https://github.com/gondwanasoft/fitbit-simple-widget
import document from "document";
import { today } from "user-activity";
//import { widgetFactory } from './widgets/widget-factory';
import './widgets/shadow-text';
import { dumpProperties, inspectObject } from './devTools'


// single widget-uses
let test = document.getElementById('test');
let calsLabel = document.getElementById('calsLabel');
let countDown = document.getElementById('countDown');

//class light
let allLights = document.getElementsByClassName('light');

calsLabel.text = `cals ${today.adjusted.calories}`;
countDown.text = 100;

// SETINTERVAL FOR TESTING ADJUSTMENTS ON RUNTIME
let cd = 100;

// setInterval(() => {
//     calsLabel.text = `cals ${today.adjusted.calories}`;
//     countDown.text = (`00${--cd}`).slice(-2);
//     test.style.fontSize = cd % 2 == 0 ? 50 : 70;
//     test.style.fontFamily = cd % 2 == 0 ? 'System-Regular' : 'Tungsten-Medium';
//     test.textAnchor = cd % 2 == 0 ? 'middle' : 'start';
//     test.style.fill = cd % 2 == 0 ? 'white' : 'blue';
//     
//     if (cd == 0) {
//         cd = 100;
//     }
// }, 1000);
// calsLabel.textAnchor = "middle"

//* TESTING *******************************************************************************************
//test.style.fontFamily = "Tungsten-Medium"
test.style.fontSize = 50;
test.style.fill = "white";
test.shadow.style.fill = "black";
test.light.style.fill = "white";
test.light.x = -1;
test.light.y = -1;
test.shadow.x = 5;
test.shadow.y = 5
test.style.fill = "orange"
//test.main.style.fill = "white"// invalid argument type

//INSPECT OBJECTS****************************************************************************************

// INSPECT PROTOTYPECHAIN ©️ Gondwana

// dumpProperties('test.light', test.light, true)
// dumpProperties('test.light.style', test.light.style, true)
// dumpProperties('test.light.style.fill', test.light.style.fill, false)


// INSPECT key:value

// console.log(`test.main.style: ${Object.keys(test.main.style)}`)//test.main.style: opacity,display,fill
//inspectObject('test', test)// doesn't list style (?)
inspectObject('test.style', test.style)
//inspectObject('test.style.fill', test.style.fill)// returns fill as splitted object!!

//inspectObject('test.main.style', test.main.style) // doesn't list fill, which is expected

// inspectObject('test.getBBox()', test.getBBox())
// 
// inspectObject('test.main', test.main)
// inspectObject('test.main.style', test.main.style)
// inspectObject('test.main.getBBox()', test.main.getBBox())//undefined
// inspectObject('test.main.getBBox().width', test.main.getBBox().width)//empty !
// console.log("console: "+ test.main.getBBox().width)//working
// inspectObject('test.light', test.light)

// console.log(test.style.fill)//#FFA500
// console.log(test.main.style.fill)//undefined, which it should be
console.log(Object.keys(test))//text,textAnchor,letterSpacing,style,getBBox// Finally style is in.
//test.main.style.fill = "red"


