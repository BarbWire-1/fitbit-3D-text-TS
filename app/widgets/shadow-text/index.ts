
export interface ShadowTextWidget extends TextElement {
  
  main: TextElement;
  light: TextElement;
  shadow: TextElement;

}

const construct = (el: ShadowTextWidget) => {

  Object.defineProperty(el, 'text', {
      set: function (newValue) {
        mainEl.text = newValue;
        el.redraw();
      }
  });

  Object.defineProperty(el, 'textAnchor', {
      set: function (newValue) {
        mainEl.textAnchor = newValue;
        el.redraw();
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
 
      
  //const textEl = el.getElementById('text') as TextElement;
  const highlightEl = el.getElementById('highlight');
  const shadowEl = el.getElementById('shadow');
  const mainEl = el.getElementById('main') as TextElement;


  mainEl.x = mainEl.y = 0;
  // PRIVATE FUNCTIONS
  // Because the widget is a closure, functions declared here aren't accessible to code outside the widget.

  
  el.redraw = () => { 
      
      el.getElementsByClassName("myText").forEach((e: TextElement) => {
        e.text = mainEl.text ?? ""; 
        e.textAnchor = mainEl.textAnchor === undefined ? "start" : mainEl.textAnchor; // preset in widget css now?
        e.letterSpacing = mainEl.letterSpacing ?? 0;

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
