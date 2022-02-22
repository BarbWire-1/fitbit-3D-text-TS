// this widget gets integrated by the widget-factory written by Gondwanasoft:  https://github.com/gondwanasoft/fitbit-simple-widget
import document from "document";
import { today } from "user-activity";
//import { widgetFactory } from './widgets/widget-factory';
import './widgets/shadow-text';
import {dumpProperties, inspectObject} from './devTools'

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
  //calsLabel.main.style.fill = cd % 2 === 0 ? "limegreen" : "grey";

  if (cd == 0) {
    cd = 100;
  }
}, 1000);

//* TESTING *******************************************************************************************
test.style.fontSize = 40;
test.textAnchor = "middle";
test.letterSpacing = 10;
test.main.style.fill = "white";
test.shadow.style.fill="black";
test.light.style.fill = "white";
test.light.x = -10;
test.light.y = -10;
test.light.style.opacity = 0.2;
test.shadow.x = 5;
test.shadow.y = 5;
if (test.light.style.textEl) console.warn('textEl is accessible!! :('); // whinge if textEl is exposed publicly
//test.main.x = 10000   // test: results in error because x isn't defined in main's API
test.shadow.style.display = "inline"
test.shadow.style.opacity = 1;

//test.main.style.display = "none"
//INSPECT OBJECTS****************************************************************************************
// at the moment not possible as encapsulated
// INSPECT PROTOTYPECHAIN ©️ Gondwana
//dumpProperties('test.main', test.main, false) //

// INSPECT key:value
 //inspectObject('test.logText.style', test.log.style)// keys and values for !style
// dumpProperties('test.light', test.light, true)

//TODO search for a way to log/inspect objects
