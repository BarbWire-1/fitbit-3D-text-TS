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


    //test.style.fontFamily = cd % 2? "Fabrikat-Bold" : "System-Regular"; // this works, but fontSize doesn't!
    test.style.fontSize = (cd % 2 == 0) ? 30 : 90;

    const normalTextEl = document.getElementById('normalText');
    normalTextEl.style.fontSize = cd/2+10;          // doesn't work without the following line
    //normalTextEl.text = normalTextEl.text         // 🙄

    //but not only in config
    // If this is activated, it does the applied changes

    // if (cd % 2 == 0) {
    //     test.text = "I can't";
    //     test.main.style.fill = "red"
    // } else {
    //     test.text = "Oh, I can?";
    //     test.main.style.fill = "white"
    // }
    //console.log(test.getBBox().x)//starts with 86/98 for NOT changing text/ 27/85 for changing
    // Although displayed text itself soesn't get changed

    if (cd == 0) {
        cd = 100;
    }
}, 1000);
calsLabel.textAnchor = "middle"

//* TESTING *******************************************************************************************
test.style.fontSize = 50;
test.main.style.fill = "white";
test.shadow.style.fill = "black";
test.light.style.fill = "white";
test.light.x = -10;
test.light.y = -10;
test.shadow.x = 5;
test.shadow.y = 5
test.shadow.style.display = "inline"
test.shadow.style.opacity = 1;
// console.log(test.x)//0   // won't work because Fitbit API doesn't return % values correctly


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

// while values set here do see console.log line 29

//TODO P 3.9 could you have a look which comments or commented out code could be removed? I'm not sure whether there are some we should keep for later decisions to make.
//TODO B ^ I removed some from here and lots from the widget. Anything I didn't recognise I assumed to be yours and left alone. You can cull those if you like.

//TODO is it possible to add console as prop to subEls?