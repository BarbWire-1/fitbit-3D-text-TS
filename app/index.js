// this widget gets integrated by the widget-factory written by Gondwanasoft:  https://github.com/gondwanasoft/fitbit-simple-widget
import document from 'document';
import { today } from 'user-activity';
//import { widgetFactory } from './widgets/widget-factory';
import './widgets/shadow-text/Publicindex';
import { dumpProperties, inspectObject } from './devTools';

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
    countDown.text = `00${--cd}`.slice(-2);
    //calsLabel.main.style.fill = cd % 2 === 0 ? "limegreen" : "grey";

    if (cd == 0) {
        cd = 100;
    }
    //console.log(test.text); //undefined
    //console.log(test.dummy.text);// this works
}, 1000);

//inspectObject('test.light', test.light)// keys and values for !style
//inspectObject('test', test)
//text, letterSpacing, textAnchor
//get set on widget instance, but can only be logged from instance.main as passed from there!!!

// test.text = test.main.text;// doesn't help
// console.log(test.text);// this remains undefined, unfortunately
// TODO B search a way to console log these values directly from instance
// now added dummy as 'logText'
// possible to add other properties of <use> in there to log?

//console.log(test.logText.text); // this doesn't show on load
//console.log(test.logText.letterSpacing);// 0
//console.log(test.logText.textAnchor);// middle

//console.log(test.text)// undefined

//countDown.light.style.opacity = 1;
calsLabel.textAnchor = 'middle';

test.style.fontSize = 50;
test.textAnchor = 'middle';
test.letterSpacing = 1;
test.main.style.fill = 'blue';
test.shadow.style.fill = 'black';
test.light.style.fill = 'white';
console.log(test.light.style.fill);
//test.main.x = 10000   // test: results in error because x isn't defined in main's API

//* TESTING *******************************************************************************************
//console.log(test.style.fontSize)
//console.log(test.logText.text)
test.light.x = -1;
test.light.y = -1;
test.light.style.fill = 'white';
test.light.style.display = 'inline';
test.shadow.x = 1;
test.shadow.y = 1;
//test.light.blah = "blah"//Unhandled exception: TypeError: Invalid argument type.

//INSECT OBJECTS*********************************************************************************
// INSPECT PROTOTYPECHAIN ©️ Gondwana
//dumpProperties('test.main', test.main, false); //

// INSPECT key:value
inspectObject('test.light', test.light); // keys and values for !style
//dumpProperties('test.light', test.light, true)
