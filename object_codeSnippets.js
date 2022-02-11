Object.getOwnPropertyNames(object).forEach(function(val, idx, array){
    console.log(`object: ${val} -> ${JSON.stringify(object[val])}`);
  });
  
  
  var target = testEl;
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

//console.log(nonenum_only);// length WTF???

//TODO look at this Object.create....
// non-enumerable property
var my_obj = Object.create({}, {
getFoo: {
  value: function() { return this.foo; },
  enumerable: false
}
});
my_obj.foo = 1;

//console.log(Object.getOwnPropertyNames(my_obj).sort()); // logs 'foo,getFoo'


function showProps(obj, objName) {
var result = '';
for (var i in obj) {
  // obj.hasOwnProperty() wird benutzt um Eigenschaften aus der Prototypen-Kette herauszufiltern
  if (obj.hasOwnProperty(i)) {
    result += objName + '.' + i + ' = ' + obj[i] + '\n';
  }
}
return result;
}
showProps(lightEl, "LightEl")// nothing


function listAllProperties(o) {
var objectToInspect;
  var result = [];

  for(objectToInspect = o; objectToInspect !== null; objectToInspect = Object.getPrototypeOf(objectToInspect)) {
  result = result.concat(Object.getOwnPropertyNames(objectToInspect));
}

return result;
}
//listAllProperties(lightEl)
//listAllProperties(publicLightEl)
listAllProperties(testEl)

//TODO check possibilities of encapsulation
// Animal properties and method encapsulation
var Animal = {
type: 'Invertebrates', // Default value of properties
displayType: function() {  // Method which will display type of Animal
 // console.log(this.type);
}
};

// Create new animal type called animal1
var animal1 = Object.create(Animal);
animal1.displayType(); // Output:Invertebrates

// Create new animal type called Fishes
var fish = Object.create(Animal);
fish.type = 'Fishes';
fish.displayType(); // Output:Fishes


const object1 = {};

Object.preventExtensions(object1);

try {
Object.defineProperty(object1, 'property1', {
  value: 42
});
} catch (e) {
console.log(e);
// expected output: TypeError: Cannot define property property1, object is not extensible
}
// TEST END ***********************************************************************************

const createPotatoWidget = (element) => ({
    get style() {
      return {
        get fill() { return element.style.fill},
        set fill(color) { element.style.fill = color}
     }
   }
  });
  
  const potato = createPotatoWidget(document.getElementById('potato'));
  
  potato.style.fill = "red"
  console.log(potato.style.fill)// "red"
  
  
  const lightPublic = {
    lightStyle: {}
 }
  
  Object.defineProperty(lightPublic, 'style' ,{
    get() {return  lightPublic.lightStyle;} 
  });
  Object.defineProperty(lightPublic.lightStyle, 'fill', {
     set(newValue) {lightEl.style.fill = newValue;}
   });
   
   //ERROR HANDLING
   function go() {
    'use strict';
    var x = {};
    Object.seal(x);
    x.foo = 123;
  }
  go(); // => TypeError: Can't add property foo, object is not extensible
  
  
  var target = testEl;
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
console.log(enum_only);