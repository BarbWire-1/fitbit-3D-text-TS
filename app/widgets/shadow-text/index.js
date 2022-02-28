"use strict"
import { constructWidgets } from '../construct-widgets';
import { dumpProperties,inspectObject } from '../../devTools';
import document from 'document'
import { validateRequestedPermissions } from '@fitbit/sdk/lib/ProjectConfiguration';
import { DragTarget } from 'blockly';

// DEFAULTS in widgets/shadow-text/styles.css
// this allows them to get overwritten from main CSS if set there

const construct = (el) => {

    let mainEl = el.getElementById('main');
    let lightEl = el.getElementById('light');
    let shadowEl = el.getElementById('shadow');
    let elStyle = el.style;   // keep a reference to the REAL .style because we're going to redefine .style


    //APPLY CHANGES ON EL TO ALL
    function setNewTextAll(obj, prop) {
        Object.defineProperty(obj, prop, {
            set(newValue) {
                mainEl[ prop ] =
                    shadowEl[ prop ] =
                    lightEl[ prop ] =
                    newValue;
            },
            get() {
                return mainEl[prop]
            },
            enumerable: true
        });
    };

    setNewTextAll(el, 'text');
    setNewTextAll(el, 'textAnchor');
    setNewTextAll(el, 'letterSpacing');
   
   
    //APPLY TEXT-STYLE CHANGES TO ALL
    //called in styleWidget constructor
   function setNewStyleAll(obj, prop) {
        Object.defineProperty(obj, prop, {
            set(newValue) {
                mainEl.style[ prop ] =
                    shadowEl.style[ prop ] =
                    lightEl.style[ prop ] =
                    newValue;
                mainEl.text = lightEl.text = shadowEl.text = mainEl.text    // god-awful kludge to get changed fontSize to be displayed
            },
            get() {
                // if (prop !== 'fontSize' && prop !== 'fontFamily') {
                //     return mainEl.style[ prop ]
                // } else {
                   return mainEl.style[ prop ]
                // }
            },
            enumerable: true
        });
    };

    // CREATE STYLE CLASSES
    class StyleCommon {     // style properties common to all elements
        constructor(styleBase) {
            // styleBase: the Fitbit API style object that implements things.
            // We're using the constructor as a closure; ie, local variables (including the parameter) shouldn't be exposed publicly.
            // This necessitates putting properties and functions that need such variables in the constructor, which is a bit ugly.
            Object.defineProperty(this, 'opacity', {
                set(newValue) { styleBase.opacity = newValue; },
                get() {
                    return styleBase.opacity
                },
                enumerable: true
            });
            Object.defineProperty(this, 'display', {
                set(newValue) { styleBase.display = newValue; },
                get() {
                    return styleBase.display
                },
                enumerable: true
            });
        }
    };

    class StyleSubText extends StyleCommon {  // style properties applicable to all textElements
        constructor(styleBase) {
            super(styleBase);
            Object.defineProperty(this, 'fill', {
                set(newValue) { styleBase.fill = newValue; },
                get() {
                    return styleBase.fill
                },      
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

    // CREATE API's
    // FUNCTION TO EXPOSE TO CORRESPONDING OBJECT
    function defineProps(prop, obj) {
        Object.defineProperty(el, prop, {
            get() { return obj; }
        });
    };
  
    let mainAPI =  Object.seal({
        style: Object.seal(new StyleSubText(mainEl.style)), 
        getBBox: () => mainEl.getBBox(),
        enumerable: true
    });
    defineProps('main', mainAPI);

    let effectsAPI = (obj) => Object.seal({
        style: Object.seal(new StyleSubText(obj.style)),
        set x(newValue) { obj.x = newValue; },
        get x() { return obj.x; },
        set y(newValue) { obj.y = newValue; },
        get y() { return obj.y; },
        enumerable: true
    });
    defineProps('light', effectsAPI(lightEl));
    defineProps('shadow', effectsAPI(shadowEl));

    //CONNECT OUTER TO VIRTUAL STYLE
    let widgetStyleAPI = Object.seal(new StyleWidget(elStyle));
    Object.defineProperty(el, 'style', {  // we kept a reference to the real .style in elStyle
        get() {
            return widgetStyleAPI;
        },
        enumerable: true
    });

   
    // GETBBOX() ON USE (!)
    el.getBBox = () => {
       
            const mainBBox = mainEl.getBBox();  // we assume el and mainEl don't have display==='none'
            
        
            let lightX = 0, lightY = 0, shadowX = 0, shadowY = 0;
            if (lightEl.style.display !== 'none') {
                lightX = lightEl.x;
                lightY = lightEl.y;
            };
            if (shadowEl.style.display !== 'none') {
                shadowX = shadowEl.x;
                shadowY = shadowEl.y;
            };

            const leftExtra = Math.min(Math.min(lightX, 0), Math.min(shadowX, 0));    // will be 0 or negative
            const topExtra = Math.min(Math.min(lightY, 0), Math.min(shadowY, 0));    // will be 0 or negative
            const rightExtra = Math.max(Math.max(lightX, 0), Math.max(shadowX, 0));
            const bottomExtra = Math.max(Math.max(lightY, 0), Math.max(shadowY, 0));

            const bbox = {
                bottom: mainBBox.bottom + bottomExtra,
                height: mainBBox.height - topExtra + bottomExtra,
                left: mainBBox.x + leftExtra,
                right: mainBBox.right + rightExtra,
                top: mainBBox.y + topExtra,
                width: mainBBox.width - leftExtra + rightExtra,
                x: mainBBox.x + leftExtra,
                y: mainBBox.y + topExtra
            }
            return bbox;
      
        
    }
    
   
   // INITIALISATION:
    (function () {  // IIFE
        // PARSE AND PROCESS SVG CONFIG ATTRIBUTES
        const attributes = el.getElementById('config').text.split(';')
        attributes.forEach(attribute => {
            const colonIndex = attribute.indexOf(':')
            const attributeName = attribute.substring(0, colonIndex).trim();
            let attributeValue = attribute.substring(colonIndex+1).trim();

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
        // DEFINES RELATIONS BETWEEN SUBTEXTELEMENTS
        // Note that text, letter-spacing and text-anchor are set on useEl using config (see above), and are not copied from mainEl.
        const allSubTextElements = el.getElementsByClassName('myText');
        allSubTextElements.forEach(e => {
            e.style.fontFamily = elStyle.fontFamily;                            // font-family can be set on useEl
            e.style.fontSize = elStyle.fontSize     // font-size can be set on useEl; if fontSize is undefined its value is -32768
        });
    })();   // end of initialisation IIFE



    //INSPECT OBJECTS ***************************************************************
    //inspectObject('mainEl.style',mainEl.style)
    //console.log(mainEl.text) // here only logs if set in widget

    //prototype chain
    //dumpProperties('lightEl.style.fill', lightEl.style.fill, false)

    //INSPECT OBJECTS END*************************************************************
    
    return el;
};

constructWidgets('shadowText', construct);



/*
TODO Exception for trying to add not exposed props
TODO check "safety" from CSS/SVG
*/

