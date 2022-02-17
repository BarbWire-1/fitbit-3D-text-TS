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
Each widget instance contains 3 sub Elements:

WIDGET-INSTANCE:
properties:
x,y,letterspacing,text
style:
all font-attributes, opacity, display
additionally:
subElements main, light, shadow

(The text itself and textAttributes get assigned to the widget-instance directly (like el.text = "blah") and inherited from there
(although I don't understand how that works))

SUBELEMENTS:
properties in general:
* x, y, style: fill, opacity, display (to perhaps "mute" one of them)

specific:
main:
* x,y are fixed to x,y of the widget-instance (changes here get overwritten in widget)
* textAnchor gets applied here like: el.main.textAnchor

light, shadow:
* x,y for offset to main

Position of the whole widget instance gets set on el.x, el.y
also opacity/display can be applied directly (el.style...)


The widget elements have default settings which can be overritten in resources/CSS using id/class
also changes on those properties in index.view via set or changes from index.js are supported
*/


let cd = 100;

setInterval(() => {
  test.text = `steps ${today.adjusted.steps}`;    // TODO 0 P Why does setting .text on widget (use) work?
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
//test.main.style.fontSize = 30;//only applied to main
test.light.style.fontsize = 50;//I think it get's applied but redrawn in widget?
test.main.textAnchor = "end"
test.letterSpacing = 20;



//INSECT OBJECTS*********************************************************************************
// INSPECT PROTOTYPECHAIN ©️ Gondwana
//dumpProperties('test', test, false) // instance
dumpProperties('test.main', test.main, false) //

// INSPECT key:value
//inspectObject('test',test)// test redraw: undefined
//inspectObject('test.light', test.light)
//inspectObject('test.light.style', test.light.style)
//test.light.text = "blah" ;//Unhandled exception: TypeError: Invalid argument type.
//test.light.style.fontSize = 50; // doesn't get applied, but NO error
//test.light.style.fontFamily = "Barlow-Bold"; // doesn't get applied, but NO error
//dumpProperties('test.main', test.main, false)
//inspectObject('test', test)// instance
inspectObject('test.main', test.main)// empty
//inspectObject('test.light', test.light)// keys and values for !style

//TODO 0 P can dumpProperties() display 'inherit'?
//TODO 0 P You CAN'T even set test.main.text or style.font-anything
//TODO 0 P I can set test.main.style.fontSize and it doesn't get passed to light and shadow, as I couldn't do that in the redraw. Setting test.style.fontsize works fine for all.