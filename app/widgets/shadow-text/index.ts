
export interface ShadowTextWidget extends RectElement {  // this is REALLY strange.
  //textAnchor: string;
  text: string;             // enables to set text attributes on shadowText directly
  letterSpacing: number;
  textAnchor: "start" | "middle" | "end";
  
  main: RectElement;   // very ugly, but allows to ristrict props. strange: text is still applicable
  light: RectElement;
  shadow: RectElement;

  redraw();

  /*
  main : Style ['fill'], ['opacity'], ['display']; // for string not available.... grrrr
  light: Style ['fill'], ['opacity'], ['display'], ['x'], ['y'];
  shadow: Style ['fill'], ['opacity'], ['display'], ['x'], ['y'];
  */
}


const construct = (el: ShadowTextWidget) => {

  const textEl = el.getElementById('text') as TextElement;
  const highlightEl = el.getElementById('highlight')as RectElement;
  const shadowEl = el.getElementById('shadow') as RectElement;
  const mainEl = el.getElementById('main') as RectElement;

  
  mainEl.x = mainEl.y = 0; // so "main" allways is at x,y of the <use>
  

  // PRIVATE FUNCTIONS
  // Because the widget is a closure, functions declared here aren't accessible to code outside the widget.
  
    
  el.redraw = () => { 
        
      el.getElementsByClassName("myText").forEach((e: TextElement) => {
          e.text = textEl.text ?? ""; 
          e.textAnchor = textEl.textAnchor; // preset in widget css now?
          e.letterSpacing = textEl.letterSpacing ?? 0;
          //console.log(el.main.textAnchor) // all to "default" outer settings overridden :(
      });
  };

  el.redraw();


    //As try/catch(e) overrides ALL textAnchor, if only one is undefined (???) seems to be necessary to set textAnchor for each use in svg manually to start
    //TODO add new simple file to test all settings/errors from scratch now, after textAnchor no longer presetted in css
  



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

  // add subElements and export as mainElement to be able to style as myText.subElement.style.string
  // redraw if newValue (hardcoded values are also settable on subs in .ts, but won´t get redrawn) - // TODO NOT nice. possible to exclude them?
  Object.defineProperty(el, 'shadow',  {
      get: function () { return shadowEl; },
      set: function (newValue) {
        (el.shadow  as RectElement).style.fill = newValue;
        el.redraw();
      }
  }); 
 
  Object.defineProperty(el, 'light', {
      get: function () { return highlightEl; },
      set: function (newValue) {
        el.light.style.fill = newValue;
        el.redraw();
      }
  });


  Object.defineProperty(el, 'main', {
      get: function () { return mainEl; },
      set: function (newValue) {
        el.main.style.fill = newValue;
        el.redraw(); 

      }
  });

  /*
  // TESTING WITH SERGIO´s SUGGESTION
  // try getting all wanted props and ONLY those defined and exported

  // FROM GONDWANA: this makes mainEl available as el.main. when exported 
  Object.defineProperty(el, 'main', { 
    get: function () { return mainEl; }
  });
 
  // FROM SERGIO: seems to do the same as newValue/redraw(), but how differently??
  const update = () => {};
  return {
  
  set main(fill: string) { el.main.style.fill = fill; update() },
  get main() { return el.main.style.fill }
  }
  */  
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
