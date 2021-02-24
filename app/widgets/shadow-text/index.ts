
export interface ShadowTextWidget extends GraphicsElement {
  text: string;
  //startAngle: Number;
  //anchorAngle: Number;
  redraw(): void;
}


// @ts-ignore
const construct: ShadowTextWidget = (el: GraphicsElement) => {
      
  const textEl = el.getElementById('text') as TextElement;
  const highlightEl = el.getElementById('highlight') as TextElement;
  const shadowEl = el.getElementById('shadow') as TextElement;
  const mainEl = el.getElementById('main') as TextElement;

 
// settings text-props : evtl inherit by props on use?
textEl.text = "shadow-text";
textEl.style.fontFamily = "Barlow-Bold";
textEl.style.fontSize = 45;
textEl.textAnchor = "middle";
textEl.letterSpacing = 0;

// now applied per class
el.getElementsByClassName("myText").forEach(e => {
  (e as TextElement).text = textEl.text;
  //props
  (e as TextElement).style.fontFamily = textEl.style.fontFamily;
  (e as TextElement).style.fontSize = textEl.style.fontSize;
  (e as TextElement).textAnchor = textEl.textAnchor;
  (e as TextElement).letterSpacing = textEl.letterSpacing;
});


// individual settings for all 3 textElements, later per set? class? inline?
// offset on x,y
mainEl.x = 0; // takes x from use
//highlight.x = - 1; // offset to main
shadowEl.x =  2; // offset to main

mainEl.y = 0;
//highlight.y = - 1;
shadowEl.y =  2;

// fill
mainEl.style.fill = "orange";
highlightEl.style.fill = "white";
shadowEl.style.fill = "red";

// opacity
mainEl.style.opacity = 1; // individual opacity
highlightEl.style.opacity = 0.9;
shadowEl.style.opacity = 0.6;



}

    export const shadowText = () => {
        // Returns an object that provides the name of this widget and a function that can be used to construct them.
        // This is used internally by widget-factory.ts.
        return {
            name: 'shadowText',
            construct: construct
        }
    }
