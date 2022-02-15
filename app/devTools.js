//INSPECT OBJECT PROTOTYPE CHAIN ©️ Gondwana

export function dumpProperties(name, obj, types) {  // This isn't needed; it's just to show how everything links together
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
  
  //call like: dumpProperties('name', obj, boolean)
  
  //INSPECT key:value
  export const inspectObject = (objName, obj) => {
     
    for (const prop in obj) {
      if (obj.hasOwnProperty(prop)) {
         
        console.log(` ${prop}: ${JSON.stringify(obj[prop])}`)
      };
    };
  };