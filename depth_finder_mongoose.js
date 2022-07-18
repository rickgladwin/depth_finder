"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isDate = exports.compare = exports.isKeyValueObject = exports.getDepth = exports.getArrayDepth = void 0;
const mongoose_1 = require("mongoose");
/**
 * Gets the depth of an Array (maximum level of nesting for all elements)
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
 */
const getDepth = (testObject) => {
    // console.log(`#### getDepth called on`, testObject);
    if ((0, exports.isKeyValueObject)(testObject)) {
        testObject = objectValuesToArray(testObject);
    }
    return Array.isArray(testObject) ?
        1 + Math.max(...testObject.map(exports.getDepth)) :
        0;
};
exports.getDepth = getDepth;
const isKeyValueObject = (testObject) => {
    // console.log(`%%% isKeyValueObject called on`, testObject);
    return (testObject !== null &&
        typeof testObject === 'object' &&
        !(testObject instanceof mongoose_1.Types.ObjectId) &&
        Array.isArray(testObject) === false &&
        //@ts-ignore
        !!Object.keys(testObject).length);
};
exports.isKeyValueObject = isKeyValueObject;
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
 * mongoose.Types.ObjectId
 * Key-value object (POJO)
 * Array
 */
const compare = (item1, item2) => {
    let comparisonResult = true;
    if ((0, exports.isDate)(item1) && (0, exports.isDate)(item2)) {
        comparisonResult = Object.is(item1, item2);
    }
    else if (typeof item1 !== typeof item2) {
        comparisonResult = false;
    }
    else if (Array.isArray(item1) && Array.isArray(item2)) {
        if (item1.length !== item2.length) {
            comparisonResult = false;
        }
        else {
            for (let i = 0; i < item1.length; i++) {
                if (!(0, exports.compare)(item1[i], item2[i])) {
                    comparisonResult = false;
                    break;
                }
            }
        }
    }
    else if (typeof item1 === 'object' && typeof item2 === 'object') {
        if (Object.keys(item1).length !== Object.keys(item2).length) {
            comparisonResult = false;
        }
        else {
            // get an array of [key,value] arrays
            const key_values_1 = Object.entries(item1);
            const key_values_2 = Object.entries(item2);
            for (let i = 0; i < key_values_1.length; i++) {
                if (
                // compare keys
                !(0, exports.compare)(key_values_1[i][0], key_values_2[i][0]) ||
                    // compare values
                    !(0, exports.compare)(key_values_1[i][1], key_values_2[i][1])) {
                    comparisonResult = false;
                    break;
                }
            }
        }
    }
    else {
        comparisonResult = Object.is(item1, item2);
    }
    return comparisonResult;
};
exports.compare = compare;
const isDate = (item) => {
    return Object.prototype.toString.call(item) === "[object Date]";
};
exports.isDate = isDate;
// private
/**
 * Recursive function to convert an object to an array
 * Object values are used as array elements, keys are discarded
 */
const objectValuesToArray = (theObject) => {
    // console.log(`$$$$ objectValuesToArray called on`, theObject);
    if ((0, exports.isKeyValueObject)(theObject)) {
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
