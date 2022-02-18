"use strict"
import { inspectObject, dumpProperties } from '../../devTools';

// DEFAULTS in widgets/shadow-text/styles.css
// this allows them to get overwritten from main CSS if set there

const construct = (el) => {

  // MAIN TEXTELEMENT
  //const mainEl = el.getElementById('main');
  const dummyEl = el.getElementById('dummy');
  // WRAPPER TO CREATE SUB_ELs
  const createSubText = (el) => ({

    get style() {
      return {
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
  const mainEl = Object.seal(createSubText(el.getElementById('main')));
  
  // PROPERTIES
  // FIX TEXT-PROPERTIES
  //(same for all elements of instance)
  // unfortunately can't set this on instance only
  // but also works on main without passing to others
  Object.defineProperty(el, 'fontSize', {
    set(newValue) {
      dummyEl.style.fontSize = newValue;
      el.redraw();
    }
  });

  const defProps = (exposed, target)=> {
    Object.defineProperty(el, exposed, {
      set(newValue) {
        target[exposed] = newValue;
        el.redraw();
      }
    });
  };
  // directly on instance ONLY
  // logging from main
  defProps('letterSpacing', dummyEl);
  defProps('textAnchor', dummyEl);
  defProps('text', dummyEl)
  
  // PASS PROPERTIES FROM EXPOSED TO INNER EL
  const assignProps = (expose, target) => {
    Object.defineProperty(el, expose,{
      get() { return target;}
    });
  };
    
  assignProps('main', mainEl);
  assignProps('light', lightEl);
  assignProps('shadow', shadowEl);
  
  assignProps('dummy', dummyEl);
  
  // PRIVATE FUNCTIONS
  // Because the widget is a closure, functions declared here aren't accessible to code outside the widget.
  el.redraw = () => {
    //here text-properties get passed to all el of widget-instance
      el.getElementsByClassName("myText").forEach((e) => {
        e.text = dummyEl.text ?? "TEXT";
        e.letterSpacing = dummyEl.letterSpacing ?? 0;
        e.style.fontFamily = dummyEl.style.fontFamily;
        e.textAnchor = dummyEl.textAnchor;
        //e.style.fontSize = mainEl.style.fontSize ?? 30;
        //TODO check, why if set this, nothing gets displayed
        //works if mainEl.style is exposed and value set on .main.style.fontSize
        //but if set default in symbol /svg OR CSS it can't be overwritten
         //while other props CAN
        });

  // fix main at x,y of <use>
  mainEl.x = mainEl.y = 0;
  };

  el.redraw();


  //INSPECT OBJECTS ***************************************************************
  
  //key:value pairs
  //inspectObject('lightEl',lightEl)
  
  //prototype chain
  //dumpProperties('lightEl', lightEl, true)
  
  //INSPECT OBJECTS END*************************************************************

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

TODO check, which structural functions to IIFE

TODO check "safety" from CSS/SVG
*/


