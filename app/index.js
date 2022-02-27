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
let cd = 100;
setInterval(() => {
    calsLabel.text = `cals ${today.adjusted.calories}`;
    countDown.text = (`00${--cd}`).slice(-2);
    test.style.fontSize = cd % 2 == 0 ? 50 : 70;
    
    if (cd == 0) {
        cd = 100;
    }
}, 1000);
calsLabel.textAnchor = "middle"

//* TESTING *******************************************************************************************
// GETTERS
//TODO P^ widget defaults don't get logged here
// integrate defaults in getters?
// I had tried to change sequence, ie setting initialisation on top of the construct(), but then there are some elements undefined 
test.style.fontSize = 50;
test.main.style.fill = "white";
test.shadow.style.fill = "black";
test.light.style.fill = "white";
test.light.x = -10;
test.light.y = -10;
test.shadow.x = 5;
test.shadow.y = 5
// test.shadow.style.display = "inline"
// test.shadow.style.opacity =0.8;
// test.light.style.opacity = 0.5;

//test.style.display = 'none';
test.main.style.display = 'none'// TODO P ^ this gets also processed if display = "none"???


//test.style.fontFamily = "Tungsten-Medium"

console.log(test.x)//0 as set in %
console.log(test.y)//168 as literal
console.log(test.text)// steps
console.log(test.main.style.fill)//#FFFFFF 
console.log(test.textAnchor)//middle
console.log(test.style.fontSize)// -32768 - although set above return elstyle wrong, but style: undefined
console.log(test.style.fontFamily)// 
console.log('calsLabel.style.fontFamily: ' + calsLabel.style.fontFamily)
console.log(calsLabel.text)// working
console.log(test.shadow.x)
console.log(`test.getBBox().width: ${test.getBBox().width}`)
console.log(`test.mainBBox().width: ${test.mainBBox().width}`)
//INSPECT OBJECTS****************************************************************************************

// INSPECT PROTOTYPECHAIN ©️ Gondwana

// dumpProperties('test.light', test.light, true)
// dumpProperties('test.light.style', test.light.style, true)
// dumpProperties('test.light.style.fill', test.light.style.fill, false)


// INSPECT key:value

// console.log(`test.main.style: ${Object.keys(test.main.style)}`)//test.main.style: opacity,display,fill
inspectObject('test.style', test.style)// test.main.style.fill: undefined
//console.log(test.text)


//TODO P^I wonder about the best place to apply Object.seal(). Had you tested that?
// as there are some set on outer (API) and inner like 'style'





