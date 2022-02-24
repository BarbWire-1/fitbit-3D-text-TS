// this widget gets integrated by the widget-factory written by Gondwanasoft:  https://github.com/gondwanasoft/fitbit-simple-widget
import document from "document";
import { today } from "user-activity";
import './widgets/shadow-text';
import { startFactory } from "./widgets/construct-widgets";
import { dumpProperties, inspectObject } from './devTools'


console.log("start app: " + (Date.now() - startFactory))
// single widget-uses
let test = document.getElementById('test');
let calsLabel = document.getElementById('calsLabel');
let countDown = document.getElementById('countDown');

//class light
let allLights = document.getElementsByClassName('light');


let cd = 100;
setInterval(() => {
    //test.text = `steps ${today.adjusted.steps}`;
    //test.main.style.fill = cd%2? 'red' : 'green';    // alternate fill to detect if StyleSubText is created every time
    calsLabel.text = `cals ${today.adjusted.calories}`;
    countDown.text = (`00${--cd}`).slice(-2);
    //calsLabel.main.style.fill = cd % 2 === 0 ? "limegreen" : "grey";

    if (cd == 0) {
        cd = 100;
    }
}, 1000);
calsLabel.textAnchor = "middle"

//* TESTING *******************************************************************************************
test.style.fontSize = 50;
//test.main.style.fontSize = "Tungsten-Medium"
// TODO B maybe we need to think about whether to .seal or not. Sealing is good because I don't like things silently failing. But it's inconsistent with Fitbit API: if Fitbit sealed element objects, we couldn't make them into widgets, so maybe unsealed is more flexible.
//dumpProperties('test.main.style',test.main.style)   // TODO B by default, defineProperty sets enumable to false, so they won't be seen by dumpProps. I changed some to test. Need to decide what we want.
//test.textAnchor = "middle";
//test.letterSpacing = 10;
test.main.style.fill = "white";
test.shadow.style.fill = "black";
test.light.style.fill = "white";
test.light.x = -10;
test.light.y = -10;
test.shadow.x = 5;
test.shadow.y = 5
//test.main.x = 10000   // test: results in error because x isn't defined in main's API
test.shadow.style.display = "inline"
test.shadow.style.opacity = 1;
console.log("end app: " + (Date.now() - startFactory))
//dumpProperties('test.light.style.fill', test.light.style.fill, false)   // TODO B This is working for me. The only member is .style.
//dumpProperties('test', test, false)                                     // TODO P Yes, But I would love to log the values of the use like style.fill
// TODO B ^ Be careful what you wish for! You could indeed recurse through objects such as .style. But unless you were very selective,
// TODO B ...the same logic would also process .parent, .children (and therefore each child), etc. You'd get a HUGE output.
                                                                        // but If we can read this like now, we might be close...
//test.main.style.display = "none"
//INSPECT OBJECTS****************************************************************************************
// at the moment not possible as encapsulated
// INSPECT PROTOTYPECHAIN ©️ Gondwana
//dumpProperties('test.light.style', test.light.style, true) //
//console.log(`test.main.style keys: ${Object.keys(test.main.style)}`)

// INSPECT key:value
//inspectObject('test.text', test.text)// keys and values for !style
// dumpProperties('test.light', test.light, true)

//TODO search for a way to log/inspect useEl.prop.prop.prop values