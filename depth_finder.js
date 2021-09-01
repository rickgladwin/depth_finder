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
const testArray = ['one', 'two', 'three', ['one', 'two', 'three', 'four', ['one']]];
const testObject = {
    one: 'one',
    two: 'two',
    three: 'three',
    four: {
        one: 'one',
        two: 'two',
        three: 'three',
        four: 'four',
        five: {
            one: 'one'
        }
    }
};
const testString = 'hello there';
const testNumber = 46;
const arrayDepth = (0, exports.getArrayDepth)(testArray);
const convertedObject = objectValuesToArray(testObject);
const objectDepth = (0, exports.getDepth)(testObject);
const stringDepth = (0, exports.getDepth)(testString);
const numberDepth = (0, exports.getDepth)(testNumber);
console.log(`---------------results-----------------`);
console.log(`testArray: `, testArray);
console.log(`original testObject: `, testObject);
console.log(`convertedObject: `, convertedObject);
console.log(`arrayDepth: `, arrayDepth);
console.log(`objectDepth: `, objectDepth);
console.log(`stringDepth: `, stringDepth);
console.log(`numberDepth: `, numberDepth);
