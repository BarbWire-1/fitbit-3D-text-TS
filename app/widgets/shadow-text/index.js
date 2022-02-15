"use strict"
import * as proxy from 'proxy-polyfill'
import { inspectObject, dumpProperties } from '../../devTools';

// DEFAULTS in widgets/shadow-text/styles.css
// this allows them to get overwritten from main CSS if set there
  
// mainEl.style.fill = "grey"
// x,y center screen
// textAnchor middle
// lightEl.style.fill = "white", offset -1/-1
// shadowEl.style.fill = "red", offset 1/1
  


const construct = (el) => {
  
  // MAIN TEXTELEMENT
  const mainEl = el.getElementById('main');
  // and I hate it not showing up possible props in index.
  // it just prevents writing those not wanted
  
  // WRAPPER TO CREATE SUB_ELs
  const createSubText = (el) => ({
   
    get style() {
      return {
        get fill() {return el.style.fill},
        set fill(color) {el.style.fill = color},
        get opacity() {return el.style.opacity},
        set opacity(num) {el.style.opacity = num},
        get display() {return el.style.display},
        set display(val) {el.style.display = val}
     }
    },
    get x() {return el.x},
    set x(num) {el.x = num},
    get y() {return el.y},
    set y(num) {el.y = num},
  });
  
  //SUBTEXT elements
  const lightEl = createSubText(el.getElementById('light'));
  const shadowEl = createSubText(el.getElementById('shadow'));
  Object.seal(lightEl);
  Object.seal(shadowEl);
  
  // const errorHandling = (obj)=>{
  //   
  //     set(obj, prop,value) {
  //       if (!(prop in obj)) {
  //         console.warn(`${prop} not in ${object}`)
  //       }
  //        console.log('all fine')
  //   // 
  //   //     // The default behavior to store the value
  //   //     obj[prop] = value;
  //   // 
  //   //     // Indicate success
  //   //     return true;
  //     }
  //   };
  // errorHandling('lightEl',lightEl)
  
  

  //INSPECT OBJECTS *************************************************************
  //key:value pairs
  //inspectObject('lightEl',lightEl)
  //prototype chain
  //dumpProperties('lightEl', lightEl, true)
  //INSPECT OBJECTS END************************************************************* 
  
    // PROPERTIES
    // FIX TEXT-PROPERTIES 
    // (same for all elements of instance)
    Object.defineProperty(el, 'text', {     
      set(newValue) {
        mainEl.text = newValue;
        el.redraw();
      }
    });
    Object.defineProperty(el, 'letterSpacing', {
        set(newValue) {
          mainEl.letterSpacing = newValue;
          el.redraw();    
        }
    });
    Object.defineProperty(el, 'textAnchor', {
        set(newValue) {
          mainEl.textAnchor = newValue;
          el.redraw();    
        }
    });
  

    // PASS PROPERTIES FROM EXPOSED TO INNER EL
    // TextElement
    Object.defineProperty(el, 'main',{ 
      get() { return mainEl;}
    }); 
    //SubText
      Object.defineProperty(el, 'light',{ 
        get() { return lightEl;}
    }); 
    // SubText
    Object.defineProperty(el, 'shadow',{
      get() { return shadowEl;}
    }); 
    
    
    // PRIVATE FUNCTIONS
    // Because the widget is a closure, functions declared here aren't accessible to code outside the widget.
    el.redraw = () => { 
        //here text-properties get assigned to all el of widget-instance
        el.getElementsByClassName("myText").forEach((e) => {
            e.text = mainEl.text ?? "TEXT"; 
            e.letterSpacing = mainEl.letterSpacing ?? 0;
            e.style.fontFamily = mainEl.style.fontFamily;
            e.textAnchor = mainEl.textAnchor;
            //e.style.fontSize = mainEl.style.fontSize ?? 30; 
            //TODO check, why if set this, nothing gets displayed
        });
    
    // fix main at x,y of <use>
    mainEl.x = mainEl.y = 0;
    };
    el.redraw();
    
   
    return el;
   
  
  };
  
  // Returns an object that provides the name of this widget and a function that can be used to construct them.
  // This is used internally by widget-factory.ts.
  export const shadowText = () => {
    
    return {
        name: 'shadowText',
        construct: construct
    };
  };
 
  
  
//TEST OUTER CLASS *********************************************************************************
// using class for exposed element nicely shows up properties in index
// and recognizes els as SubText
// but how to pass values into closure Els?

//NOT IMPLEMENTED IN MODULE CURRENTLY
class SubText {
  constructor(x,y,enumerable,iterable, extensible,fill,opacity,display){
    this.style = {
      fill = fill,
      opacity = opacity,
      display = display
    };
    this.x = x;
    this.y = y;
    this.enumerable = true;
    this.iterable = true;
    this.extensible = false;
    this.sealed = true;
   }
};

// Now outside of closure for testing, how it get exposed (ex-/import)
//creates object
let testEl = new SubText(); 
// 
// //fixes object properties
// Object.preventExtensions(testEl);

//testEl.style.fill = "orange"
//console.log(testEl.style.fill)


export {testEl}

//TODO try use publicEls and then ... and then???
//SVG ELs are still handled as text :(  
    
//TEST OUTER CLASS END **********************************************************************************

  
  //TODO trying to write not exposed props now throws:
  //"Unhandled exception: TypeError: Invalid argument type."
  // but with any phantasy-line.
  // Write some error handling?
  
  //TODO change factory to .js? then remove tsconfig
  //Try to integrate with new factory?
  
