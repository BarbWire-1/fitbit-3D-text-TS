

export interface ShadowTextWidget extends GraphicsElement {  // this is REALLY strange.
  
  letterSpacing: number;
  textAnchor: "start" | "middle" | "end";
  
  main: TextElement;   
  light: TextElement;
  shadow: TextElement;

  redraw();

  /*
  main: RectElement, ['fill'], ['opacity'], ['display']; // for string not available....
  light: RectElement, ['fill'], ['opacity'], ['display'], ['x'], ['y'];
  shadow: RectElement, ['fill'], ['opacity'], ['display'], ['x'], ['y'];
  */
}
// TODO check Properties, getter, setter, new Type

const construct = (el: ShadowTextWidget) => {

  const textEl = el.getElementById('text') as TextElement;
  const lightEl = el.getElementById('light')as TextElement;
  const shadowEl = el.getElementById('shadow') as TextElement;
  const mainEl = el.getElementById('main') as TextElement;
 
  
 
  mainEl.x = mainEl.y = 0;   // so "main" allways is at x,y of the <use>
  textEl.text = textEl.text ?? "TEXT"
  //DEFAULTS needed? // TODO check if needed/wanted
 
  lightEl.x = lightEl.x ?? -1;
  lightEl.y = lightEl.y ?? -1;
  shadowEl.x = shadowEl.x ?? 2;
  shadowEl.y = shadowEl.y ?? 2;
  shadowEl.style.opacity = shadowEl.style.opacity ?? 0.5;
  mainEl.style.fill = mainEl.style.fill ?? "grey";
  lightEl.style.fill = lightEl.style.fill ?? "white";
  shadowEl.style.fill = shadowEl.style.fill ?? "red";


  // PRIVATE FUNCTIONS
  // Because the widget is a closure, functions declared here aren't accessible to code outside the widget.
  
    
  el.redraw = () => { 
        
      el.getElementsByClassName("myText").forEach((e: TextElement) => {
          e.text = textEl.text ?? "TEXT"; 
          e.textAnchor = textEl.textAnchor; // throws error if undefined!!! need to be set per <set>,CSS or js for each <use>
          e.letterSpacing = textEl.letterSpacing ?? 0;
         
      });
  };

  el.redraw();


  Object.defineProperty(el, 'text', {
      set: function (newValue) {
        textEl.text = newValue;
        el.redraw();
      }
  });

  Object.defineProperty(el, 'textAnchor', {
      set: function (newValue) {
      textEl.textAnchor = newValue ?? "start";
      el.redraw();
      }
  });

  Object.defineProperty(el, 'letterSpacing', {
      set: function (newValue) {
        textEl.letterSpacing = newValue;
        el.redraw();    
      }
  });

  // add and export placeholders to pass properties into subElements per ts/js
 
  Object.defineProperty(el, 'main',{
    get: function() {return mainEl;}
  }); 

 Object.defineProperty(el, 'light', {
    get: function () { return lightEl;}
    
   });
  Object.defineProperty(el, 'shadow', {
    get: function() { return shadowEl;}   
  });  
  


 console.log(`${lightEl.parent.id} lightT.x: ${lightEl.x}`)  

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


