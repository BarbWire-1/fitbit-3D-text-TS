//@ts-nocheck
export interface ShadowTextWidget extends GraphicsElement {
  text: string;
  //startAngle: Number;
  //anchorAngle: Number;
  redraw(): void;
}


// @ts-ignore
const construct: ShadowTextWidget = (el: GraphicsElement) => {
    // Construct an instance of a CurvedTextWidget by modifying a GraphicsElement that corresponds to a curved-text <use>.
    // This function isn't exported, and is called from widget-factory.ts when external code calls getWidgetById().
    // Returns the modified element.

    // Don't can't call .getWidgetById on an element twice: once it has been converted, it can't be converted again.

  /*
    const textEl = el.getElementById('text') as TextElement;
    const highlightEl = el.getElementById('highlight') as TextElement;
    const shadowEl = el.getElementById('shadow') as TextElement;
    const mainEl = el.getElementById('main') as TextElement;
  */
    // PRIVATE FUNCTIONS
    // Because the widget is a closure, functions declared here aren't accessible to code outside the widget.

  const initialiseText = () => {
    
    // now applied per class
    document.getElementsByClassName("myText").forEach(e => {
      (e as TextElement).text = text.text;
      //props
      (e as TextElement).style.fontFamily = text.style.fontFamily;
      (e as TextElement).style.fontSize = text.style.fontSize;
      (e as TextElement).textAnchor = text.textAnchor;
      (e as TextElement).letterSpacing = text.letterSpacing;
    });

    // INITIALISE SETTINGS FROM SVG or CSS
    /* These attributes can't be specified in <use>: r, start-angle, sweep-angle, text-anchor, letter-spacing, text, text-buffer, class.
       Therefore, we pick these up from hidden elements within the widget. */

    let textAnchor: string;
    try {     // textEl.textAnchor throws an error if textAnchor not defined
      textAnchor = textEl.textAnchor;
    } catch (e) {
      textAnchor = 'middle';  // default
    }

    let letterSpacing: number = textEl.letterSpacing ?? 0;


    // VALIDATE OTHER ATTRIBUTES


    // INITIALISE INVARIANT CHAR[] PROPERTIES

    initialiseText();

    // ADD PROPERTIES TO SVG ELEMENT OBJECT
    // These properties will be accessible to code outside the widget, and are therefore part of the widget's API.
    // Because they're all implemented as 'setters', they can be used like variables even though they cause functions to run.
    // 'getters' are not implemented because they would be rarely required and would consume memory.

    Object.defineProperty(el, 'text', {
      set: function (newValue) {
        textEl.text = newValue;
        (el as ShadowTextWidget).redraw();
      }
    });
   
      
      // DISPLAY WIDGET BASED ON SVG/CSS ATTRIBUTES
      // Subsequent changes to the widget are handled by API functions, and may involve calling redraw() again.
     
  }
        (el as ShadowTextWidget).redraw();

        // RETURN THE MODIFIED ELEMENT
        // Since el now has curved-text properties and functions added to it, external code can use it to manipulate the widget.
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
