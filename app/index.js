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
    //test.text = `steps ${today.adjusted.steps}`;
    //test.main.style.fill = cd%2? 'red' : 'green';    // alternate fill to detect if StyleSubText is created every time
    calsLabel.text = cd % 2 == 0 ?`cals ${today.adjusted.calories}` : 'I can ';
    countDown.text = (`00${--cd}`).slice(-2);
    //calsLabel.main.style.fill = cd % 2 === 0 ? "limegreen" : "grey";
    
    
    test.style.fontSize = cd % 2 == 0 ? 30 : 40;
    if (cd % 2 == 0) { test.text = "I can't"; test.main.style.fill ="red" }
    //console.log(test.getBBox().x)//starts with 86 then alternates 116 (steps) 107 (boo)
    //Although displayed text itself soesn't get changed
     
    
    
    
    if (cd == 0) {
        cd = 100;
    }
}, 1000);
calsLabel.textAnchor = "middle"

//* TESTING *******************************************************************************************
test.style.fontSize = 50;
//test.main.style.fontSize = "Tungsten-Medium"
// TODO B maybe we need to think about whether to .seal or not. Sealing is good because I don't like things silently failing. But it's inconsistent with Fitbit API: if Fitbit sealed element objects, we couldn't make them into widgets, so maybe unsealed is more flexible.
// TODO P I absolutely prefer sealing. We don't people want to extend the widget's objects, do we?
//dumpProperties('test.main.style',test.main.style,1)  
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
//console.log(test.getBBox().x)//74
// console.log(test.x)//0
//TODO P this returns 0 - this is the value from symbol. use is set to 50%

//test.main.style.display = "none"

//INSPECT OBJECTS****************************************************************************************

// INSPECT PROTOTYPECHAIN ©️ Gondwana
// dumpProperties('test.light', test.light, true)
//dumpProperties('test.light.style', test.light.style, true)
//dumpProperties('test.light.style.fill', test.light.style.fill, false)   


// INSPECT key:value
// console.log(`test.main.style: ${Object.keys(test.main.style)}`)//test.main.style: opacity,display,fill
// inspectObject('test.main.style.fill', test.main.style.fill)// test.main.style.fill: undefined
//console.log(test.text)


//TODO search for a way to log/inspect useEl.prop.prop.prop values

//TODO P values set in config do change once in setInterval, but not switch back 
// while values set here do see console.log line 29

//TODO P could you have a look which comments or commented out code could be removed? I'm not sure whether there are some we should keep for later decisions to make.

//TODO is it possible to add console as prop to subEls?