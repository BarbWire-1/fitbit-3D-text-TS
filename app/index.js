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
x,y,text, letterSpacing, textAnchor
style:
all font-attributes, opacity, display
additionally:
subElements main, light, shadow

(The text itself and textAttributes get assigned to the widget-instance directly (like el.text = "blah") and inherited from there


SUBELEMENTS:
properties in general:
* x, y, style: fill, opacity, display (to perhaps "mute" one of them)

specific:
main:
* x,y are fixed to x,y of the widget-instance (changes here get overwritten in widget)

light, shadow:
* x,y for offset to main

Position of the whole widget instance gets set on el.x, el.y
also opacity/display can be applied directly (el.style...)


The widget elements have default settings which can be overritten in resources/CSS using id/class
also changes on those properties in index.view via set or changes from index.js are supported
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

countDown.light.style.opacity = 1;
calsLabel.textAnchor = "middle";

test.style.fontSize = 50;
test.main.style.fill = "blue";
test.shadow.style.fill="black";
test.light.style.fill = "white";


//INSECT OBJECTS*********************************************************************************
// INSPECT PROTOTYPECHAIN ©️ Gondwana
//dumpProperties('test.main', test.main, false) //

// INSPECT key:value
//inspectObject('test.light', test.light)// keys and values for !style

