"use strict"
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
  //inspectObject('mainEl', mainEl)// this is empty? no keys??  // TODO 0 P why no keys?
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

    Object.defineProperty(el, 'fontSize', {
      set(newValue) {
        mainEl.style.fontSize = newValue;
        el.redraw();
      }
  });


    // PASS PROPERTIES FROM EXPOSED TO INNER EL
    // TODO P It might be nice to avoid returning mainEl, etc, because this lets callers mess up the layout (eg, light.x)
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
            // TODO P This may result in properties being reapplied to mainEl, since it's a myText. Perhaps use a different class, or test for mainEl, ...
            // ...or put this in a function and call it for light and shadow.
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






  //TODO Exception for trying to add not exposed props
  //TODO Try to run with new factory?

