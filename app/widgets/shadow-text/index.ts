
export interface ShadowTextWidget extends TextElement {
  //text: string;
  //textAnchor: "start" | "middle" | "end";
  //letterSpacing: number;
  shadowFill: string;
  highlightFill: string;
  mainFill: string;
  main: TextElement;
  redraw(): void; 

}

//@ts-ignore
const construct: ShadowTextWidget = (el) => {
//@ts-ignore
const el: ShadowTextWidget;
  Object.defineProperty(el, 'text', {
      set: function(newValue) {
      textEl.text = newValue;
      el.redraw();
      }
  });
  
  Object.defineProperty(el, 'textAnchor', {
    set: function(newValue) {
      textEl.textAnchor = newValue;
      el.redraw();
    }
  });

  Object.defineProperty(el, 'letterSpacing', {
    set: function(newValue) {
      textEl.letterSpacing = newValue;
      el.redraw();
    }
  });
  
  Object.defineProperty(el, 'shadowFill', {
    set: function (newValue) {     
      shadowEl.style.fill = newValue;
      el.redraw();
    }
  });
  Object.defineProperty(el, 'highlightFill', {
    set: function (newValue) {     
      highlightEl.style.fill = newValue;
      el.redraw();
    }
  });
   Object.defineProperty(el, 'mainFill', {
    set: function (newValue) {    
      mainEl.style.fill = newValue;
      el.redraw();
    }
   });
   Object.defineProperty(el, 'main', {
      set: function(newValue) {
      textEl.mainEl = newValue;
      el.redraw();
      }
  });
      
  const textEl = el.getElementById('text');
  const highlightEl = el.getElementById('highlight');
  const shadowEl = el.getElementById('shadow');
  const mainEl = el.getElementById('main');
  

  mainEl.x = mainEl.y = 0;
  // PRIVATE FUNCTIONS
  // Because the widget is a closure, functions declared here aren't accessible to code outside the widget.
  
  el.redraw = () => { 
      //@ts-ignore
      const e: TextElement;
      el.getElementsByClassName("myText").forEach(e => {
        e.text = textEl.text ?? ""; 
        e.textAnchor = textEl.textAnchor === undefined ? "start" : textEl.textAnchor; // preset in widget css now?
        e.letterSpacing = textEl.letterSpacing ?? 0;

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
