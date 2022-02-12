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

var target = lightEl;
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
  console.log(`noenum: ${nonenum_only}`);// noenum:    (empty)
  console.log(`enum: ${enum_only}`);// enum: style,x,y 
  
  
  console.log(Object.getOwnPropertyNames(lightEl))
  console.log(JSON.stringify(lightEl))//  {} // ????
  
  function listAllProperties(o) {
    var objectToInspect;
      var result = [];
    
      for(objectToInspect = o; objectToInspect !== null; objectToInspect = Object.getPrototypeOf(objectToInspect)) {
      result = result.concat(Object.getOwnPropertyNames(objectToInspect));
    }
    
    return result;
    }
    console.log(listAllProperties(lightEl))
    //returns: style,x,y,propertyIsEnumerable,isPrototypeOf,hasOwnProperty,toLocaleString,valueOf,toString,constructor

//this is good, but only for direct props
// so logs style as prop, but no fill, opacity, display
const inspectObject = obj => {
  for (const prop in obj) {
    if (obj.hasOwnProperty(prop)) {
      console.log(`${prop}: ${JSON.stringify(obj[prop])}`)
    }
  }
}

inspectObject(lightEl)


function dumpProperties(name, obj, types) {  // This isn't needed; it's just to show how everything links together
  // types: try to determine type of each property: can cause hard crashes with some objects.
  let proto = obj
  let level = 0
  let type = '?'
  console.log(`Members of ${name}:`)
  do {
    console.log(`  Level ${level++}:`)
    for(const memberName in proto) {
      //console.log('in for()')
      if (proto.hasOwnProperty(memberName)) {
        //console.log(`in if() ${memberName}`)
        // memberName 'text' crashes sim
        if (types)
          try {
            //console.log('before obj[]')
            const member = obj[memberName]  // get member from top-level obj rather than proto, as the latter crashes if not a function
            //console.log(`in try member=${member}`)
            type = typeof member
          } catch(e) {
            //console.log('in catch')
            type = 'INACCESSIBLE'
          }
        console.log(`    ${memberName} (${type})`)
      }
    }
    proto = Object.getPrototypeOf(proto)
    console.log('  ---------------')
  } while (proto)
}

//ERRORHANDLING USING PROXY (which doesn't work here this way)
function disallowUndefinedProperties(obj) {
  const handler = {
      get(target, property) {
          if (property in target) {
              return target[property];
          }

          throw new Error(`Property '${property}' is not defined`);
      }
  };

  return new Proxy(obj, handler);
}

// example
const obj = { key: 'value' };
const noUndefObj = disallowUndefinedProperties(obj);

console.log(noUndefObj.key);
console.log(noUndefObj.undefinedProperty); // throws exception

https://stackoverflow.com/questions/17461062/automatic-getter-and-setterwith-validation-in-javascript
//validation
function Person(name, age) {
  let person = {
        name: name,
        age: age
    };
  


// //IF object built like this:
// // personNew is NOT AN OBJECT, but a module
// // can't be sealed
// class Person {
//   constructor (name, age){
//     this.name = name,
//     this.age = age
//   }
// }
  
    Object.defineProperties(person, {
        name: getAccessor(Person, "name", "String"),
        age: getAccessor(Person, "age", "Number")
    });
  
}
  function getAccessor(obj, key, type) {
    return {
        enumerable: true,
        configurable: true,
        extensible: false,
        get: function () {
            return obj[key];
        },
        set: function (value) {
            if (typeOf(value) === type)
                obj[key] = value;
        }
    };
  }
  
  function typeOf(value) {
    return Object.prototype.toString.call(value).slice(8, -1);
  }
  
 
  var personNew = new Person("Aadit M Shah", 20);
  Object.seal(Person)
  
 
  personNew.name = 0;       // it won't set the name
  personNew.age = "twenty"; // it won't set the age
  personNew.color = "blue"; // Unhandled exception: TypeError: Invalid argument type.
  
  
  console.log(personNew.name);
  console.log(personNew.age);
  console.log(personNew.color);//Unhandled exception: ReferenceError: blue is not defined
  
  
  const url = './widgets/shadow-text/index.js';
  import(url).then(module => {
    console.log(Object.keys(module));
    console.log(module.x);
  });