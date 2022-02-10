export interface ShadowTextWidget extends TextElement { 
    letterSpacing: number;
    textAnchor: "start" | "middle" | "end";
    main: TextElement;   
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
    
    const lightEl = el.getElementById('light') as TextElement as SubText;
    const shadowEl = el.getElementById('shadow') as TextElement as SubText;
    const mainEl = el.getElementById('main') as TextElement;
    
    // PRIVATE FUNCTIONS
    // Because the widget is a closure, functions declared here aren't accessible to code outside the widget.
    el.redraw = () => { 
        //here text-properties get assigned to all el
        el.getElementsByClassName("myText").forEach((e: TextElement) => {
            e.text = mainEl.text ?? "TEXT"; 
            e.letterSpacing = mainEl.letterSpacing ?? 0;
            e.style.fontFamily = mainEl.style.fontFamily;
            e.textAnchor = mainEl.textAnchor;
            //e.style.fontSize = mainEl.style.fontSize; 
            //TODO check, why if set this, nothing gets displayed
        });
      
     mainEl.x = mainEl.y = 0; // so "main" allways gets redrawn at x,y of the <use>
    };
  
    el.redraw();
    // all the same for elements of shadow-text
    // values assigned in redraw()
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
  
    // pass props recieved from 'main', 'light', 'shadow' to SVG-Els
    //TextElement
    Object.defineProperty(el, 'main',{ 
      get() { return mainEl;}
    }); 
    //SubText
    Object.defineProperty(el, 'light',{ 
      get() { return lightEl;}
    }); 
    //SubText
    Object.defineProperty(el, 'shadow',{
      get() { return shadowEl;}
    }); 
   
  
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
  
  // TODO add type SubText for light/shadow? Class?
  // then won't need to limit in interface, which might work in js too
  