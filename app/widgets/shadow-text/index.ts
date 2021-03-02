

export interface ShadowTextWidget extends GraphicsElement { 
  
  letterSpacing: number;
 
  
  // export 'placeholders'
  main: TextElement;   
  light: TextElement;
  shadow: TextElement;
  
  redraw();

}
// TODO check Properties, getter, setter, new Type
// TODO why behave fontSize and textAnchor that differently???

const construct = (el: ShadowTextWidget) => {

  const textEl = el.getElementById('text') as TextElement;
  const lightEl = el.getElementById('light')as TextElement;
  const shadowEl = el.getElementById('shadow') as TextElement;
  const mainEl = el.getElementById('main') as TextElement;
 
  
 
   /*
  textEl.text = textEl.text ?? "TEXT"
  //textEl.style.fontSize = textEl.style.fontSize ?? 100;
  //DEFAULTS needed? // TODO check if needed/wanted
  mainEl.x = mainEl.y = 0;
  lightEl.x = lightEl.x ?? -1;
  lightEl.y = lightEl.y ?? -1;
  shadowEl.x = shadowEl.x ?? 2;
  shadowEl.y = shadowEl.y ?? 2;
  shadowEl.style.opacity = shadowEl.style.opacity ?? 0.5;
  mainEl.style.fill = mainEl.style.fill ?? "grey";
  lightEl.style.fill = lightEl.style.fill ?? "white";
  shadowEl.style.fill = shadowEl.style.fill ?? "red";
*/

  // PRIVATE FUNCTIONS
  // Because the widget is a closure, functions declared here aren't accessible to code outside the widget.
  el.redraw = () => { 
        
      el.getElementsByClassName("myText").forEach((e: TextElement) => {
          e.text = textEl.text ?? "TEXT"; 
          e.letterSpacing = textEl.letterSpacing ?? 0;
          e.style.fontFamily = textEl.style.fontFamily;
          e.textAnchor = textEl.textAnchor; // throws error if undefined!!! need to be set per <set>,CSS or js for each <use>
          //e.style.fontSize = textEl.style.fontSize; // very strange. all element disappear. what´s that???
          //TODO why are textAnchor, fontFamily and fontsize not working if not defined for textEL??? structural/logical mistake somewhere? 
      });
    mainEl.x = mainEl.y = 0; // so "main" allways is at x,y of the <use> if redrawn
    
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

  Object.defineProperty(el, 'fontSize', {
      set: function (newValue) {
        textEl.style.fontSize = newValue;
        el.redraw();    
      }
  });

  // add and export placeholders to pass properties into subElements per ts/js
  Object.defineProperty(el, 'main',{ // TODO test structure
    get: function() {return mainEl;}
  }); 

 Object.defineProperty(el, 'light', {
    get: function() { return lightEl;}
    
   });
  Object.defineProperty(el, 'shadow', {
    get: function() { return shadowEl;}   
  });  
  

 //console.log(`${lightEl.parent.id} lightT.x: ${lightEl.x}`)  

  //TODO compare el.redraw and set/get update();
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


