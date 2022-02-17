"use strict"
import { inspectObject, dumpProperties } from '../../devTools';

// DEFAULTS in widgets/shadow-text/styles.css
// this allows them to get overwritten from main CSS if set there
  
// mainEl.style.fill = "grey"
// x,y center screen
// textAnchor middle
// lightEl.style.fill = "white", offset -1/-1, opacity = 0.5
// shadowEl.style.fill = "red", offset 1/1, opacity = 0.5
  


const construct = (el) => {
  
  // MAIN TEXTELEMENT
  const mainEl = el.getElementById('main');
  //inspectObject('mainEl', mainEl)// this is empty? no keys??
  //TODO this is not, what I intended, so maybe define mainEl in here?
  
  // WRAPPER TO CREATE SUB_ELs
  const createSubText = (el) => ({
   
     get style() {
      return {
        // this way ALL style would get applied!?
        // get style() {return el.style}, 
        // set style(v) {return el.style = v},
        get fill() {return el.style.fill},
        set fill(color) {el.style.fill = color},
        get opacity() {return el.style.opacity},
        set opacity(num) {el.style.opacity = num},
        get display() {return el.style.display},
        set display(val) {el.style.display = val},
     }
   },
    get x() {return el.x},
    set x(num) {el.x = num},
    get y() {return el.y},
    set y(num) {el.y = num},
  });
  
  //SUBTEXT elements
  // sealed to prevent changes on structure
  const lightEl = Object.seal(createSubText(el.getElementById('light')));
  const shadowEl = Object.seal(createSubText(el.getElementById('shadow')));
  inspectObject('lightEl', lightEl)
  //TODO check "safety" from CSS/SVG
  
    // PROPERTIES
    // FIX TEXT-PROPERTIES 
    //(same for all elements of instance)
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
    
    Object.defineProperty(el, 'fontSize', {
      set(newValue) {
        mainEl.style.fontSize = newValue;
        el.redraw();    
      }
  });
  
    // PASS PROPERTIES FROM EXPOSED TO INNER EL
    const assignProps = (expose, target) => {
      Object.defineProperty(el, expose,{
        get() { return target;}
      }); 
    }
    assignProps('main', mainEl);
    assignProps('light', lightEl)
    assignProps('shadow', shadowEl)
    
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
    
    //SET class="myText" on symbol
    //couldn`t test as sim off 🛑
  
  // //INSPECT OBJECTS ***************************************************************
  // 
  // //key:value pairs
  // inspectObject('lightEl',lightEl)
  // 
  // //prototype chain
  // dumpProperties('lightEl', lightEl, true)
  // //INSPECT OBJECTS END************************************************************* 
  
    
   
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
 
  
  


/*  
TODO Exception for trying to add not exposed props
TODO Try to run with new factory?
  
  
TODO check inheritance for text props

Logically mainEL IS just a subElement!!! 
It would be preferable to have all text-props ONLY on widget-instance
then passed to all subTexts.
 - check inheritance from symbol head to subs
 - how to pass the values? as if I remove el.text = mainEl.tex it crashes
  
 => perhaps re-add a dummy text to pass props to all subEls?



TODO I wonder, whether widget instance might have fill, which would get inherited, if nothing else were set anywhere. Just to know, but to lazy to test
TODO if I comment-out widget css I get "Unhandled exception: Error: Unexpected value for textAnchor:0xffffff80"
So might be necessary to set some props there on the symbol to make them available???
TODO check, which structural functions to IIFE 
TODO try on defineProperty as function with exposed/target
*/
  
