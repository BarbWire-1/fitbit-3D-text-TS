"use strict"
import { constructWidgets, startFactory } from '../construct-widgets';
import { inspectObject, inspectObject2, dumpProperties } from '../../devTools';
import document from 'document'
import { validateSupportedLocales } from '@fitbit/sdk/lib/ProjectConfiguration';


// DEFAULTS in widgets/shadow-text/styles.css
// this allows them to get overwritten from main CSS if set there

const construct = (el) => {
    
console.log(`3. startWidget: ${startFactory - Date.now()}`)
    let mainEl = el.getElementById('main');
    let lightEl = el.getElementById('light');
    let shadowEl = el.getElementById('shadow');
    let elStyle = el.style;   // keep a reference to the REAL .style because we're going to redefine .style
    
    
    // INITIALISATION:
    (function () {
console.log(`4. widget start initialisation: ${Date.now() - startFactory}`)  
        //TODO tested try/catch here... there must be a logic mistake
        //need to test where???
        //const supportedProps = [ 'text', 'textAnchor', 'letterSpacing'];
        //APPLY CHANGES ON EL TO ALL
//         const setNewTextAll = (obj, prop,) => {
// 
//             let isValid = false;
//             //console.log(isValid)
//             console.log(prop)
//             try {
//                 Object.defineProperty(obj, prop, {
//                 
//                     set(newValue) {
//                         mainEl[ prop ] =
//                             shadowEl[ prop ] =
//                             lightEl[ prop ] =
//                             newValue;
//                     },
//                     enumerable: true
//                 });
//                 isValid = true;
//             } catch (error) {
//                 console.log(`The attribute ${prop} is not available for ${obj}`) 
//             }
//             console.log(isValid)
// 
//         };
        
        const setNewTextAll = (obj, prop,) => {
            console.log(`5. setNewTextAll: ${Date.now() - startFactory}`)  
             Object.defineProperty(obj, prop, {
                set(newValue) {
                    mainEl[ prop ] =
                        shadowEl[ prop ] =
                        lightEl[ prop ] =
                        newValue;
                },
                 enumerable: true,
    
            });
        };

        setNewTextAll(el, 'text');
        setNewTextAll(el, 'textAnchor');
        setNewTextAll(el, 'letterSpacing');
       
          
        //DEFINE INTERNAL "style" AND APPLY COMMON PROPS
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
        //TODO how to log setter in constructor? Or need the check in API  
        //APPLY TEXT-STYLE CHANGES TO ALL
        const setNewStyleAll = (obj, prop) => {
            console.log(`6. setNewStyleAll: ${Date.now() - startFactory}`)
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

        class StyleWidget extends StyleCommon {   // style properties applicable to widget (useElement)
            constructor(elStyle) {
                super(elStyle);
                console.log(`set StyleWidget: ${Date.now() - startFactory}`)
                setNewStyleAll(this, 'fontFamily');
                setNewStyleAll(this, 'fontSize');
            }
        };

        class StyleSubText extends StyleCommon {  // style properties applicable to all textElements
            
            constructor(styleBase) {
                super(styleBase);
                console.log("set fill: "+ (Date.now()-startFactory))
                Object.defineProperty(this, 'fill', {
                    set(newValue) { styleBase.fill = newValue; },
                    enumerable: true
                });
            }
        };

        let mainAPI = Object.seal({
            style: Object.seal(new StyleSubText(mainEl.style))
        });

        let effectsAPI = (obj) => Object.seal({
            style: Object.seal(new StyleSubText(obj.style)),
            set x(newValue) { obj.x = newValue; },
            set y(newValue) { obj.y = newValue; },
            enumerable: true,
           
        });
       
        let widgetStyleAPI = Object.seal(new StyleWidget(elStyle));
      
        
        //REFERENCE BETWEEN VIRTUAL AND ELEMTENT OBJECT STYLE
        Object.defineProperty(el, 'style', {  // we kept a reference to the real .style in elStyle
            get() {
                return widgetStyleAPI;
            }
        });
//dumpProperties('widgetStyleAPI', widgetStyleAPI)
        // Exposes property and returns all values to owner
        const defineProps = (prop, obj) => {
            Object.defineProperty(el, prop, {
                get() { return obj; }
            });
        };

        defineProps('main', mainAPI);
        defineProps('light', effectsAPI(lightEl));
        defineProps('shadow', effectsAPI(shadowEl));

console.log(`7. widget all classes and APIs: ${Date.now() - startFactory}`)  
    
        // PARSE AND PROCESS SVG CONFIG ATTRIBUTES
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
console.log(`8. widget config: ${Date.now() - startFactory}`)  
        // DEFINES RELATIONS BETWEEN SUBTEXTELEMENTS
        const allSubTextElements = el.getElementsByClassName('myText');
        allSubTextElements.forEach(e => {
            //e.text = mainEl.text ?? "shadow-text";        // Removed because text is set on useEl via config, and not on main
            //e.letterSpacing = mainEl.letterSpacing ?? 0;  // Removed because letter-spacing is set on useEl via config, and not on main
            e.style.fontFamily = elStyle.fontFamily;        // because font-family is set on useEl
            /* // Removed because text-anchor is set on useEl via config, and not on main
            try {     // textEl.textAnchor throws an error if textAnchor not defined
                e.textAnchor = mainEl.textAnchor;
            } catch (e) {
               e.textAnchor = 'start';
            }*/
            e.style.fontSize = elStyle.fontSize > 0 ? elStyle.fontSize : 30;   // because font-family is set on useEl; if fontSize is undefined its value is -32768
        });
    })();//IIFE
console.log(`9. widget elements aligned: ${Date.now() - startFactory}`)  
    
    //TODO B ^ You're right about letterSpacing, which can't be set on use in SVG/CSS. fontFamily could perhaps be set on use or main in SVG/CSS, so may need a conscious decision about which to copy above.

    
    //TODO test if IIFE might be responsible for delay of css or just css itself takes so long?
    // how to measure?? conditional check for fill eg?

   // el.assignOnLoad();
    //INSPECT OBJECTS ***************************************************************
    // values currently not readable
    //key:value pairs
    //inspectObject('lighEl.style.fill', lightEl.style.fill)
    //inspectObject('mainEl.text', mainEl.text)


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
// TODO B ^ How are you measuring the speed? ...
// TODO P ^ you can SEE it without measuring.

// TODO B ...Are you sure this isn't an issue arising from lack of clarity about which props are set against use and which against main?...
// TODO B ...You could console.log in various places to see the sequence in which things are getting applied; possibly the IIFE is getting processed at a different time than previously...
// TODO B ...I also suspect that IIFE is now running BEFORE copying props from config, whereas redraw() used to be called last. Could it be that?
// TODO P ^...I actually think you are right. I now set the whole initialisation into one IIFE measured from factory=>widget => app (definetly wrong sequence)
// TODO P ^... will undo IIFE tomorow and compare results

//TODO P 0 These are no "TODO"s, but just info if interested :) I'll go on with testing tomorrow

//TESTS
/**
 * commenting out widget.class = widget.class doesn't change behaviour on load
 */

