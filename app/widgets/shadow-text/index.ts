
export interface ShadowTextWidget extends TextElement {
  //text: string;                             // TODO as extending TextElement not necessary to export??? check that. Or as SubElements are defined themselves now?
  //textAnchor: "start" | "middle" | "end";
  //letterSpacing: number;
  //shadowFill: string;
  //lightFill: string;
  //mainFill: string;//TEST
  main: ShadowTextWidget;   //TEST
  light: ShadowTextWidget;
  shadow: ShadowTextWidget;
  redraw(): void; 

}


const construct = (el: ShadowTextWidget) => {

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

  //add shadow and export as ShadowTextWidget to be able to style as myText.shadow.style.fill //TODO could this be written in one function? 
   Object.defineProperty(el, 'shadow', {
     get: function () { return shadowEl; }
  }) 
  Object.defineProperty(el, 'shadowFill', {
    set: function (newValue) {     
      (shadowEl.style.fill) = newValue;
      console.log(`shadow: ${shadowEl.style.fill}`);
      el.redraw();
    }
  });

  //add highlight and export as ShadowTextWidget to be able to style as myText.shadow.style.fill
   Object.defineProperty(el, 'light', {
    get: function () {return highlightEl;}
  })
  Object.defineProperty(el, 'lightFill', {
    set: function (newValue) {    
      highlightEl.style.fill = newValue;
      console.log(`light: ${highlightEl.style.fill}`);
      el.redraw();
    }
  });

  //add main and export as ShadowTextWidget to be able to style as myText.shadow.style.fill
  Object.defineProperty(el, 'main', {
    get: function () { return mainEl; }
  });

   Object.defineProperty(el, 'mainFill', {
    set: function (newValue) {    
       mainEl.style.fill = newValue;
       console.log(`main: ${mainEl.style.fill}`);
      el.redraw();
    }
   });
   
 
  
  // TEST TO GET "style.fill" on textEl.childrenEl XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX 
 /*
  Object.defineProperty(el, 'main', {
    set: function (newValue) { 
      
      el.getElementById("main").style.fill = newValue;
      el.redraw();
    }
  });
*/
   Object.defineProperty(el, 'fill', {
    set: function (newValue) {    
       (textEl.getElementsByClassName("myText") as unknown as Styled).style.fill = newValue;
       console.log(JSON.stringify(textEl.getElementsByClassName("myText")))
      el.redraw();
    }
   });
  
  // END TEST XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX 
      
  const textEl = el.getElementById('text') as TextElement;
  const highlightEl = el.getElementById('highlight') as GraphicsElement;
  const shadowEl = el.getElementById('shadow') as GraphicsElement;
  const mainEl = el.getElementById('main') as GraphicsElement;
  
  
  mainEl.x = mainEl.y = 0;
  // PRIVATE FUNCTIONS
  // Because the widget is a closure, functions declared here aren't accessible to code outside the widget.
  
  el.redraw = () => { 
      
      el.getElementsByClassName("myText").forEach((e: TextElement) => {
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
