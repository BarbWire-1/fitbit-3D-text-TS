"use strict"
import { constructWidgets } from '../construct-widgets';
import { inspectObject, dumpProperties } from '../../devTools';

// DEFAULTS in widgets/shadow-text/styles.css
// this allows them to get overwritten from main CSS if set there

const construct = (el) => {

    let mainEl = el.getElementById('main');
    let lightEl = el.getElementById('light');
    let shadowEl = el.getElementById('shadow');

    class StyleCommon {     // style properties common to all elements
        constructor(textEl) { this.textEl = textEl; }   // TODO P 0 storing textEl in class makes it public, which is why closures seem necessary
        set opacity(newValue) { this.textEl.style.opacity = newValue; }
        set display(newValue) { this.textEl.style.display = newValue; }
    }

    class StyleWidget extends StyleCommon {   // style properties applicable to widget (useElement)
        // TODO P 3.2 implement StyleWidget and widget API in general
        set fontSize(newValue) { }
        set fontFamily(newValue) { }
    }

    class StyleSubText extends StyleCommon {  // style properties applicable to all textElements
        constructor(textEl) { super(textEl); }
        set fill(newValue) { this.textEl.style.fill = newValue; }
    }

    let mainAPI = Object.seal({
        style: new StyleSubText(mainEl)
    })

    let lightAPI = Object.seal({
        style: new StyleSubText(lightEl),
        set x(newValue) { lightEl.x = newValue; },
        set y(newValue) { lightEl.y = newValue; }
    })

    let shadowAPI = Object.seal({ // TODO P 3.0 rationalise with lightAPI: use a common class?
        style: new StyleSubText(shadowEl),
        set x(newValue) { shadowEl.x = newValue; },
        set y(newValue) { shadowEl.y = newValue; }
    })

    // TODO P 3.5 don't set style props directly on element if not consistent with fitbit API
    Object.defineProperty(el, 'fontSize', {
        set(newValue) {
            mainEl.style.fontSize = shadowEl.style.fontSize = lightEl.style.fontSize = newValue;
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
            e.letterSpacing = mainEl.letterSpacing ?? 0;
            e.fontFamily = mainEl.style.fontFamily;
            e.textAnchor = mainEl.textAnchor;
            e.fontSize = mainEl.style.fontSize ?? 30;
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
// TODO P 3.7 use config to allowing setting props on use in SVG/CSS