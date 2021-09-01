"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDepth = exports.getArrayDepth = void 0;
/**
 * Gets the depth of an Array (maximum level of nesting for all elements)
 * @param testObject
 */
const getArrayDepth = (testObject) => {
    return Array.isArray(testObject) ?
        1 + Math.max(...testObject.map(exports.getArrayDepth)) :
        0;
};
exports.getArrayDepth = getArrayDepth;
/**
 * Gets the depth of an object
 * Arrays or key:value objects have depth equal to their max nesting level
 * Other types (number, string, etc.) have depth 0
 * @param testObject
 */
const getDepth = (testObject) => {
    if (typeof testObject === 'object') {
        testObject = objectValuesToArray(testObject);
    }
    return (0, exports.getArrayDepth)(testObject);
};
exports.getDepth = getDepth;
/**
 * Recursive function to convert an object to an array
 * Object values are used as array elements, keys are discarded
 * @param theObject
 */
const objectValuesToArray = (theObject) => {
    if (typeof theObject === 'object') {
        let returnArray = [];
        Object.values(theObject).forEach(value => {
            returnArray.push(objectValuesToArray(value));
        });
        return returnArray;
    }
    else {
        return theObject;
    }
};
