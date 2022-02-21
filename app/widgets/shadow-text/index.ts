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
  // x,y center screen
  // textAnchor middle
  // lightEl.style.fill = "white", offset -1/-1
  // shadowEl.style.fill = "red", offset 1/1
  
  // SubText limits exposed properties
  // as this is outside the closure, it can be modified AND logged in index.ts!!!
  type SubText =  {
    style: {
      fill: string,
      opacity: number,
      display: "inline" | "none" | "hidden"
    },
    x: number,
    y: number
  };
  
  const construct = (el: ShadowTextWidget) => {
    
    const lightEl = el.getElementById('light') as TextElement;
    const shadowEl = el.getElementById('shadow') as TextElement;
    const mainEl = el.getElementById('main') as TextElement;
    
    
    
    // PROPERTIES
    
    // FIX TEXT-PROPERTIES 
    // (same for all elements of instance)
    // redraw on newValue
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
    Object.defineProperty(el, 'textAnchor', {
        set(newValue) {
          mainEl.textAnchor = newValue;
          el.redraw();    
        }
    });
  //   Object.defineProperty(el, 'fontSize', {
  //     set(newValue) {
  //       mainEl.style.fontSize = newValue;
  //       el.redraw();    
  //     }
  // });
  
  const defProps = (exposed, target)=> {
   
    Object.defineProperty(el, exposed, {
      set(newValue) {
        exposed = {};
        target.exposed = newValue;
        el.redraw();    
      }
    }); 
  };
  
  //defProps('letterSpacing' , mainEl) 
  //TODO this doesn't work on instance, but would on main if Textelement
  //what I REALLY do want is to target the instance as it seems to do in the above way

    // PASS PROPERTIES FROM EXPOSED TO INNER EL
    const assignProps = (exposed, target)=> {
      Object.defineProperty(el, exposed,{
        get() { return target;}
      }); 
    };
    //TODO write a .forEach using className, nameEl?
    assignProps('main', mainEl);
    assignProps('light', lightEl);
    assignProps('shadow', shadowEl);
    // PRIVATE FUNCTIONS
    // Because the widget is a closure, functions declared here aren't accessible to code outside the widget.
    el.redraw = () => { 
      let textAnchor: string;
        // here text-properties get assigned to all el of widget-instance
        // although subTexts don't have EXPOSED textprops, they do have, as linked to SVG TextElement??
        el.getElementsByClassName("myText").forEach((e: TextElement) => {
          e.text = mainEl.text ?? "TEXT"; 
          e.letterSpacing = mainEl.letterSpacing ?? 0;
          e.style.fontFamily = mainEl.style.fontFamily;
          try {     // textEl.textAnchor throws an error if textAnchor not defined
            e.textAnchor = mainEl.textAnchor;
          } catch(e) {
            e.textAnchor = 'start';  // default
          }
           // e.textAnchor = mainEl.textAnchor ?? "start";
            //e.style.fontSize = mainEl.style.fontSize; 
            //TODO check, why if set this, nothing gets displayed
        });
    
    //fix main at x,y of <use>
    mainEl.x = mainEl.y = 0;
    };
    el.redraw();
    
   
  //dumpProperties('lightEl', lightEl, false)
   //crashes sim: Invalid attribute: 0x206 for SVGELEM type: 0x3706f41b
   // if tyes == true
   
  inspectObject('light', lightEl)
  
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
  
  */
    