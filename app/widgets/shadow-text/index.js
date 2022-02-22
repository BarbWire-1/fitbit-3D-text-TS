"use strict"
import { constructWidgets } from '../construct-widgets';
import { inspectObject, dumpProperties } from '../../devTools';

// DEFAULTS in widgets/shadow-text/styles.css
// this allows them to get overwritten from main CSS if set there

const construct = (el) => {

  let mainEl = el.getElementById('main');
  let lightEl = el.getElementById('light');
  let shadowEl = el.getElementById('shadow');
  let elStyle = el.style;   // keep a reference to the REAL .style because we're going to redefine .style

  class StyleCommon {     // style properties common to all elements
    constructor(styleBase) {
      // styleBase: the Fitbit API style object that implements things
      Object.defineProperty(this, 'opacity', {set(newValue) {styleBase.opacity = newValue;}});
      Object.defineProperty(this, 'display', {set(newValue) {styleBase.display = newValue;}});
    }
    //set opacity(newValue) {this.textEl.style.opacity = newValue;}
    //set display(newValue) {this.textEl.style.display = newValue;}
  }

  class StyleWidget extends StyleCommon {   // style properties applicable to widget (useElement)
    // TODO P 3.2 implement StyleWidget: needs to redefine opacity and display to apply to useEl??
    constructor(elStyle) {
      super(elStyle);
      Object.defineProperty(this, 'fontSize', {set(newValue) {mainEl.style.fontSize = shadowEl.style.fontSize = lightEl.style.fontSize = newValue;}});
      Object.defineProperty(this, 'fontFamily', {set(newValue) {mainEl.style.fontFamily = shadowEl.style.fontFamily = lightEl.style.fontFamily = newValue;}});
    }
  }

  class StyleSubText extends StyleCommon {  // style properties applicable to all textElements
    constructor(styleBase) {
      super(styleBase);
      Object.defineProperty(this, 'fill', {set(newValue) {styleBase.fill = newValue;}});
    }
  }

  let mainAPI = Object.seal({
    style: new StyleSubText(mainEl.style)
  })

  let lightAPI = Object.seal({
    style: new StyleSubText(lightEl.style),
    set x(newValue) {lightEl.x = newValue;},
    set y(newValue) {lightEl.y = newValue;}
  })

  let shadowAPI = Object.seal({ // TODO P 3.0 rationalise with lightAPI: use a common class?
    style: new StyleSubText(shadowEl.style),
    set x(newValue) {shadowEl.x = newValue;},
    set y(newValue) {shadowEl.y = newValue;}
  })

  let widgetStyleAPI = new StyleWidget(elStyle); // TODO P 3.1 seal?

  Object.defineProperty(el, 'style', {  // we kept a reference to the real .style in elStyle
    get() {
      return widgetStyleAPI;
    }
  });

  Object.defineProperty(el, 'text', {
    set(newValue) {
      mainEl.text = shadowEl.text = lightEl.text = newValue;  // could iterate if preferred, but that would be slower
    }
  });

  Object.defineProperty(el, 'textAnchor', {
    set(newValue) {
      mainEl.textAnchor = shadowEl.textAnchor = lightEl.textAnchor = newValue;  // could iterate if preferred, but that would be slower
    }
  });

  Object.defineProperty(el, 'letterSpacing', {
    set(newValue) {
      mainEl.letterSpacing = shadowEl.letterSpacing = lightEl.letterSpacing = newValue;  // could iterate if preferred, but that would be slower
    }
  });

  // Exposes property and returns all values to owner
  const assignProps = (prop, owner) => {
    Object.defineProperty(el, prop, {
      get() { return owner; }
    });
  };

  let createTextElContainer = id => {
    // Constructs a closure around a TextElement object.
    // id: string: id of <TextElement> element
    let _textEl = el.getElementById(id);    // private because in closure; might be overkill because widget itself is a closure as well

    return {  // this object gets assigned to mainElContainer
      get textEl() { return _textEl; },             // only for internal use; don't expose publicly
      get API() {   // public members
        return Object.seal({    // .seal results in 'invalid arg type' error if caller attempts to set a property that isn't defined here
          get style() {   // c/- BarbWire; we only expose style.fill just to demonstrate restrictive API: calling code should be unable to access other style properties
            return {
              get fill() { return _textEl.style.fill },
              set fill(color) { _textEl.style.fill = color },

              get opacity() { return _textEl.style.opacity },
              set opacity(number) { _textEl.style.opacity = number },

              get display() { return _textEl.style.display },
              set display(value) { _textEl.style.display = value }
            }
          }
        });
      }
    };
  };

  let createOuterTextElContainer = id => {    // defunct?
    // Constructs a closure around a TextElement object.
    // id: string: id of <TextElement> element
    let _textEl = el.getElementById(id);    // private because in closure

    return {  // this object gets assigned to *Container
      get textEl() { return _textEl; },             // only for internal use; don't expose publicly
      get API() {   // public members
        return Object.seal({    // .seal results in 'invalid arg type' error if caller attempts to set a property that isn't defined here
          set x(newX) { _textEl.x = newX; },
          set y(newY) { _textEl.y = newY; },
          get style() {   // c/- BarbWire; we only expose style.fill just to demonstrate restrictive API: calling code should be unable to access other style properties
            return {
              get fill() { return _textEl.style.fill },
              set fill(color) { _textEl.style.fill = color },

              get opacity() { return _textEl.style.opacity },
              set opacity(number) { _textEl.style.opacity = number },

              get display() { return _textEl.style.display },
              set display(value) { _textEl.style.display = value }
            }
          }
        })
      }
    };
  };

  //const mainContainer = createTextElContainer('main');
  //const mainAPI = mainContainer.API;    // save this so we don't have to reconstruct the API object every time it's accessed

  //const lightContainer = createOuterTextElContainer('light');
  //const lightAPI = lightContainer.API;    // save this so we don't have to reconstruct the API object every time it's accessed

  //const shadowContainer = createOuterTextElContainer('shadow');
  //const shadowAPI = shadowContainer.API;    // save this so we don't have to reconstruct the API object every time it's accessed

  assignProps('main', mainAPI);
  assignProps('light', lightAPI);
  assignProps('shadow', shadowAPI);

  //tried to get all expect main here, therefor the function
  const allSubTextElements;
  !function () {
      //console.log(el.firstChild.nextSibling.nextSibling.class)//myText main
      allSubTextElements = el.getElementsByClassName('myText')
      //console.log(allSubTextElements)
      return allSubTextElements;
  }();//IIFE
  // TODO how to exclude all class = 'main' ? or go on id 'main'
  // to reach symbol directly? not worth it, I guess. but still...

  //here text-properties get passed to all elements of widget-instance
  el.redraw = () => {
    allSubTextElements.forEach(e => {
        e.text = mainEl.text ?? "shadow-text";
        e.letterSpacing = mainEl.letterSpacing ?? 0;    // TODO should mainEl be el?
        e.style.fontFamily = mainEl.style.fontFamily;   // TODO should mainEl be el?
        e.textAnchor = mainEl.textAnchor;               // TODO should mainEl be el?
        e.style.fontSize = elStyle.fontSize > 0? elStyle.fontSize : 30;   // if fontSize is undefined its value is -32768
    });
  };
  // TODO investigate, why all textProperties work directly on textEl;
  // and why e.style.fontSize didn't work while it did for letterspacing,
  // BUT (!!!) can be removed without any influence here
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
// TODO P 3.2 implement widget (useEl) API in general
// TODO P 3.7 use config to allowing setting props on use in SVG/CSS