
// INSPECT PROTOTYPE CHAIN ©️ Gondwana
export function dumpProperties(name, obj, types) {
    // types: try to determine type of each property: can cause hard crashes with some objects.
    let proto = obj
    let level = 0
    let type = '?'
    console.log(`Members of ${name}:`)
    do {
        console.log(`  Level ${level++}:`)
        for (const memberName in proto) {
            //console.log('in for()')
            if (proto.hasOwnProperty(memberName)) {
                //console.log(`in if() ${memberName}`)
                // memberName 'text' crashes sim
                if (types)
                    try {
                        //console.log('before obj[]')
                        const member = obj[ memberName ]  // get member from top-level obj rather than proto, as the latter crashes if not a function
                        //console.log(`in try member=${member}`)
                        type = typeof member
                    } catch (e) {
                        //console.log('in catch')
                        type = 'INACCESSIBLE'
                    }
                console.log(`    ${memberName} (${type})`)
            }
        }
        proto = Object.getPrototypeOf(proto)
        console.log('  ---------------')
    } while (proto)
};
//call like: dumpProperties('obj', obj, boolean)

//INSPECT key:value
export const inspectObject = (objName, obj) => {
    let props = [];
    
    for (const prop in obj) {
        // as propertyNames get handled as char-Array
        // I tried this approach, although not sure, whether this makes sense
        if (obj.hasOwnProperty(prop)) {
            props.push(obj[ prop ]);
        }; 
    };
    if (props) {
        console.log(`${objName}: ${obj}`)
    } else {
        console.log(`${objName}.${prop}: ${JSON.stringify(props.join(""))}`)// incl.values. how to get a key:value pair here?
    } 
};
//call like: inspectObject('objName',obj)


  /*
 TODO can log values in widget for subEl...
 possible to get the corresponding <use> id? el.id, dummy
 possible to go on one specific value? value => "Argument is not an object"
 possible to reach/pass from/to app/index?
 B have a look at this: https://flexiple.com/key-value-javascript/
 try to write a recursion to get all properties of el

*/