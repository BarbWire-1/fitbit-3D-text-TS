// this widget gets integrated by the widget-factory written by Gondwanasoft:  https://github.com/gondwanasoft/fitbit-simple-widget
import document from "document";
import { startFactory } from "./widgets/construct-widgets";
import './widgets/shadow-text';


console.log(`6. startApp ${Date.now() - startFactory}ms from start`)
console.log('-------------------------------')
// single widget-uses

let widgetUsesGroup = document.getElementById('widgetUsesGroup')
let widget = widgetUsesGroup.getElementsByClassName("widget-auto");


const logThroughWidget = (array) => {
    array.forEach(el => {
        console.log(`${el.id}.light.fill: ${el.light.style.fill}`)
    })
    console.log('-------------------------------')
};

logThroughWidget(widget)



console.log(`7. endApp ${Date.now() - startFactory}ms from start`)

// TODO DEFAULTS on symbol x,y overwritable
// DEFAULTS on subElements: in symbol css on class. eG .light {}
// can be overwritten in css on #useEl #subEl
// TODO test class settings in widget class="widget-auto className" (???)



