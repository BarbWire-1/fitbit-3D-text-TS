// this widget gets integrated by the widget-factory written by Gondwanasoft:  https://github.com/gondwanasoft/fitbit-simple-widget
import document from "document";
import { today } from "user-activity";
import { widgetFactory } from './widgets/widget-factory';
import { shadowText, ShadowTextWidget } from './widgets/shadow-text';
//import { ShadowTextWidget } from './widgets/shadow-text/index';

widgetFactory(shadowText);

let test = document.getElementById('test') as ShadowTextWidget;
let calsLabel = document.getElementById('calsLabel') as ShadowTextWidget;
let countDown = document.getElementById('countDown') as ShadowTextWidget;
let allLights = document.getElementsByClassName('light') as ShadowTextWidget[];


let cd = 100;

const update = setInterval(() => {
  test.text = `steps ${today.adjusted.steps}`;
  calsLabel.text = `cals ${today.adjusted.calories}`;
  countDown.text = (`00${--cd}`).slice(-2);
  

 // calsLabel.main.style.fill = cd % 2 === 0 ? "limegreen" : "red";
  
  //console.log(cd)
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
test.light.style.opacity = 1;
test.light.style.display = "inline";
test.style.fill = "yellow"//NOT ASSIGNED
// TODO set el-props to main-props?
// test.x DOES get applied...tss


console.log(`test.light.style.fill: ${test.light.style.fill}`)
console.log(`test.light.x: ${JSON.stringify(test.light.x)}`)
console.log("test.main.textAnchor: "+test.main.textAnchor);

//allLights.forEach(el => el.style.fill = "black");

console.log(JSON.stringify(allLights))
test.light.style.fill = "limegreen"


//INSPECT OBJECT PROTOTYPE CHAIN
function dumpProperties(name, obj, types) {  // This isn't needed; it's just to show how everything links together
  // types: try to determine type of each property: can cause hard crashes with some objects.
  let proto = obj
  let level = 0
  let type = '?'
  console.log(`Members of ${name}:`)
  do {
    console.log(`  Level ${level++}:`)
    for(const memberName in proto) {
      //console.log('in for()')
      if (proto.hasOwnProperty(memberName)) {
        //console.log(`in if() ${memberName}`)
        // memberName 'text' crashes sim
        if (types)
          try {
            //console.log('before obj[]')
            const member = obj[memberName]  // get member from top-level obj rather than proto, as the latter crashes if not a function
            //console.log(`in try member=${member}`)
            type = typeof member
          } catch(e) {
            //console.log('in catch')
            type = 'INACCESSIBLE'
          }
        console.log(`    ${memberName} (${type})`)
      }
    }
    proto = Object.getPrototypeOf(proto)
    console.log('  ---------------')
  } while (proto)
}
//dumpProperties('test', test, true)
