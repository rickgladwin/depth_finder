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

const testArray = ['one','two','three',['one','two','three','four',['one']]];

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

const arrayDepth = getArrayDepth(testArray);


const convertedObject = objectValuesToArray(testObject);


const objectDepth = getDepth(testObject);


const stringDepth = getDepth(testString);


const numberDepth = getDepth(testNumber);

console.log(`---------------results-----------------`);

console.log(`testArray: `, testArray);

console.log(`original testObject: `, testObject);
console.log(`convertedObject: `, convertedObject);

console.log(`arrayDepth: `, arrayDepth);
console.log(`objectDepth: `, objectDepth);

console.log(`stringDepth: `, stringDepth);

console.log(`numberDepth: `, numberDepth);
