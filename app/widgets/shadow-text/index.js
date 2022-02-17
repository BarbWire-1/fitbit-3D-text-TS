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
  //inspectObject('mainEl', mainEl)// this is empty? no keys??  // TODO 0 P why no keys?
  //TODO this is not, what I intended, so maybe define mainEl in here?

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
  //inspectObject('lightEl', lightEl)


    // PROPERTIES
    // FIX TEXT-PROPERTIES
    //(same for all elements of instance)
    Object.defineProperty(el, 'text', {
      set(newValue) {
        mainEl.text = newValue;
        el.redraw();
      }
    });
    // Object.defineProperty(el, 'letterSpacing', {
    //     set(newValue) {
    //       mainEl.letterSpacing = newValue;
    //       el.redraw();
    //     }
    // });

    Object.defineProperty(el, 'fontSize', {
      set(newValue) {
        mainEl.style.fontSize = newValue;
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

  //TODO this one works, as directly set on instance?
  defProps('letterSpacing', mainEl);


  //But these don't work:
  //defProps('style', mainEl)// this crashes a lot
  //TODO1.1.1 ⚠️ OOOH if style is defined on mainEl, el.style.fontSize doesn't work any longer!!!

  //defProps('text', mainEl)//Invalid argument type.
  //defProps('fontSize', mainEl[style])//ReferenceError: style is not defined

  //TODO this doesn't work on instance, but would on main if Textelement
  //what I REALLY do want is to target the instance as it seems to do in the above way

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
            //works if mainEl.style is exposed and value set on .main.style.fontSize
            //but if set default in symbol /svg OR CSS it can't be overwritten
            //while other props CAN
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


TODO INHERITANCE to my very confusion text and textAttributes get assigned on the widget-instance direcly, although set on mainEl
- HAH!!!! textAnchor only works on main, not on el
so there is something strange with textAnchor and fontSize
If fontSize in the symbol (svg or CSS) it can't get overwritten
If I DON'T set textAnchor in the symbol (css on main) it throws an error

TODO if I comment-out widget css I get "Unhandled exception: Error: Unexpected value for textAnchor:0xffffff80"
So might be necessary to set some props there on the symbol to make them available???

Logically mainEL IS just a subElement!!!
It would be preferable to have all text-props ONLY on widget-instance
then passed to all subTexts.
 - check inheritance from symbol head to subs
 - how to pass the values? as if I remove el.text = mainEl.tex it crashes

 => perhaps re-add a dummy text to pass props to all subEls?


TODO check, which structural functions to IIFE

TODO WRITE NEW EXCEPTION (all notes "undone""...grrr)

TODO check "safety" from CSS/SVG
*/


