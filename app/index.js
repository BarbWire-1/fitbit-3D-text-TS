// this widget gets integrated by the widget-factory written by Gondwanasoft:  https://github.com/gondwanasoft/fitbit-simple-widget
import document from "document";
import { today } from "user-activity";
import { widgetFactory } from './widgets/widget-factory';
import {shadowText,testEl } from './widgets/shadow-text';




widgetFactory(shadowText);



let test = document.getElementById('test');
let calsLabel = document.getElementById('calsLabel');
let countDown = document.getElementById('countDown');
let allLights = document.getElementsByClassName('light');


let cd = 100;

const update = setInterval(() => {
  test.text = `steps ${today.adjusted.steps}`;
  calsLabel.text = `cals ${today.adjusted.calories}`;
  countDown.text = (`00${--cd}`).slice(-2);
  

  calsLabel.main.style.fill = cd % 2 === 0 ? "limegreen" : "grey";
  
  //console.log(cd)
  if (cd == 0) {
    cd = 100;
  }
}, 1000);
// 
//calsLabel.light.style.opacity = 1;
countDown.light.style.opacity = 1;
test.style.fontSize = 50;
test.x = 168;
test.style.fontFamily = "Barlow-Bold"
test.main.style.fill = "blue"
test.shadow.style.fill="white"
//test.light.x = -15;
test.light.style.fill = "white"
test.light.style.opacity = 1;
test.light.style.display = "inline";

// console.log(`test.light.style.fill: ${test.light.style.fill}`)
// console.log(`test.light.x: ${(test.light.x)}`)
// console.log("test.main.textAnchor: "+test.main.textAnchor);

//allLights.forEach(el => el.style.fill = "black");

test.light.style.fill = "limegreen"


test.light.x = -2
test.light.y = -2

  test.light.style.fontSize = 100;
  //console.log(test.light.style.fontSize) //undefined and not applied

//console.log(test.light.style.fill) // #32CD32 
//BUT:
//console.log(JSON.stringify(allLights)) //[{},{},{}]


// deleted my exception for wrong property... so
//TODO WRITE NEW EXCEPTION (all notes "undone""...grrr)

// //logs a list of Els key:value
// Object.getOwnPropertyNames(testEl).forEach(function(val, idx, array){
//   console.log(`testEl: ${val}: ${JSON.stringify(testEl[val])}`);
// });
// TODO set el-props to main-props?

//working in widget on lightEl and her on el.light
const inspectObject = (objName,obj) => {
     
  for (const prop in obj) {
    if (obj.hasOwnProperty(prop) || obj.children.hasOwnProperty(prop)) {
      console.log(` ${objName} ${prop}: ${JSON.stringify(obj[prop])}`)
    };
  };
};
//const normalText = document.getElementById('normalText')


// inspectObject('test',test)//redraw: undefined
// inspectObject('test.light',test.light)//test.light style: {}//x: -2//y: -2
// inspectObject('test.light.style',test.light.style)// test.light.style fill: "#32CD32" // opacity: 1 // display: "inline"



//TODO how to get the props owner id here?

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
//dumpProperties('test', test, true) // widget
//dumpProperties('testEl', testEl, true) // directly exported Obj

//returns:
// Members of testEl:                                                                                       
// Level 0:                                                                                               
// style (object)                                                                                        
// x (undefined)                                                                                         
// y (undefined)                                                                                         
// enumerable (boolean)                                                                                  
// iterable (boolean)                                                                                    
// extensible (boolean) 
// ---------------                                                                                        
// Level 1:                                                                                                
// ---------------                                                                                         
// Level 2:                                                                                                
// ---------------  