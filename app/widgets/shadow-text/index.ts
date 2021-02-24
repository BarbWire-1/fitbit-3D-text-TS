//@ts-nocheck
export interface ShadowTextWidget extends GraphicsElement {
  text: string;
  textAnchor: string;
  //anchorAngle: Number;
  redraw(): void;
}








const construct: ShadowTextWidget = (el: GraphicsElement) => {
      
  const textEl = el.getElementById('text') as TextElement;
  const highlightEl = el.getElementById('highlight') as TextElement;
  const shadowEl = el.getElementById('shadow') as TextElement;
  const mainEl = el.getElementById('main') as TextElement;

 
  

//settings text-props : evtl inherit by props on use?
//textEl.text = "shadow-text";
//textEl.style.fontFamily = "Barlow-Bold";
//textEl.style.fontSize = 45;
textEl.textAnchor = "middle";
//textEl.letterSpacing = 0;

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
      (e as TextElement).text = textEl.text ?? "TEXT";
      //props
      //(e as TextElement).style.fontFamily = textEl.style.fontFamily ?? "System-Regular";
      //(e as TextElement).style.fontSize = textEl.style.fontSize ?? 30;
      //console.log(`textEl.style.fontSize: ${textEl.style.fontSize}`);
      (e as TextElement).textAnchor = textEl.textAnchor ?? "start";
      //(e as TextElement).letterSpacing = textEl.letterSpacing ?? 0;
    });
  };
//INITIALISE FIX TEXT RELATIONS    
    //initialiseText();
   
/*
Object.defineProperty(el, 'text', {
    set: function(newValue) {
      textEl.text = newValue;
      (el as ShadowTextWidget).redraw();
    }
  });
*/
// individual settings for all 3 textElements, later per set? class? inline?
// offset on x,y

mainEl.x = mainEl.x ?? 0; // takes x from use
highlightEl.x = highlightEl.x ?? - 1; // offset to main
shadowEl.x = shadowEl.x ?? 2; // offset to main

mainEl.y = mainEl.y ?? 0;
highlightEl.y = highlightEl.y ?? - 1;
shadowEl.y =  shadowEl.y ?? 2;

/*
// fill
mainEl.style.fill = mainEl.style.fill ?? "orange";
highlightEl.style.fill = highlightEl.style.fill ?? "white";
shadowEl.style.fill = shadowEl.style.fill ?? "red";
*/
// opacity
mainEl.style.opacity = mainEl.style.opacity ?? 1; // individual opacity
highlightEl.style.opacity = highlightEl.style.opacity ?? 0.9;
shadowEl.style.opacity = shadowEl.style.opacity ?? 0.6;

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
