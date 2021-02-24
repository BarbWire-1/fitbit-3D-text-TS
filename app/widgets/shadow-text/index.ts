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

Object.defineProperty(el, 'text', {
    set: function(newValue) {
      textEl.text = newValue;
      (el as ShadowTextWidget).redraw();
    }
  });
// PRIVATE FUNCTIONS
  // Because the widget is a closure, functions declared here aren't accessible to code outside the widget.
(el as CurvedTextWidget).redraw = () => {
 
    el.getElementsByClassName("myText").forEach(e => {
      (e as TextElement).text = textEl.text ?? ""; 
      //(e as TextElement).textAnchor = textEl.textAnchor ?? "start"; // No idea why, but works on #mylabel .myText in CSS
    
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
