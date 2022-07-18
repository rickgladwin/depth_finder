
// Types that can be handled successfully by the getDepth() function.
// Add a new set of expectations to helpers.test.ts for additional types
// before adding the new types here.
type fathomableObject =
    string | number | boolean | null | {} |
    (string | number | boolean | null | object)[] |
    {[key: string]: (string | number | boolean | null | {[key: string]: (string | number | boolean | null)})} |
    {[key: number]: (string | number | boolean | null | {[key: number]: (string | number | boolean | null)})}


/**
 * Gets the depth of an Array (maximum level of nesting for all elements)
 */
export const getArrayDepth = (testObject: unknown): number => {
    return Array.isArray(testObject) ?
        1 + Math.max(...testObject.map(getArrayDepth)) :
        0;
}

/**
 * Gets the depth of an object
 * Arrays or key:value objects have depth equal to their max nesting level
 * Other types (number, string, etc.) have depth 0
 */
export const getDepth = (testObject: fathomableObject): number => {
    // console.log(`#### getDepth called on`, testObject);
    if (isKeyValueObject(testObject)) {
        testObject = objectValuesToArray(testObject)
    }
    return Array.isArray(testObject) ?
        1 + Math.max(...testObject.map(getDepth)) :
        0;
}

export const isKeyValueObject = (testObject: unknown) => {
    // console.log(`%%% isKeyValueObject called on`, testObject);
    return (
        testObject !== null &&
        typeof testObject === 'object' &&
        Array.isArray(testObject) === false &&
        //@ts-ignore
        !!Object.keys(testObject).length
    )
}

/**
 * Recursive function to deep compare the values in two elements
 * The function considers objects with matching keys and values to be equivalent
 * Handles these types:
 *
 * Boolean
 * Number
 * BigInt
 * String
 * Symbol
 * Date
 * Key-value object (POJO)
 * Array
 */
export const compare = (item1: any, item2: any) => {
    let comparisonResult = true;
    if (isDate(item1) && isDate(item2)) {
        comparisonResult = Object.is(item1, item2)
    } else if (typeof item1 !== typeof item2) {
        comparisonResult = false
    } else if ( Array.isArray(item1) && Array.isArray(item2) ) {
        if (item1.length !== item2.length) {
            comparisonResult = false;
        } else {
            for (let i = 0; i < item1.length; i++) {
                if (!compare(item1[i], item2[i])) {
                    comparisonResult = false;
                    break
                }
            }
        }
    } else if (typeof item1 === 'object' && typeof item2 === 'object') {
        if (item1.length !== item2.length) {
            comparisonResult = false;
        } else {
            // get an array of [key,value] arrays
            const key_values_1 = Object.entries(item1);
            const key_values_2 = Object.entries(item2);
            for (let i = 0; i < key_values_1.length; i++) {
                if (
                    // compare keys
                    !compare(key_values_1[i][0], key_values_2[i][0]) ||
                    // compare values
                    !compare(key_values_1[i][1], key_values_2[i][1])
                ) {
                    comparisonResult = false
                    break
                }
            }
        }
    } else {
        comparisonResult = Object.is(item1, item2)
    }
    return comparisonResult
}

export const isDate = (item: any): boolean => {
    return Object.prototype.toString.call(item) === "[object Date]"
}

// private

/**
 * Recursive function to convert an object to an array
 * Object values are used as array elements, keys are discarded
 */
const objectValuesToArray = (theObject: fathomableObject) => {
    // console.log(`$$$$ objectValuesToArray called on`, theObject);
    if (isKeyValueObject(theObject)) {
        let returnArray: any[] = [];
        Object.values(theObject as object).forEach(value => {
            returnArray.push(objectValuesToArray(value))
        });
        return returnArray
    } else {
        return theObject
    }
}
