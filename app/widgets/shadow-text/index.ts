
export interface ShadowTextWidget extends GraphicsElement {
  //textAnchor: string;
  //text: string;             // enables to set text attributes on shadowText directly
  //letterSpacing: number;
  //textAnchor: string;
  main: GraphicsElement;    // as Graphics enables to change layout, but no text-related.
  light: GraphicsElement;
  shadow: GraphicsElement;
  redraw();
}


const construct = (el: ShadowTextWidget) => {

  //const textEl = el.getElementById('text') as TextElement;
  const highlightEl = el.getElementById('highlight') as TextElement;
  const shadowEl = el.getElementById('shadow') as TextElement;
  const mainEl = el.getElementById('main') as TextElement;

  
  mainEl.x = mainEl.y = 0;

//As try/catch(e) overrides ALL textAnchor, if only one is undefined (???) seems to be necessary to set textAnchor for each use in svg manually to start
//TODO add new simple file to test all settings/errors from scratch now, after textAnchor no longer presetted in css
 



  Object.defineProperty(el, 'text', {
      set: function (newValue) {
        mainEl.text = newValue;
        el.redraw();
      }
  });

  Object.defineProperty(el, 'textAnchor', {
      set: function (newValue) {
      mainEl.textAnchor = newValue ?? "start";
      el.redraw();
      console.log(`textAnchor in redraw: ${mainEl.parent.id}`, mainEl.textAnchor) // not loggable here, seems to be moved out by export. don´t understand
      }
  });

  Object.defineProperty(el, 'letterSpacing', {
      set: function (newValue) {
        mainEl.letterSpacing = newValue;
        el.redraw();    
      }
  });

  // add subElements and export as TextElement to be able to style as myText.subElement.style.string
  // redraw if newValue (hardcoded values are also settable on subs in .ts, but won´t get redrawn) - // TODO NOT nice. possible to exclude them?
  Object.defineProperty(el, 'shadow', {
      get: function () { return shadowEl; },
      set: function (newValue) {
        el.shadow.style.fill = newValue;
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
 
      
  


 
  // PRIVATE FUNCTIONS
  // Because the widget is a closure, functions declared here aren't accessible to code outside the widget.
 
  
  el.redraw = () => { 
      
      el.getElementsByClassName("myText").forEach((e: TextElement) => {
        e.text = mainEl.text ?? ""; 
        e.textAnchor = mainEl.textAnchor; // preset in widget css now?
        e.letterSpacing = mainEl.letterSpacing ?? 0;
        //console.log(el.main.textAnchor) // all to "default" outer settings overridden :(
    });
  };

  el.redraw();
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
