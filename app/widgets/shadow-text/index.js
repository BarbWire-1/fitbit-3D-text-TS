"use strict"
import { constructWidgets } from '../construct-widgets';
import { inspectObject, dumpProperties } from '../../devTools';

// DEFAULTS in widgets/shadow-text/styles.css
// this allows them to get overwritten from main CSS if set there

const construct = (el) => {


  Object.defineProperty(el, 'fontSize', {
    set(newValue) {
      mainContainer.textEl.fontSize = shadowContainer.textEl.fontSize = lightContainer.textEl.fontSize = newValue;
    }
  });

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
              set fill(color) { _textEl.style.fill = color },
              
              get opacity() {return _textEl.style.opacity},
              set opacity(number) { _textEl.style.fill = number },
              
              get display() {return _textEl.style.display},
              set display(value) {_textEl.style.display = value}
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
  
  // PRIVATE FUNCTIONS
  // Because the widget is a closure, functions declared here aren't accessible to code outside the widget.
  const allSubElements = el.getElementsByClassName("myText");
  el.redraw = () => {
    //here text-properties get passed to all elements of widget-instance
    allSubElements.forEach(e => {
      e.text = mainContainer.textEl.text ?? "shadow-text";
      e.letterSpacing = mainContainer.textEl.letterSpacing ?? 0;
      e.style.fontFamily = mainContainer.textEl.style.fontFamily;
      e.textAnchor = mainContainer.textEl.textAnchor;
      e.fontSize = mainContainer.fontSize ?? 30;
    });
  };

  el.redraw();


  //INSPECT OBJECTS ***************************************************************
  // values currently not readable
  //key:value pairs
  //inspectObject('textEl',textEl)

  //prototype chain
  //dumpProperties('lightEl', lightEl, true)

  //INSPECT OBJECTS END*************************************************************

  return el;
};

constructWidgets('shadowText', construct);



/*
TODO Exception for trying to add not exposed props
TODO Try to run with new factory
TODO check "safety" from CSS/SVG
*/
