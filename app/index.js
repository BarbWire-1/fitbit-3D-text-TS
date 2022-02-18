// this widget gets integrated by the widget-factory written by Gondwanasoft:  https://github.com/gondwanasoft/fitbit-simple-widget
import document from "document";
import { today } from "user-activity";
import { widgetFactory } from './widgets/widget-factory';
import {shadowText} from './widgets/shadow-text';
import {dumpProperties, inspectObject} from './devTools'

//initialize widgetFactory
widgetFactory(shadowText);


// single widget-uses
let test = document.getElementById('test');
let calsLabel = document.getElementById('calsLabel');
let countDown = document.getElementById('countDown');

//class light
let allLights = document.getElementsByClassName('light');


let cd = 100;
setInterval(() => {
  
  test.text = `steps ${today.adjusted.steps}`;   
  calsLabel.text = `cals ${today.adjusted.calories}`;
  countDown.text = (`00${--cd}`).slice(-2);
 
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
inspectObject('test.light', test.light)// keys and values for !style

