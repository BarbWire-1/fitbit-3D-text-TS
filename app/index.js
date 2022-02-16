// this widget gets integrated by the widget-factory written by Gondwanasoft:  https://github.com/gondwanasoft/fitbit-simple-widget
import document from "document";
import { today } from "user-activity";
import { widgetFactory } from './widgets/widget-factory';
import {shadowText} from './widgets/shadow-text';
import {dumpProperties, inspectObject} from './devTools'




widgetFactory(shadowText);


// single widget-uses
let test = document.getElementById('test');
let calsLabel = document.getElementById('calsLabel');
let countDown = document.getElementById('countDown');

//class light
let allLights = document.getElementsByClassName('light');

/*
Each widet use contains 3 sub Elements:
main: provides full text-attributes and inherits fontFamily/fontSize/letterspacing/textAnchor 
subElements light, shadow:  x,y for offset to main
                            style: fill, opacity, display (to perhaps "mute" one of them)

Position of the whole element gets set on el.x, el.y
also opacity/display can be applied directly (el.style...)
The text itself gets assigned to the widget-use directly (like el.text = "blah") and inherited from there
(although I don't understand how that works)

The widget elements have default settings which can be overritten in resources/CSS using id/class
also changes in index.view via set are supported                          
*/


let cd = 100;

setInterval(() => {
  test.text = `steps ${today.adjusted.steps}`;
  calsLabel.text = `cals ${today.adjusted.calories}`;
  countDown.text = (`00${--cd}`).slice(-2);
  // to check redraw
  calsLabel.main.style.fill = cd % 2 === 0 ? "limegreen" : "grey";
  
  if (cd == 0) {
    cd = 100;
  }
}, 1000);
// 
//calsLabel.light.style.opacity = 1;
countDown.light.style.opacity = 1;
test.style.fontSize = 50;
test.x = 168;
//test.style.fontFamily = "Tungsten-Medium"
test.main.style.fill = "blue"
test.shadow.style.fill="black"
//test.light.x = -15;
test.light.style.fill = "white"
//test.light.style.opacity = 1;
test.light.style.display = "inline";


test.light.style.fontSize = 100;
//console.log(test.light.style.fontSize) //undefined and not applied


//INSECT OBJECTS*********************************************************************************
// INSPECT PROTOTYPECHAIN ©️ Gondwana
//dumpProperties('test', test, true) // widget

// INSPECT key:value
//inspectObject('test',test)// test redraw: undefined 
inspectObject('test.light', test.light) 
inspectObject('test.light.style', test.light.style) 
//test.light.text = "blah" ;//Unhandled exception: TypeError: Invalid argument type.
//test.light.style.fontSize = 50; // doesn't get applied, but NO error
//test.light.style.fontFamily = "Barlow-Bold"; // doesn't get applied, but NO error



//TODO WRITE NEW EXCEPTION (all notes "undone""...grrr)
//TODO set el-props to main-props?
//TODO how to get the props owner id here?

