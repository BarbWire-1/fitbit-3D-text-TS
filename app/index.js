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
  test.text = `steps ${today.adjusted.steps}`;    // TODO P A1 Why does setting .text on widget (use) work?
  // TODO P A1 Isn't it because you've got Object.defineProperty(el, 'text'...
  // TODO P A1 ...which copies from use el into mainEl, and then calls redraw to put it everywhere. That seems like a good system to me.
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

//TODO P A5 can dumpProperties() display 'inherit'?
//TODO P A5 Since the answer to A4 turned out NOT to be related to 'inherit' property values, I no longer feel the need to answer this question. :P
//TODO P A2 You CAN'T even set test.main.text or style.font-anything
//TODO P A2 .main is a different type of object to .light and .shadow. .main returns the Fitbit element object, whereas the others return objects made by createSubText.
//TODO P A2 It isn't surprising that .main behaves differently to the others.
//TODO P A2 More importantly, I'm not sure you want callers messing with main's element object, as they could then change stuff you don't want changed.
//TODO P A2 Think through the design of your API; eg, should .text be set on top-level object, or on .main?
//TODO P A2 Since text should be the same in ALL subText elements, I can't see why you'd want to be able to set it on one of them only.
//TODO P A2 What should users actually be able to do with main? Maybe .main should be like .light and .shadow but without .x and .y.
//TODO P A2 Similarly, I'm very uncomfortable with things like test.light.style.fontSize = 100; as you've tried about. Does it make sense to allow this?
//TODO P A3 I can set test.main.style.fontSize and it doesn't get passed to light and shadow, as I couldn't do that in the redraw. Setting test.style.fontsize works fine for all.
//TODO P A3 I don't see this as a problem, for same reason as A2. Design the API before implementing it. It isn't necessary for things to be settable in every possible way;
//TODO P A3 that will just lead to confusion aboout which setting should take priority.
//TODO P A3 Perhaps a good principle is that if a setting should affect the WHOLE widget (ie, ALL subTexts), it should be settable on the widget (use) itself; eg, .text, .fontSize.
//TODO P A3 If a setting has relevance to an individual subText independently of the others, it should be settable on that subText; eg, .fill.
//TODO P A3 I don't know if this helps, but try to think of the API from the point of view of a widget USER rather than as the widget DEVELOPER.
//TODO P A3 As DEVELOPER, you know that it contains three textEls, and you want to be able to set everything everywhere in every possible way.
//TODO P A3 A widget USER would probably prefer to think of the widget as one magic <text>. It displays ONE string, has ONE location, ONE fontSize, etc. The magic is that it can add a
//TODO P A3 highlight above and below the text. The API should align with that pragmatic and minimalist view.