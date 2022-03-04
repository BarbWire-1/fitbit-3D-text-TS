"use strict"
import { constructWidgets, startFactory } from '../construct-widgets';
import { dumpProperties,inspectObject } from '../../devTools';
import document from 'document'


// DEFAULTS in widgets/shadow-text/styles.css
// this allows them to get overwritten from main CSS if set there
console.log(`3. startWidget ${Date.now() - startFactory}ms from start`)
console.log('-------------------------------')
let i = 1;
const construct = (el) => {
   
    let mainEl = el.getElementById('main');
    let lightEl = el.getElementById('light');
    let shadowEl = el.getElementById('shadow');
    let elStyle = el.style;   // keep a reference to the REAL .style because we're going to redefine .style
    
    
    
    console.log(`line 17 lightEl.style.fill:${lightEl.style.fill}`)//#9ACD32 crashes IIFE???
    //inspectObject('line 17 lightEl', lightEl)//crashes
        
    
    
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
    //inspectObject('line 50 lightEl', lightEl)
   
    class StyleSubText extends StyleCommon {  // style properties applicable to all textElements
        constructor(styleBase) {
            super(styleBase);
            Object.defineProperty(this, 'fill', {
                set(newValue) { styleBase.fill = newValue; },
                get() {
                    return styleBase.fill
                },
                enumerable: true,
            });
        }
    };
    console.log(`line 69 lightEl.style.fill:${lightEl.style.fill}`)
//inspectObject('line 64 lightEl', lightEl)
    
    class StyleWidget extends StyleCommon {   // style properties applicable to widget (useElement)
        constructor(elStyle) {
            super(elStyle);
            setNewStyleAll(this, 'fontFamily');
            setNewStyleAll(this, 'fontSize');
            Object.defineProperty(this, 'fill', {
                set(newValue) { mainEl.style.fill = newValue ?? "white"; },
                get() {
                    return mainEl.style.fill
                },
                enumerable: true,
            });
        }
    };
//inspectObject('line 79 lightEl', lightEl)
    const equalAll = (p,v) => {
        mainEl[ p ] =
            shadowEl[ p ] =
            lightEl[ p ] =
            v;
            
    }
console.log(lightEl.style.fill)
    //APPLY CHANGES ON EL TO ALL
    function setNewTextAll(obj, prop) {
        Object.defineProperty(obj, prop, {
            set(newValue) {
                equalAll(prop, newValue);
            },
            get() {
                return mainEl[prop]
            },
            enumerable: true
        });
    };
//inspectObject('line 100 lightEl', lightEl)
    setNewTextAll(el, 'text');
    setNewTextAll(el, 'textAnchor');
    setNewTextAll(el, 'letterSpacing');
    //setNewTextAll(el.style, 'fontSize');// no idea, why this is necessary to apply fontSize, but not for fontFamily. Missing default somewhere?
    // ooooh... the -32768???

//inspectObject('line 107 lightEl', lightEl)
   
   
    //APPLY TEXT-STYLE CHANGES TO ALL
    //called in styleWidget constructor
   function setNewStyleAll(obj, prop) {
       Object.defineProperty(obj, prop, {
            
            set(newValue) {
                //equalAll(style[ prop ]) = newValue;// style is not defined!!! here it shows again. Possible?
                mainEl.style[ prop ] =
                    shadowEl.style[ prop ] =
                    lightEl.style[ prop ] =
                newValue
                mainEl.text = lightEl.text=shadowEl.text = mainEl.text //gos-awfuk kludge to get fontSize applied/same for textAnchor
            },
            get() {
                   return mainEl.style[ prop ]
            },
            enumerable: true
        });
    };

//inspectObject('line 130 lightEl', lightEl)
    // CREATE API's
    // FUNCTION TO EXPOSE TO CORRESPONDING OBJECT
    function defineProps(prop, obj) {
        Object.defineProperty(el, prop, {
            get() { return obj; },
           
        });
    };
    //opacity, display, getBBox()
    let mainAPI =  Object.seal({
        style: Object.seal(new StyleCommon(mainEl.style)), 
        getBBox: () => mainEl.getBBox(),
        enumerable: true
    });
    defineProps('main', mainAPI);
    //x, y, fill, opacity, display
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
    //lightEl.style.fill ="#000000"
    //inspectObject('line 159 lightEl', lightEl)
    
    //CONNECT OUTER TO VIRTUAL STYLE
    // all text-related, mainEl.fill, el.getBBox(), all useOwn
    let widgetStyleAPI = Object.seal(new StyleWidget(elStyle));
    Object.defineProperty(el, 'style', {  // we kept a reference to the real .style in elStyle
        set fill(newValue) { mainEl.style.fill = newValue },
        get fill() { return el.style.fill },
        get() {
            return widgetStyleAPI;
        },
        enumerable: true,
    });
   
    //inspectObject('line 172 lightEl', lightEl)
    
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
    
    //inspectObject('line 209 lightEl', lightEl)
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
                case 'font-size':
                    el.style.fontSize = Number(attributeValue);
                    break;
               
            }
        });
        
        
            // DEFINES RELATIONS BETWEEN SUBTEXTELEMENTS
            // Note that text, letter-spacing and text-anchor are set on useEl using config (see above), and are not copied from mainEl.
            const allSubTextElements = el.getElementsByClassName('myText');
            allSubTextElements.forEach(e => {
                e.style.fontFamily = elStyle.fontFamily;                            // font-family can be set on useEl
                e.style.fontSize = e.fontsize <= 0 ? 30 : elStyle.fontSize     // font-size can be set on useEl; if fontSize is undefined its value is -32768
            });
       
    })();   // end of initialisation IIFE

    

    //INSPECT OBJECTS ***************************************************************
    //inspectObject('mainEl.style',mainEl.style)
    //console.log(mainEl.text) // here only logs if set in widget

    //prototype chain
    //dumpProperties('lightEl.style.fill', lightEl.style.fill, false)

    //INSPECT OBJECTS END*************************************************************
    
    console.log(`4. ${i++}.use created ${Date.now() - startFactory}ms from start`)
    console.log('-------------------------------')
    return el;
};

constructWidgets('shadowText', construct);
console.log(`5. endWidget ${Date.now() - startFactory}ms from start`)


/*
TODO Exception for trying to add not exposed props
TODO check "safety" from CSS/SVG
TODO how get style on el as own property??? as el.style is working, but indirectly? 
Don't get it
*/

