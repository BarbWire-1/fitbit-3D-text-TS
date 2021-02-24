//@ts-nocheck
export interface ShadowTextWidget extends GraphicsElement {
  text: string;
  //startAngle: Number;
  //anchorAngle: Number;
  redraw(): void;
}


// @ts-ignore
const construct: ShadowTextWidget = (el: GraphicsElement) => {
      
  const _text = el.getElementById('text') as TextElement;

  const highlightEl = el.getElementById('highlight') as TextElement;
  const shadowEl = el.getElementById('shadow') as TextElement;
  const mainEl = el.getElementById('main') as TextElement;
      

  // defineProperties/assign values=======>


  (el as ShadowTextWidget).redraw();

}

    export const shadowText = () => {
        // Returns an object that provides the name of this widget and a function that can be used to construct them.
        // This is used internally by widget-factory.ts.
        return {
            name: 'shadowText',
            construct: construct
        }
    }
