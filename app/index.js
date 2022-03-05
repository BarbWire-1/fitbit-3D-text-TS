// this widget gets integrated by the widget-factory written by Gondwanasoft:  https://github.com/gondwanasoft/fitbit-simple-widget
import document from "document";
import { today } from "user-activity";
import { startFactory } from "./widgets/construct-widgets";
import './widgets/shadow-text';
import { dumpProperties, inspectObject } from './devTools'

console.log(`6. startApp ${Date.now() - startFactory}ms from start`)
console.log('-------------------------------')
// single widget-uses

let widgetUsesGroup = document.getElementById('widgetUsesGroup')
let widget = widgetUsesGroup.getElementsByClassName("widget-auto");

let normalUsesGroup = document.getElementById('normalUsesGroup')
let normal = normalUsesGroup.getElementsByClassName("normalUse");


const logThroughUses = (array) => {
    array.forEach(el => {
        let testFill = el.getElementById('lightN').style.fill
        console.log(`${el.id}.light.fill: ${testFill}`)
    })
    console.log('-------------------------------')
};
logThroughUses(normal)

//console.log(`normal.light.style.fill: ${normal.light.style.fill}`)//TypeError: Cannot read property 'style' of undefined 😧

const logThroughWidget = (array) => {
    array.forEach(el => {
        console.log(`${el.id}.light.fill: ${el.light.style.fill}`)
    })
    console.log('-------------------------------')
};

logThroughWidget(widget)

const logThroughUses2 = (array) => {
    array.forEach(el => {
        let testFill = el.getElementById('lightN').style.fill
        
        console.log(`${el.id}.light.fill: ${testFill}`)
    })
    console.log('-------------------------------')
};
logThroughUses2(normal)
// dumpProperties('normal1', normal1, 1)
// inspectObject('normal1', normal1)//normal1 keys:  // and.... nothing!

//logThroughUses(normal)

// //inspectObject('app line 12 test.light.style', test.light.style)
// console.log('app line 12 test.light.style.fill', test.light.style.fill)//#9ACD32 
// console.log('-------------------------------')
// 
// 
// //class light
// let allLights = document.getElementsByClassName('light');
// 
// calsLabel.text = `cals ${today.adjusted.calories}`;
// countDown.text = 100;
// //inspectObject('app line 20 test.light.style', test.light.style)
// // SETINTERVAL FOR TESTING ADJUSTMENTS ON RUNTIME
// let cd = 100;
// console.log('app line 25 test.light.style.fill', test.light.style.fill)
// console.log('-------------------------------')
// // setInterval(() => {
// //     calsLabel.text = `cals ${today.adjusted.calories}`;
// //     countDown.text = (`00${--cd}`).slice(-2);
// //     test.style.fontSize = cd % 2 == 0 ? 50 : 70;
// //     test.style.fontFamily = cd % 2 == 0 ? 'System-Regular' : 'Tungsten-Medium';
// //     test.textAnchor = cd % 2 == 0 ? 'middle' : 'start';
// //     test.style.fill = cd % 2 == 0 ? 'white' : 'blue';
// //     
// //     if (cd == 0) {
// //         cd = 100;
// //     }
// // }, 1000);
// calsLabel.textAnchor = "middle"
// 
// //* TESTING *******************************************************************************************
// //test.style.fontFamily = "Tungsten-Medium"
// // test.style.fontSize = 50;
// // test.style.fill = "white";
// // test.shadow.style.fill = "black";
// // test.light.style.fill = "white";
// // test.light.x = -1;
// // test.light.y = -1;
// // test.shadow.x = 5;
// // test.shadow.y = 5
// // test.style.fill = "orange"
// //test.main.style.fill = "white"// invalid argument type
// 
// //INSPECT OBJECTS****************************************************************************************
// 
// // INSPECT PROTOTYPECHAIN ©️ Gondwana
// 
// // dumpProperties('test.light', test.light, true)
// // dumpProperties('test.light.style', test.light.style, true)
// // dumpProperties('test.light.style.fill', test.light.style.fill, false)
// 
// 
// // INSPECT key:value
// 
// // console.log(`test.main.style: ${Object.keys(test.main.style)}`)//test.main.style: opacity,display,fill
// //inspectObject('test', test)// doesn't list style (?)
// //inspectObject('test.style', test.style)
// //inspectObject('test.style.fill', test.style.fill)// returns fill as splitted object!!
// 
// //inspectObject('test.main.style', test.main.style) // doesn't list fill, which is expected
// 
// // inspectObject('test.getBBox()', test.getBBox())
// // 
// // inspectObject('test.main', test.main)
// // inspectObject('test.main.style', test.main.style)
// // inspectObject('test.main.getBBox()', test.main.getBBox())//undefined
// // inspectObject('test.main.getBBox().width', test.main.getBBox().width)//empty !
// // console.log("console: "+ test.main.getBBox().width)//working
// // inspectObject('test.light', test.light)
// 
// // console.log(test.style.fill)//#FFA500
// // console.log(test.main.style.fill)//undefined, which it should be
// //inspectObject('app line 80 test.light.style', test.light.style)
// console.log('app line 85 test.light.style.fill', test.light.style.fill)
// console.log('-------------------------------')

console.log(`7. endApp ${Date.now() - startFactory}ms from start`)



