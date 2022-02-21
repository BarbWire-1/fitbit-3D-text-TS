"use strict"
import { constructWidgets } from '../construct-widgets';
import { inspectObject, dumpProperties } from '../../devTools';
import { subtle } from 'crypto';


// DEFAULTS in widgets/shadow-text/styles.css
// this allows them to get overwritten from main CSS if set there

const construct = (el) => {

//   // CLASS TESTING (flying blind)****************************************************************************
  class SubStyle {
    constructor(style, enumerable, fill, opacity, display, readonly, writable, sealed) {
      this.enumerable = true;
      this.readonly = false;
      this.writable = true;
      this.sealed = true;

      this.style = {
        get style() {
          return {
           fill = {
              get fill() { return this.style.fill },
              set fill(color) { this.style.fill = color },
            },
            opacity = {
              get opacity() { return this.style.opacity },
              set opacity(num) { style.opacity = num },
            },
            display = {
              get display() { return this.style.display },
              set display(val) { style.display = val },
            }
          }
        }
      }
    }
  };

  class SubEffects extends SubStyle {
    constructor(x, y, style, enumerable, readonly,fill, opacity, display, writable, sealed) {
      super(style, enumerable, fill, opacity, display, readonly, writable, sealed);
      this.x = {
        get x() { return this.x },
        set x(num) { this.x = num },
      },
      this.y = {
        get y() { return this.y },
        set y(num) { this.y = num },
      },
      this.enumerable = true;
    }
  };

  // TODO which font-properties do I really need to expose???
  //add super and getters/setters if possible at all
  class SubText  extends SubStyle{
    constructor(text,letterSpacing, style, fontSize, textAnchor,enumerable){
      this.style = {
        fontSize = fontSize,
        fontFamily = fontFamily
      };
      this.textAnchor = textAnchor;
      this.letterSpacing = letterSpacing;
      this.enumerable = true;
    }
  };


  // to switch to previous, activate line 124 lightEl
  const lightEl = new SubEffects(el.getElementById('light'));
  Object.seal(lightEl)
  const testLightEl = new SubEffects(el.getElementById('light'));
  testLightEl.style.fill = "red"//TypeError: Cannot set property 'fill' of undefined
  testLightEl.x = 5;
  // inspectObject('testLightEl',testLightEl);
  // dumpProperties('testLightEl', testLightEl, true)
  //
  // const testShadowEl = new SubEffects(el.getElementById('shadow'));
  // inspectObject('testShadowEl',testShadowEl);
  // dumpProperties('testShadowEl', testShadowEl, true)
  //lightEl = testLightEl;
//
// //TODO: this is an idiotic approach: how to link to el.getElemendById this way???
// // worked with constructor funcion, but couldn't get API running
//   const lightEl = new SubEffects();
//   const shadowEl = new SubEffects();
//   // END CLASS TESTING*********************************************************************************************
// WRAPPER TESTING****************************************************************************************************









// END WRAPPER TESTING************************************************************************************************
  // MAIN TEXTELEMENT
  //const mainEl = el.getElementById('main');
  //const dummyEl = el.getElementById('dummy'); // TODO is dummyEl necessary?
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
  //const lightEl = Object.seal(createSubText(el.getElementById('light')));
  //const shadowEl = Object.seal(createSubText(el.getElementById('shadow')));
  //const mainEl = Object.seal(createSubText(el.getElementById('main')));

  // PROPERTIES
  // FIX TEXT-PROPERTIES
  //(same for all elements of instance)
  // unfortunately can't set this on instance only
  // but also works on main without passing to others
  Object.defineProperty(el, 'fontSize', {
    set(newValue) {
      mainContainer.textEl.fontSize = shadowContainer.textEl.fontSize = lightContainer.textEl.fontSize = newValue;
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

  // on dummy for now
  // logging from useEl.logText
  //defProps('letterSpacing', dummyEl);
  //defProps('textAnchor', dummyEl);
  //defProps('text', dummyEl)

  Object.defineProperty(el, 'text', {
    set(newValue) {
      mainContainer.textEl.text = shadowContainer.textEl.text = lightContainer.textEl.text = newValue;  // could iterate if preferred, but that would be slower
    }
  });

  Object.defineProperty(el, 'textAnchor', {
    set(newValue) {
      mainContainer.textEl.textAnchor = shadowContainer.textEl.textAnchor = lightContainer.textEl.textAnchor = newValue;  // could iterate if preferred, but that would be slower
    }
  });

  Object.defineProperty(el, 'letterSpacing', {
    set(newValue) {
      mainContainer.textEl.letterSpacing = shadowContainer.textEl.letterSpacing = lightContainer.textEl.letterSpacing = newValue;  // could iterate if preferred, but that would be slower
    }
  });

  // Exposes property and returns all values to owner
  const assignProps = (prop, owner) => {
    Object.defineProperty(el, prop,{
      get() { return owner;}
    });
  };

  let createTextElContainer = id => {
    // Constructs a closure around a TextElement object.
    // id: string: id of <TextElement> element
    let _textEl = el.getElementById(id);    // private because in closure; might be overkill because widget itself is a closure as well

    return {  // this object gets assigned to mainElContainer
      get textEl() {return _textEl;},             // only for internal use; don't expose publicly
      get API() {   // public members
        return Object.seal({    // .seal results in 'invalid arg type' error if caller attempts to set a property that isn't defined here
          get style() {   // c/- BarbWire; we only expose style.fill just to demonstrate restrictive API: calling code should be unable to access other style properties
            return {
              get fill() {return _textEl.style.fill},
              set fill(color) {_textEl.style.fill = color}
            }
          }
        })
      }
    }
  }

  let createOuterTextElContainer = id => {    // TODO P can this be derived from createTextElContainer?
    // Constructs a closure around a TextElement object.
    // id: string: id of <TextElement> element
    let _textEl = el.getElementById(id);    // private because in closure

    return {  // this object gets assigned to *Container
      get textEl() {return _textEl;},             // only for internal use; don't expose publicly
      get API() {   // public members
        return Object.seal({    // .seal results in 'invalid arg type' error if caller attempts to set a property that isn't defined here
          set x(newX) {_textEl.x = newX;},
          set y(newY) {_textEl.y = newY;},
          get style() {   // c/- BarbWire; we only expose style.fill just to demonstrate restrictive API: calling code should be unable to access other style properties
            return {
              get fill() {return _textEl.style.fill},
              set fill(color) {_textEl.style.fill = color}
            }
          }
        })
      }
    }
  }

  const mainContainer = createTextElContainer('main');
  const mainAPI = mainContainer.API;    // save this so we don't have to reconstruct the API object every time it's accessed

  const lightContainer = createOuterTextElContainer('light');
  const lightAPI = lightContainer.API;    // save this so we don't have to reconstruct the API object every time it's accessed

  const shadowContainer = createOuterTextElContainer('shadow');
  const shadowAPI = shadowContainer.API;    // save this so we don't have to reconstruct the API object every time it's accessed

  assignProps('main', mainAPI);
  assignProps('light', lightAPI);
  assignProps('shadow', shadowAPI);
  // to pass text and to log all text relevant data in js
  //assignProps('logText', dummyEl);

  // PRIVATE FUNCTIONS
  // Because the widget is a closure, functions declared here aren't accessible to code outside the widget.
  el.redraw = () => {
    //here text-properties get passed to all el of widget-instance
      // TODO P 0 redo to avoid extra calls to getElement
      el.getElementsByClassName("myText").forEach((e) => {
        e.text = mainContainer.textEl.text ?? "TEXT";
        e.letterSpacing = mainContainer.textEl.letterSpacing ?? 0;
        e.style.fontFamily = mainContainer.textEl.style.fontFamily;
        e.textAnchor = mainContainer.textEl.textAnchor;
        //e.style.fontSize = dummyEl.style.fontSize ?? 30;
        //TODO check, why if set this, nothing gets displayed
        //works if mainEl.style is exposed and value set on .main.style.fontSize
        //but if set default in symbol /svg OR CSS it can't be overwritten
         //while other props CAN
        });

  // fix main at x,y of <use>
  //mainEl.x = mainEl.y = 0;  // TODO it shouldn't be necessary to do this every time anything is changed; ideally, it shouldn't be necessary to do this at all. If we don't expose mainEl.x and .y, then caller could only break it using SVG/CSS.
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

//TODO P :) (it's not really a todo, more an asking for guidance and enlightning )

/*I now have added some classStructure and object lightEl as instance.
The original lightEl is commented-out.
I can beautifully read and test everything, but the values set don't get applied.
I think there must be something wrong with my getters/setters?
I also added writable = true and readonly = false
I'm really confused!
(Too confused, to also add getters setters for text.
 Actually I wonder, if this approach *could* work at all.)

 oooh... maybe, as I run the old redraw() with the old setter
 In defProps???
 I actually can only guess and try and fail....
*/