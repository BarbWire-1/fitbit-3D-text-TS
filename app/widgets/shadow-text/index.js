"use strict"
import { constructWidgets } from '../construct-widgets';
import { inspectObject, inspectObject2, dumpProperties } from '../../devTools';

// DEFAULTS in widgets/shadow-text/styles.css
// this allows them to get overwritten from main CSS if set there

const construct = (el) => {

    let mainEl = el.getElementById('main');
    let lightEl = el.getElementById('light');
    let shadowEl = el.getElementById('shadow');
    let elStyle = el.style;   // keep a reference to the REAL .style because we're going to redefine .style
    
    //APPLY CHANGES ON EL TO ALL
    const setNewTextAll = (obj, prop) => {
        Object.defineProperty(obj, prop, {
            set(newValue) {
                mainEl[ prop ] =
                    shadowEl[ prop ] =
                    lightEl[ prop ] =
                    newValue;
            },
            enumerable: true
        });

    };
    
    setNewTextAll(el, 'text');
    setNewTextAll(el, 'textAnchor');
    setNewTextAll(el, 'letterSpacing');
    
    
    //APPLY TEXT-STYLE CHANGES TO ALL 
    const setNewStyleAll = (obj, prop) => {
        Object.defineProperty(obj, prop, {
            set(newValue) {
                mainEl.style[ prop ] =
                    shadowEl.style[ prop ] =
                    lightEl.style[ prop ] =
                    newValue;
            },
            enumerable: true
        });
    };
  

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
            setNewStyleAll(this, 'fontFamily');
            setNewStyleAll(this, 'fontSize');
        }
    };

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
        style: Object.seal(new StyleSubText(mainEl.style)),
    });

    let effectsAPI = (obj) => Object.seal({
        style: Object.seal(new StyleSubText(obj.style)),
        set x(newValue) { obj.x = newValue; },
        set y(newValue) { obj.y = newValue; },
        enumerable: true,
    });

    let widgetStyleAPI = Object.seal(new StyleWidget(elStyle));

    Object.defineProperty(el, 'style', {  // we kept a reference to the real .style in elStyle
        get() {
            return widgetStyleAPI;
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
    

    // DEFINES RELATIONS BETWEEN SUBTEXTELEMENTS
    const allSubTextElements = el.getElementsByClassName('myText')
   !function assignOnLoad () {
        
        allSubTextElements.forEach(e => {
            e.text = mainEl.text ?? "shadow-text";
            e.letterSpacing = mainEl.letterSpacing ?? 0;    // TODO should mainEl be el? Why does this work on letterSpacing, and/but only there?
            e.style.fontFamily = mainEl.style.fontFamily;   
            try {     // textEl.textAnchor throws an error if textAnchor not defined
                e.textAnchor = mainEl.textAnchor;
            } catch (e) {
               e.Anchor = 'start';
            }
            e.style.fontSize = elStyle.fontSize > 0 ? elStyle.fontSize : 30;   // if fontSize is undefined its value is -32768
        });
    } ();//IIFE
    // TODO P I checked setting to el, but it is not possible in this level (the text inheritance, I assume)
    // TODO B ^ You're right about letterSpacing, which can't be set on use in SVG/CSS. fontFamily could perhaps be set on use or main in SVG/CSS, so may need a conscious decision about which to copy above.
    // TODO P ^I'm not sure whether it makes sense to make it an IIFE, just seemed logical, but requires an outer var
    
    
    // INITIALISATION:
    // Parse and process SVG config attributes:
    const attributes = el.getElementById('config').text.split(';')
    attributes.forEach(attribute => {
        const colonIndex = attribute.indexOf(':')
        const attributeName = attribute.substring(0, colonIndex).trim();
        const attributeValue = attribute.substring(colonIndex+1).trim();

        switch(attributeName) {
            case 'text':
                el.text = attributeValue;   // this won't like embedded semi-colons, and quotes will require care
                break;
            case 'letter-spacing':
                el.letterSpacing = Number(attributeValue);
                break;
            case 'text-anchor':
                el.textAnchor = attributeValue;
                break;
        }
    });

   // el.assignOnLoad();


    //INSPECT OBJECTS ***************************************************************
    // values currently not readable
    //key:value pairs
    inspectObject('lighEl.style.fill', lightEl.style.fill)
    //inspectObject('mainEl.text', mainEl.text)


    //prototype chain
    //dumpProperties('lightEl', lightEl.style, false)

    //INSPECT OBJECTS END*************************************************************

    return el;
};

constructWidgets('shadowText', construct);



/*
TODO Exception for trying to add not exposed props
TODO check "safety" from CSS/SVG

TODO P it looks like css gets processed way slower now than js.
Not sure if it was this way before.
you now can see: symbol defaults => js => css applied
(or maybe js is just quicker this way ;) )

I guess one of my recent changes might have caused that, but can't check now as out... sorry
*/
