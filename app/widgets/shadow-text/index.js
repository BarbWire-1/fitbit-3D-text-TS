//@ts-nocheck
import Proxy from 'proxy-polyfill'
// export interface ShadowTextWidget extends TextElement { 
//     letterSpacing: number;
//     textAnchor: "start" | "middle" | "end";
//     main: TextElement;   
//     light: SubText;
//     shadow: SubText;
//     redraw();
//   };
  
  // DEFAULTS in widgets/shadow-text/styles.css
  // this allows them to get overwritten from main CSS if set there
  
  // mainEl.style.fill = "grey"
  // x,y center screen
  // textAnchor middle
  // lightEl.style.fill = "white", offset -1/-1
  // shadowEl.style.fill = "red", offset 1/1
  
  // SubText limits exposed properties
  // as this is outside the closure, it can be modified AND logged in index.ts!!!
class SubText {
  constructor(style,x,y,enumerable,iterable){
    this.style = style;
    class Style {
      constructor(fill,opacity,display) {
      this.style.fill = fill;
      this.style.opacity = opacity;
      this.style.display = display;
      }
    }
    this.x = x;
    this.y = y;
    this.enumerable = true;
    this.iterable = true;
  };
};

let publicLightEl = new Array;
let publicShadowEl = new Array;
  

const construct = (el) => {
  
  // const light = new SubText();
  // const shadow = new SubText();
    
   
    const lightEl = el.getElementById('light');
    const shadowEl = el.getElementById('shadow');
    const mainEl = el.getElementById('main');

    
    
//TEST **************************************************************************************
    //TODO try use publicEls and then ... and then???
    //SVG ELs are still handled as text :(
    publicLightEl.push(new SubText());
    publicShadowEl.push(new SubText());
    
    //publicShadowEl[0].style.fill = "orange";
    //console.log(publicShadow[0].style.fill)//Cannot set property 'fill' of undefined
    Object.getOwnPropertyNames(lightEl).forEach(function(val, idx, array){
      console.log(`lightEl: ${val} -> ${JSON.stringify(lightEl[val])}`);
    });// this doesn't log anything???
    
    
    Object.getOwnPropertyNames(publicLightEl).forEach(function(val, idx, array){
      console.log(`publicLightEl: ${val} -> ${JSON.stringify(publicLightEl[val])}`);
    });
    
    
    var target = publicLightEl;
    var enum_and_nonenum = Object.getOwnPropertyNames(target);
    var enum_only = Object.keys(target);
    var nonenum_only = enum_and_nonenum.filter(function(key) {
      var indexInEnum = enum_only.indexOf(key);
      if (indexInEnum == -1) {
      // not found in enum_only keys mean the key is non-enumerable,
      // so return true so we keep this in the filter
        return true;
    } else {
      return false;
    }
    });

console.log(nonenum_only);// length WTF???

//TODO look at this Object.create....
// non-enumerable property
var my_obj = Object.create({}, {
  getFoo: {
    value: function() { return this.foo; },
    enumerable: false
  }
});
my_obj.foo = 1;

console.log(Object.getOwnPropertyNames(my_obj).sort()); // logs 'foo,getFoo'
// TEST END ***********************************************************************************
   
   
    // PROPERTIES
    
    // FIX TEXT-PROPERTIES 
    // (same for all elements of instance)
    Object.defineProperty(el, 'text', {     
      set(newValue) {
        mainEl.text = newValue;
        el.redraw();
      }
    });
    Object.defineProperty(el, 'letterSpacing', {
        set(newValue) {
          mainEl.letterSpacing = newValue;
          el.redraw();    
        }
    });
    Object.defineProperty(el, 'textAnchor', {
        set(newValue) {
          mainEl.textAnchor = newValue;
          el.redraw();    
        }
    });
  

    // PASS PROPERTIES FROM EXPOSED TO INNER EL
    // TextElement
    Object.defineProperty(el, 'main',{ 
      get() { return mainEl;}
    }); 
    // SubText
    Object.defineProperty(el, 'light',{ 
      get() { return lightEl;}
    }); 
    // SubText
    Object.defineProperty(el, 'shadow',{
      get() { return shadowEl;}
    }); 
    
    // PRIVATE FUNCTIONS
    // Because the widget is a closure, functions declared here aren't accessible to code outside the widget.
    el.redraw = () => { 
        //here text-properties get assigned to all el of widget-instance
        el.getElementsByClassName("myText").forEach((e) => {
            e.text = mainEl.text ?? "TEXT"; 
            e.letterSpacing = mainEl.letterSpacing ?? 0;
            e.style.fontFamily = mainEl.style.fontFamily;
            e.textAnchor = mainEl.textAnchor;
            //e.style.fontSize = mainEl.style.fontSize ?? 30; 
            //TODO check, why if set this, nothing gets displayed
        });
    
    // fix main at x,y of <use>
    mainEl.x = mainEl.y = 0;
    };
    el.redraw();
   
    return el;
  };
  
  // Returns an object that provides the name of this widget and a function that can be used to construct them.
  // This is used internally by widget-factory.ts.
  export const shadowText = () => {
    
    return {
        name: 'shadowText',
        construct: construct
    };
  };
  
  //export {light,shadow}
  // TODO add type SubText for light/shadow? Class?
  // then won't need to limit in interface, which might work in js too
