import { dumpProperties, inspectObject } from "../../devTools";
export interface ShadowTextWidget extends TextElement { 
    letterSpacing: number;
    textAnchor: "start" | "middle" | "end";
    main: SubText;   
    light: SubText;
    shadow: SubText;
    redraw();
   
  };
  
  // DEFAULTS in widgets/shadow-text/styles.css
  // this allows them to get overwritten from main CSS if set there
  
  // mainEl.style.fill = "grey"
  // x,y 0
  // textAnchor start
  // lightEl.style.fill = "white", offset -1/-1
  // shadowEl.style.fill = "red", offset 1/1
  
    // SubText limits exposed properties
  type SubText =  {
    style: {
      fill: string,
      opacity: number,
      display: "inline" | "none" | "hidden"
    },
    x: number,
    y: number,
  };

const construct = (el: ShadowTextWidget) => {
    
    const lightEl = el.getElementById('light') as unknown as TextElement;
    const shadowEl = el.getElementById('shadow') as unknown as TextElement;
    const mainEl = el.getElementById('main') as unknown as TextElement;
    
    
    
    // PROPERTIES
    const getProperties = (prop, obj)=> {
      Object.defineProperty(el, prop,{
        get() { return obj;}
      }); 
    };
    
    getProperties('main', mainEl);
    getProperties('light', lightEl);
    getProperties('shadow', shadowEl);
  
    
    const setProperties = (prop,obj)=> {
      Object.defineProperty(el, prop, {
        set(newValue) {
          obj[prop] = newValue;
          el.redraw();    
        }
      }); 
    };
    
    // PASS VALUES TO mainEl
    // (fontSize seems to be directly on the use) //??  
    setProperties('text', mainEl);
    setProperties('textAnchor', mainEl);
    setProperties('letterSpacing', mainEl);
    
    // EQUAL ALL TEXT (text, font) mainEL
    const textElements = el.getElementsByClassName("myText") as TextElement[];
    el.redraw = () => { 
      
       textElements.forEach((e: TextElement) => {
          e.text = mainEl.text ?? "fitbit"; 
          e.letterSpacing = mainEl.letterSpacing ?? 0;
          e.style.fontFamily = mainEl.style.fontFamily;
          try {     // mainEl.textAnchor throws an error if textAnchor not defined
            e.textAnchor = mainEl.textAnchor;
          } catch(e) {
            e.textAnchor = 'start';  // default
          };
          // unfortunately doesn't work for fontSize
          //e.style.fontSize = mainEl.style.fontSize; 
          //TODO check, why if set this, nothing gets displayed
        });
    
    //fix main at x,y of <use>
    mainEl.x = mainEl.y = 0;
    };
  
  
  el.redraw();
  // no acces to any data in this structure 🚫
  dumpProperties('mainEl', mainEl, false)
   //crashes sim: Invalid attribute: 0x206 for SVGELEM type: 0x3706f41b
   // if tyes == true
   
  inspectObject('main', mainEl)
    
  
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
  TODO interesting:
  getElement as TextElement but export as SubText limits props!!!
  

  TODO B 1 if not loggable this way, back to wrapper?
  first try find out, what's wrong
  */