

export interface ShadowTextWidget extends TextElement { 
  
  letterSpacing: number;
  textAnchor: "start" | "middle" | "end";
  // export 'placeholders'
  main: TextElement;   
  light: TextElement;
  shadow: TextElement;
  //lightPublic: TextElement;
  //shadowPublic: TextElement;
  
  redraw();

}

//DEFAULTS in symbol

const construct = (el: ShadowTextWidget) => {
 
  //const textEl = el.getElementById('text') as TextElement;
  const lightEl = el.getElementById('light')as TextElement;
  const shadowEl = el.getElementById('shadow') as TextElement;
  const mainEl = el.getElementById('main') as TextElement;
  el.style === el.style
  // PRIVATE FUNCTIONS
  // Because the widget is a closure, functions declared here aren't accessible to code outside the widget.
  el.redraw = () => { 
    
      el.getElementsByClassName("myText").forEach((e: TextElement) => {
          e.text = mainEl.text ?? "TEXT"; 
          e.letterSpacing = mainEl.letterSpacing ?? 0;
          e.style.fontFamily = mainEl.style.fontFamily;
          e.textAnchor = mainEl.textAnchor;
          //e.style.fontSize = mainEl.style.fontSize; // change to accessible??
          
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
  // as ALL properties are exposed, they are all accesible from js/ts.
  // only the above assigned ones get overwritten on redraw()
  // these are loggable in index.ts!!! ???
  
  // <main> is the origin textElement
  // so expose ALL text-relevant properties here
  Object.defineProperty(el, 'main',{ 
    get() { return mainEl;}
  }); 
  // Object.defineProperty(el, 'light', {
  //   get() { return lightEl;}
  //  });
  // Object.defineProperty(el, 'shadow', {
  //   get() { return shadowEl;}   
  // });  

 //console.log(`${lightEl.parent.id} lightT.x: ${lightEl.x}`)  
 
//TEST PROPS ********************************************************************************
// use this object to get <style>
// then set style-properties. Later assign these values to el
// this allows to only expose desired properties
const lightPublic = {
   lightStyle: {},
   class: 'light',
};
Object.defineProperty(lightPublic, 'style' ,{
  get() {return  lightPublic.lightStyle;} 
});
Object.defineProperty(lightPublic.lightStyle, 'fill', {
   set(newValue) {lightEl.style.fill = newValue;}
 });
 Object.defineProperty(lightPublic.lightStyle, 'opacity', {
  set(newValue) {lightEl.style.opacity = newValue;}
});
Object.defineProperty(lightPublic.lightStyle, 'display', {
  set(newValue) {lightEl.style.display = newValue;}
});
Object.defineProperty(lightPublic, 'x', {
  set(newValue) {lightEl.x = newValue;}
});
Object.defineProperty(lightPublic, 'y', {
  set(newValue) {lightEl.y = newValue;}
});
 
Object.defineProperty(el, 'light', {
  get() {return lightPublic}
});
lightEl.style == lightPublic.lightStyle

const shadowPublic = {
  shadowStyle: {},
  class: 'shadow'
};
console.log(JSON.stringify(shadowPublic))
Object.defineProperty(shadowPublic, 'style' ,{
 get() {return  shadowPublic.shadowStyle;} 
});
Object.defineProperty(shadowPublic.shadowStyle, 'fill', {
  set(newValue) {shadowEl.style.fill = newValue;}
});
Object.defineProperty(shadowPublic.shadowStyle, 'opacity', {
 set(newValue) {shadowEl.style.opacity = newValue;}
});
Object.defineProperty(shadowPublic.shadowStyle, 'display', {
 set(newValue) {shadowEl.style.display = newValue;}
});
Object.defineProperty(shadowPublic, 'x', {
 set(newValue) {shadowEl.x = newValue;}
});
Object.defineProperty(shadowPublic, 'y', {
 set(newValue) {shadowEl.y = newValue;}
});

Object.defineProperty(el, 'shadow', {
 get() {return shadowPublic}
});
//TODO check how to avoid redundant code. ugly
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


//TODO 1.1.1 compare to elder version and check for css. I know, it DID work previously!
