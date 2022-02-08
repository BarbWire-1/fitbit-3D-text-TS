

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

  //const textEl = el.getElementById('text') as TextElement;
  const lightEl = el.getElementById('light')as TextElement;
  const shadowEl = el.getElementById('shadow') as TextElement;
  const mainEl = el.getElementById('main') as TextElement;
 
  // PRIVATE FUNCTIONS
  // Because the widget is a closure, functions declared here aren't accessible to code outside the widget.
  el.redraw = () => { 
        
      el.getElementsByClassName("myText").forEach((e: TextElement) => {
          e.text = mainEl.text ?? "TEXT"; 
          e.letterSpacing = mainEl.letterSpacing ?? 0;
          e.style.fontFamily = mainEl.style.fontFamily;
          e.textAnchor = mainEl.textAnchor;
          //e.style.fontSize = mainEl.style.fontSize; // why doesn´t this work???
          
      });
    
   mainEl.x = mainEl.y = 0; // so "main" allways gets redrawn at x,y of the <use>
  
  };

  el.redraw();

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

  // add and export placeholders to pass properties into subElements per ts/js
  // as ALL properties are exposed, they are accesible from js/ts.
  // only the above assigned ones get overwritten on redraw()
  Object.defineProperty(el, 'main',{ 
    get() { return mainEl;}
  }); 
  Object.defineProperty(el, 'light', {
    get() { return lightEl;}
   });
  Object.defineProperty(el, 'shadow', {
    get() { return shadowEl;}   
  });  

 //console.log(`${lightEl.parent.id} lightT.x: ${lightEl.x}`)  
 
//TEST PROPS ********************************************************************************
// const lightPublic = {
//    lightStyle: {}
//    lightOffset: {}
// }
// Object.defineProperty(lightPublic, 'style' ,{
//   get() {return  lightPublic.lightStyle;} 
// });
// Object.defineProperty(lightPublic.lightStyle, 'fill', {
//    set(newValue) {lightEl.style.fill = newValue;}
//  });
//  Object.defineProperty(lightPublic.lightStyle, 'opacity', {
//   set(newValue) {lightEl.style.opacity = newValue;}
// });
// 
// Object.defineProperty(lightPublic, 'x' ,{
//   get() {return  lightPublic.lightOffset;} 
// });
// Object.defineProperty(lightPublic.lightOffset, 'x', {
//   set(newValue) {lightEl.x = newValue;}
// });
//  
// Object.defineProperty(el, 'light', {
//   get() {return lightPublic}
// });
//END TEST **********************************************************************************


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
