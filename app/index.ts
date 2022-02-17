// this widget gets integrated by the widget-factory written by Gondwanasoft:  https://github.com/gondwanasoft/fitbit-simple-widget
import document from "document";
import { today } from "user-activity";
import { widgetFactory } from './widgets/widget-factory';
import { shadowText, ShadowTextWidget } from './widgets/shadow-text';
import {dumpProperties,inspectObject} from './devTools'
//import { ShadowTextWidget } from './widgets/shadow-text/index';

//initialize factory - could have multiple args, if multiple widgets used
widgetFactory(shadowText);

// single widget-instances
let test = document.getElementById('test') as ShadowTextWidget;
let calsLabel = document.getElementById('calsLabel') as ShadowTextWidget;
let countDown = document.getElementById('countDown') as ShadowTextWidget;

// array of subElement 'light' of all widget-instances
// also writes into symbol!
let allLights = document.getElementsByClassName('light') as ShadowTextWidget[];

/*
Each widget instance contains 3 sub Elements:
The text itself and textAttributes get assigned to the widget-instance directly (like el.text = "blah") and inherited from there
//TODO Need to check textAttr on instance/main, but sim crashed
(although I don't understand how that works)
subElements:
main: provides full text-attributes and inherits textAnchor, style:fontFamily/fontSize/letterspacing/
subElements light, shadow:  x,y for offset to main
                            style: fill, opacity, display (to perhaps "mute" one of them)
Position of the whole widget instance gets set on el.x, el.y
also opacity/display can be applied directly (el.style...)
The widget elements have default settings which can be overritten in resources/CSS using id/class
also changes in index.view via set are supported                          
*/

let cd = 100;

setInterval(() => {
  test.text = `steps ${today.adjusted.steps}`;
  calsLabel.text = `cals ${today.adjusted.calories}`;
  countDown.text = (`00${--cd}`).slice(-2);
  // calsLabel.main.style.fill = cd % 2 === 0 ? "limegreen" : "red";
  
  if (cd == 0) {
    cd = 100;
  }
}, 1000);
// 
// countDown.light.style.opacity = 1;
test.style.fontSize = 50;
test.x = 168;
test.style.fontFamily = "Barlow-Regular"
test.main.style.fill = "blue"
test.shadow.style.fill="black"
//test.light.x = -15;
//test.light.style.fill = "white"
test.light.style.opacity = .5;
test.light.style.display = "inline";
test.style.fill = "yellow"//NOT ASSIGNED
test.textAnchor ="start"
test.textAnchor= "middle"



//INSPECT OBJECTS***************************************************************************************
// PROTOTYPE CHAIN
//dumpProperties('test.main', test.main, false)//crashes sim if set to types == true


// as encapsulated?
//KEY: VALUE PAIR
//inspectObject('test.light',test.light.style)
console.log('I try to get keys' + Object.keys(test.light))  

//TODO vheck why this is not working in this structure
//TODO set el-props to main-props?




