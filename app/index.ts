
import document from "document";

import { widgetFactory } from './widgets/widget-factory';
import { shadowText, ShadowTextWidget } from './widgets/shadow-text';

widgetFactory(shadowText);

let myLabel = document.getElementById('myLabel') as ShadowTextWidget;


myLabel.text = "test-text";
console.log(myLabel.text)
