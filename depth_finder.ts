/**
 * Gets the depth of an Array (maximum level of nesting for all elements)
 * @param testObject
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
 * @param testObject
 */
export const getDepth = (testObject: unknown): number => {
    if (typeof testObject === 'object') {
        testObject = objectValuesToArray(testObject)
    }
    return getArrayDepth(testObject)
}

/**
 * Recursive function to convert an object to an array
 * Object values are used as array elements, keys are discarded
 * @param theObject
 */
const objectValuesToArray = (theObject: unknown) => {
    if (typeof theObject === 'object') {
        let returnArray: any[] = [];
        Object.values(theObject as object).forEach(value => {
            returnArray.push(objectValuesToArray(value))
        });
        return returnArray
    } else {
        return theObject
    }
}
