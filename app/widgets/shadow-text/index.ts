
export interface ShadowTextWidget extends TextElement {
  text: string;
  textAnchor: "start" | "middle" | "end";
  letterSpacing: number;
  shadowFill: string;
  highlightFill: string;
  mainFill: string;
  redraw(): void; 

}
//@ts-ignore
const construct: ShadowTextWidget = (el: TextElement) => {

  Object.defineProperty(el, 'text', {
      set: function(newValue) {
      textEl.text = newValue;
      (el as ShadowTextWidget).redraw();
      }
  });
  
  Object.defineProperty(el, 'textAnchor', {
    set: function(newValue) {
      textEl.textAnchor = newValue;
      (el as ShadowTextWidget).redraw();
    }
  });

  Object.defineProperty(el, 'letterSpacing', {
    set: function(newValue) {
      textEl.letterSpacing = newValue;
      (el as ShadowTextWidget).redraw();
    }
  });
  
  Object.defineProperty(el, 'shadowFill', {
    set: function (newValue) {
      
      shadowEl.style.fill = newValue;
      (el as ShadowTextWidget).redraw();
    }
  });
  Object.defineProperty(el, 'highlightFill', {
    set: function (newValue) {
      
      highlightEl.style.fill = newValue;
      (el as ShadowTextWidget).redraw();
    }
  });
   Object.defineProperty(el, 'mainFill', {
    set: function (newValue) {
      
      mainEl.style.fill = newValue;
      (el as ShadowTextWidget).redraw();
    }
  });
    
  const textEl = el.getElementById('text') as TextElement;
  const highlightEl = el.getElementById('highlight') as TextElement;
  const shadowEl = el.getElementById('shadow') as TextElement;
  const mainEl = el.getElementById('main') as TextElement;
  

  mainEl.x = mainEl.y = 0;
  // PRIVATE FUNCTIONS
  // Because the widget is a closure, functions declared here aren't accessible to code outside the widget.
 
  (el as ShadowTextWidget).redraw = () => { 
    el.getElementsByClassName("myText").forEach(e => {
      
      (e as TextElement).text = textEl.text ?? ""; 
      (e as TextElement).textAnchor = textEl.textAnchor === undefined ? "start" : textEl.textAnchor; // preset in widget css now?
      (e as TextElement).letterSpacing = textEl.letterSpacing ?? 0;
    });
  };

  (el as ShadowTextWidget).redraw();
  return el as ShadowTextWidget;
 
}

export const shadowText = () => {
  // Returns an object that provides the name of this widget and a function that can be used to construct them.
  // This is used internally by widget-factory.ts.
  return {
      name: 'shadowText',
      construct: construct
  }
}
