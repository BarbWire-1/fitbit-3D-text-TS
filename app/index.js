// this widget gets integrated by the widget-factory written by Gondwanasoft:  https://github.com/gondwanasoft/fitbit-simple-widget
import document from "document";
import { startFactory } from "./widgets/construct-widgets";
import './widgets/shadow-text';



console.log(`6. startApp ${Date.now() - startFactory}ms from start`)
console.log('-------------------------------')
// single widget-uses

let widgetUsesGroup = document.getElementById('widgetUsesGroup')
let widget = widgetUsesGroup.getElementsByClassName("widget-auto");

let newUse = widgetUsesGroup.getElementById('newUse')
newUse.style.fontSize = 30;
newUse.style.fill = 'magenta'
let newUse2 = widgetUsesGroup.getElementById('newUse2')
newUse2.text = 'blah'

let classEl1 = document.getElementById('classEl1')


//newUse.text='blah'
const logThroughWidget = (array) => {
    array.forEach(el => {
        console.log(`${el.id}.fill: ${el.style.fill}`)//undefined. why? main also undefined
        console.log(`${el.id}.fontFamily: ${el.style.fontFamily}`)
        console.log(`${el.id}.fontSize: ${el.style.fontSize}`)//new.fontSize: -32768  ??? (set to 30 in css) applies correct
        console.log(`${el.id}.light.fill: ${el.light.style.fill}`)
        console.log(`${el.id}.light.x: ${el.light.x}`)
        console.log(`${el.id}.shadow.fill: ${el.shadow.style.fill}`)
        console.log(`${el.id}.shadow.x: ${el.shadow.x}`)
        console.log('-------------------------------')
    })    
};
logThroughWidget(widget)

console.log(`7. endApp ${Date.now() - startFactory}ms from start`)

//TODO test if <set> can overwrite everything, then clean



