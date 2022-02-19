"use strict"
import { constructWidgets } from '../construct-widgets';
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

  const defProps = (prop, target)=> {
    Object.defineProperty(el, /*exposed*/prop, {
      set(newValue) {
        target[prop] = newValue;
        el.redraw();
      }
    });
  };

  // directly on instance ONLY
  // logging from main
  defProps('letterSpacing', dummyEl);
  defProps('textAnchor', dummyEl);
  defProps('text', dummyEl)

  // Exposes property and returns all values to owner
  const assignProps = (prop, owner) => {
    Object.defineProperty(el, prop,{
      get() { return owner;}
    });
  };

  assignProps('main', mainEl);
  assignProps('light', lightEl);
  assignProps('shadow', shadowEl);
  // to pass text and to log all text relevant data in js
  assignProps('logText', dummyEl);

  // PRIVATE FUNCTIONS
  // Because the widget is a closure, functions declared here aren't accessible to code outside the widget.
  el.redraw = () => {
    //here text-properties get passed to all el of widget-instance
      el.getElementsByClassName("myText").forEach((e) => {
        e.text = dummyEl.text ?? "TEXT";
        e.letterSpacing = dummyEl.letterSpacing ?? 0;
        e.style.fontFamily = dummyEl.style.fontFamily;
        e.textAnchor = dummyEl.textAnchor;
        //e.style.fontSize = dummyEl.style.fontSize ?? 30;
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

constructWidgets('shadowText', construct);



/*
TODO Exception for trying to add not exposed props
TODO Try to run with new factory?

TODO check, which structural functions to IIFE

TODO check "safety" from CSS/SVG

TODO decide whether to go with dummy textEl or not.
It isn't really necessary, but makes main a subElement only!
so fontSize couldn't be set on main any longer

TODO what is the the specialty with fontSize?
  * I can't set the API as for other properties
  * I can't equal it from "owner" dummyEl to all el
*/


