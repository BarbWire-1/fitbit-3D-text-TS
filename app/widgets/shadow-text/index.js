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
            // styleBase: the Fitbit API style object that implements things.
            // We're using the constructor as a closure; ie, local variables (including the parameter) shouldn't be exposed publicly.
            // This necessitates putting properties and functions that need such variables in the constructor, which is a bit ugly.
            Object.defineProperty(this, 'opacity', {
                set(newValue) { styleBase.opacity = newValue; },
                enumerable: true
            });
            Object.defineProperty(this, 'display', {
                set(newValue) { styleBase.display = newValue; },
                enumerable: true
            });
        }
    };

    class StyleWidget extends StyleCommon {   // style properties applicable to widget (useElement)
        constructor(elStyle) {
            super(elStyle);
            Object.defineProperty(this, 'fontSize', {
                set(newValue) {
                    mainEl.style.fontSize =
                        shadowEl.style.fontSize =
                        lightEl.style.fontSize =
                        newValue;
                }
            });
            Object.defineProperty(this, 'fontFamily', {
                set(newValue) {
                    mainEl.style.fontFamily =
                        shadowEl.style.fontFamily =
                        lightEl.style.fontFamily =
                        newValue;
                },
                enumerable: true
            });
        }
    }

    class StyleSubText extends StyleCommon {  // style properties applicable to all textElements
        constructor(styleBase) {
            super(styleBase);
            Object.defineProperty(this, 'fill', {
                set(newValue) { styleBase.fill = newValue; },
                enumerable: true
            });
        }
    };

    let mainAPI = Object.seal({
        style: Object.seal(new StyleSubText(mainEl.style))
    });

//     let lightAPI = Object.seal({
//         style: new StyleSubText(lightEl.style),
//         set x(newValue) { lightEl.x = newValue; },
//         set y(newValue) { lightEl.y = newValue; }
//     });
//
//     let shadowAPI = Object.seal({
//         style: new StyleSubText(shadowEl.style),
//         set x(newValue) { shadowEl.x = newValue; },
//         set y(newValue) { shadowEl.y = newValue; }
//     });

    let effectsAPI = (obj) => Object.seal({
        style: Object.seal(new StyleSubText(obj.style)),
        set x(newValue) { obj.x = newValue; },
        set y(newValue) { obj.y = newValue; }
    });

    //TODO P I wrote this just to write ANXTHING toda. But class would be more consequent, more exquisite, more overkill 😁
    //TODO B ^ Your solution is elegant, readable and efficient. I can't think of a good reason to change it.

    let widgetStyleAPI = Object.seal(new StyleWidget(elStyle));

    Object.defineProperty(el, 'style', {  // we kept a reference to the real .style in elStyle
        get() {
            return widgetStyleAPI;
        }
    });

    Object.defineProperty(el, 'text', {
        set(newValue) {
            mainEl.text =
                shadowEl.text =
                lightEl.text =
                newValue;  // could iterate if preferred, but that would be slower
        }
    });

    Object.defineProperty(el, 'textAnchor', {
        set(newValue) {
            mainEl.textAnchor =
                shadowEl.textAnchor =
                lightEl.textAnchor =
                newValue;  // could iterate if preferred, but that would be slower
        }
    });

    Object.defineProperty(el, 'letterSpacing', {
        set(newValue) {
            mainEl.letterSpacing =
                shadowEl.letterSpacing =
                lightEl.letterSpacing =
                newValue;  // could iterate if preferred, but that would be slower
        }
    });

    // Exposes property and returns all values to owner
    const defineProps = (prop, obj) => {
        Object.defineProperty(el, prop, {
            get() { return obj; }
        });
    };

    defineProps('main', mainAPI);
    defineProps('light', effectsAPI(lightEl));
    defineProps('shadow', effectsAPI(shadowEl));


    // PAS TEXT SPECIFIC PRPERTIES TO ALL SUBELEMENTS
    const allSubTextElements = el.getElementsByClassName('myText')
    el.redraw = () => {
        allSubTextElements.forEach(e => {
            e.text = mainEl.text ?? "shadow-text";
            e.letterSpacing = mainEl.letterSpacing ?? 0;    // TODO should mainEl be el?
            e.style.fontFamily = mainEl.style.fontFamily;   // TODO should mainEl be el?
            try {     // textEl.textAnchor throws an error if textAnchor not defined
                el.textAnchor = mainEl.textAnchor;
            } catch (e) {
               el.Anchor = 'start';
            }
            e.style.fontSize = elStyle.fontSize > 0 ? elStyle.fontSize : 30;   // if fontSize is undefined its value is -32768
        });
    };
    //TODO P I checked setting to el, but it is not possible in this level (the text inheritance, I assume)
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
TODO check "safety" from CSS/SVG
*/
// TODO P 3.25 implement widget (useEl) API in general
// TODO B It looks like you got textAnchor working; is there more to do on it? (Nice work, BTW!)
// TODO P 3.3 put .docx in repo
// TODO P 3.7 use config to allowing setting props on use in SVG/CSS