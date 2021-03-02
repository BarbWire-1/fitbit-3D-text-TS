

export interface ShadowTextWidget extends GraphicsElement { 
  
  letterSpacing: number;
  textAnchor: "start" | "middle" | "end";
  // export 'placeholders'
  main: TextElement;   
  light: TextElement;
  shadow: TextElement;
  
  redraw();

}

//DEFAULTS in symbol

const construct = (el: ShadowTextWidget) => {

  const textEl = el.getElementById('text') as TextElement;
  const lightEl = el.getElementById('light')as TextElement;
  const shadowEl = el.getElementById('shadow') as TextElement;
  const mainEl = el.getElementById('main') as TextElement;
 
  // PRIVATE FUNCTIONS
  // Because the widget is a closure, functions declared here aren't accessible to code outside the widget.
  el.redraw = () => { 
        
      el.getElementsByClassName("myText").forEach((e: TextElement) => {
          e.text = textEl.text ?? "TEXT"; 
          e.letterSpacing = textEl.letterSpacing ?? 0;
          e.style.fontFamily = textEl.style.fontFamily;
          e.textAnchor = textEl.textAnchor;
          
      });
    
    mainEl.x = mainEl.y = 0; // so "main" allways gets redrawn at x,y of the <use>
  };

  el.redraw();

  Object.defineProperty(el, 'text', {     // don´t need export as all text, but need redraw
      set: function (newValue) {
        textEl.text = newValue;
        el.redraw();
      }
  });

  Object.defineProperty(el, 'letterSpacing', {
      set: function (newValue) {
        textEl.letterSpacing = newValue;
        el.redraw();    
      }
  });

  Object.defineProperty(el, 'textAnchor', {
      set: function (newValue) {
        textEl.textAnchor = newValue;
        el.redraw();    
      }
  });

  // add and export placeholders to pass properties into subElements per ts/js
  Object.defineProperty(el, 'main',{ 
    get: function() {return mainEl;}
  }); 

 Object.defineProperty(el, 'light', {
    get: function() { return lightEl;}
    
   });
  Object.defineProperty(el, 'shadow', {
    get: function() { return shadowEl;}   
  });  

 //console.log(`${lightEl.parent.id} lightT.x: ${lightEl.x}`)  

 
  return el;
}


export const shadowText = () => {
  // Returns an object that provides the name of this widget and a function that can be used to construct them.
  // This is used internally by widget-factory.ts.
  return {
      name: 'shadowText',
      construct: construct
  }
}


//TODO check Properties, getter, setter, new Type
//TODO compare el.redraw and set/get update();
//TODO 1 IMPORTANT: Implement UNWANTED and console.log for each - check settings/logs after change to "GraphicsElement" for subs
//TODO 2 play with classes on <use>s
//TODO 1.1 can get rid of #text now?
