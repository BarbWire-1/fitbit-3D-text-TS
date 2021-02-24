//@ts-nocheck
export interface ShadowTextWidget extends TextElement {
  text: string;
  textAnchor: string;
  //anchorAngle: Number;
  redraw(): void;
}

const construct: ShadowTextWidget = (el: TextElement) => {
      
  const textEl = el.getElementById('text') as TextElement;
  const highlightEl = el.getElementById('highlight') as TextElement;
  const shadowEl = el.getElementById('shadow') as TextElement;
  const mainEl = el.getElementById('main') as TextElement;

//textEl.textAnchor = "middle";


Object.defineProperty(el, 'text', {
    set: function(newValue) {
      textEl.text = newValue;
      (el as ShadowTextWidget).redraw();
    }
  });
// PRIVATE FUNCTIONS
  // Because the widget is a closure, functions declared here aren't accessible to code outside the widget.
(el as CurvedTextWidget).redraw = () => {
  //const initialiseText = () => {
    // now applied per class
    el.getElementsByClassName("myText").forEach(e => {
      (e as TextElement).text = textEl.text ?? ""; 
      //(e as TextElement).textAnchor = textEl.textAnchor ?? "start";
    
    });
  };

// individual settings for all 3 textElements, later per set? class? inline?
// offset on x,y 
// currently not working in css/svg - without probs in NON-WIDGET // need to define Properties?
/*
mainEl.x = mainEl.x ?? 0; // takes x from use
highlightEl.x = highlightEl.x ?? - 1; // offset to main
shadowEl.x = shadowEl.x ?? 2; // offset to main

mainEl.y = mainEl.y ?? 0;
highlightEl.y = highlightEl.y ?? - 1;
shadowEl.y =  shadowEl.y ?? 2;

// opacity
mainEl.style.opacity = mainEl.style.opacity ?? 1; // individual opacity
highlightEl.style.opacity = highlightEl.style.opacity ?? 0.9;
shadowEl.style.opacity = shadowEl.style.opacity ?? 0.6;
*/
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
