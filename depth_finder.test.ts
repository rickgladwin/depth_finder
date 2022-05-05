import { compare, getDepth, isDate, isKeyValueObject } from "./depth_finder";

describe('getDepth', () => {
    it('returns n for an array of depth n', () => {
        const arrayOfDepth1 = [
            'hello',
            'there',
            1
        ];
        const arrayOfDepth2 = [
            'hello', [
                'well',
                'hello',
                2
            ]
        ];
        const arrayOfDepth5 = [
            '', [
                '', [
                    '', [
                        '', '', [
                            'this',
                            'is',
                            'depth',
                            5
                        ]
                    ]
                ]
            ]
        ];
        expect(getDepth(arrayOfDepth1)).toEqual(1);
        expect(getDepth(arrayOfDepth2)).toEqual(2);
        expect(getDepth(arrayOfDepth5)).toEqual(5);
    });

    it('returns n for a key-value object of depth n', () => {
        const objectOfDepth1 = {
            'hello': 'thing',
            'there': 'thing',
            'number': 1,
        };
        const objectOfDepth2 = {
            'hello': 'thing', subThing: {
                'well': 'thing',
                'hello': 'thing',
                'number': 2,
            }
        };
        const objectOfDepth5 = {
            'something': 'thing', subThing: {
                'something': 'thing', subThing: {
                    'something': 'thing', subThing: {
                        'something': 'thing',
                        'somethingElse': 'thing',
                        subThing: {
                            'this': 'thing',
                            'is': 'thing',
                            'depth': 'thing',
                            'number': 5,
                        }
                    }
                }
            }
        };
        expect(getDepth(objectOfDepth1)).toEqual(1);
        expect(getDepth(objectOfDepth2)).toEqual(2);
        expect(getDepth(objectOfDepth5)).toEqual(5);
    });
    it('returns n for mixed array/key-value object of depth n', () => {
        const mixedObjectOfDepth5 = {
            'something': 'thing', subThing: {
                'something': 'thing', subThing: [
                    'thing', {
                        'something': 'thing',
                        'somethingElse': 'thing',
                        subThing: {
                            'this': 'thing',
                            'is': 'thing',
                            'depth': 'thing',
                            'number': 5,
                        }
                    }
                ]
            }
        };
        const mixedArrayOfDepth5 = [
            'thing',
            {
                'something': 'thing', subThing: {
                    2: 'thing', subThing: {
                        'something': 'thing',
                        'somethingElse': 'thing',
                        subThing: [
                            'this',
                            'is',
                            'depth',
                            5,
                        ]
                    }
                }
            }
        ];
        expect(getDepth(mixedObjectOfDepth5)).toEqual(5);
        expect(getDepth(mixedArrayOfDepth5)).toEqual(5);
    });
    it('returns 0 for strings', () => {
        expect(getDepth('a string')).toEqual(0);
    });
    it('returns 0 for numbers', () => {
        expect(getDepth(109)).toEqual(0);
    });
    it('returns 0 for null', () => {
        expect(getDepth(null)).toEqual(0);
    });
});
describe('isKeyValueObject', () => {
    it('returns true for a non-null key-value object', () => {
        const nonNullKeyValueObject = {
            key1: 'value1',
            key2: 'value2',
        }
        expect(isKeyValueObject(nonNullKeyValueObject)).toEqual(true);
    });
    it('returns false for an array', () => {
        const theArray = [
            1, 23, 'hello', 34
        ]
        expect(isKeyValueObject(theArray)).toEqual(false);
    });
    it('returns false for a string', () => {
        expect(isKeyValueObject('this is a string')).toEqual(false);
    });
    it('returns false for a number', () => {
        expect(isKeyValueObject(345)).toEqual(false);
    });
    it('returns false for a date', () => {
        expect(isKeyValueObject(new Date('2000-01-01'))).toEqual(false);
    });
    it('returns false for null', () => {
        expect(isKeyValueObject(null)).toEqual(false);
    });
});

describe('compare', () => {
    const date1 = new Date('2001-02-02 12:12:00');
    const date2 = new Date('2021-11-12 07:33:00');

    const bigInt1 = BigInt(111111111111111111111111111111111111111111111111111111111111);
    const bigInt2 = BigInt(222222222222222222222222222222222222222222222222222222222222);

    const symbol1 = Symbol(1);
    const symbol2 = Symbol(2);

    const comparisonExamples = [
        {
            dataTypeName: 'Boolean',
            dataTypeExample1: true,
            dataTypeExample2: false,
        },
        {
            dataTypeName: 'Number',
            dataTypeExample1: 5,
            dataTypeExample2: 6,
        },
        {
            dataTypeName: 'BigInt',
            dataTypeExample1: bigInt1,
            dataTypeExample2: bigInt2,
        },
        {
            dataTypeName: 'String',
            dataTypeExample1: 'hello',
            dataTypeExample2: 'there',
        },
        {
            dataTypeName: 'Symbol',
            dataTypeExample1: symbol1,
            dataTypeExample2: symbol2,
        },
        {
            dataTypeName: 'Date',
            dataTypeExample1: date1,
            dataTypeExample2: date2,
        },
        {
            dataTypeName: 'Key-Value Object (POJO)',
            dataTypeExample1: {key1: 'value 1', key2: 'value 2'},
            dataTypeExample2: {key1: 'value 3', key2: 'value 4'},
        },
        {
            dataTypeName: 'Array',
            dataTypeExample1: ['value 1', 'value 2'],
            dataTypeExample2: ['value 3', 'value 4'],
        },
    ]

    describe('compares values with basic data types', () => {
        for (let i=0; i<comparisonExamples.length; i++) {
            it(`finds that two elements of type ${comparisonExamples[i].dataTypeName} are equivalent`, () => {
                const item1 = comparisonExamples[i].dataTypeExample1;
                const item2 = comparisonExamples[i].dataTypeExample1;
                // console.log(`comparing: item1, item2`, {item1, item2});
                expect(compare(item1, item2)).toEqual(true);
            });
            it(`finds that two elements of type ${comparisonExamples[i].dataTypeName} are NOT equivalent`, () => {
                const item1 = comparisonExamples[i].dataTypeExample1;
                const item2 = comparisonExamples[i].dataTypeExample2;
                // console.log(`comparing: item1, item2`, {item1, item2});
                expect(compare(item1, item2)).toEqual(false);
            });
        }
    });
    describe('compares two 1-level and 2-level arrays', () => {
        for (let i=0; i<comparisonExamples.length; i++) {
            it(`finds that two 1-level arrays with ${comparisonExamples[i].dataTypeName} values are equivalent`, () => {
                const item1 = [comparisonExamples[i].dataTypeExample1, comparisonExamples[i].dataTypeExample2];
                const item2 = [comparisonExamples[i].dataTypeExample1, comparisonExamples[i].dataTypeExample2];
                // console.log(`comparing: item1, item2`, {item1, item2});
                expect(compare(item1, item2)).toEqual(true);
            });
            it(`finds that two 1-level and 2-level arrays with ${comparisonExamples[i].dataTypeName} values are NOT equivalent`, () => {
                const item1 = [comparisonExamples[i].dataTypeExample1, comparisonExamples[i].dataTypeExample2];
                const item2 = [comparisonExamples[i].dataTypeExample2, comparisonExamples[i].dataTypeExample1];
                // console.log(`comparing: item1, item2`, {item1, item2});
                expect(compare(item1, item2)).toEqual(false);
            });
        }
    });
    describe('compares two 1-level and 2-level objects', () => {
        for (let i=0; i<comparisonExamples.length; i++) {
            it(`finds that two 1-level objects with ${comparisonExamples[i].dataTypeName} values are equivalent`, () => {
                const item1 = {key1: comparisonExamples[i].dataTypeExample1, key2: comparisonExamples[i].dataTypeExample2};
                const item2 = {key1: comparisonExamples[i].dataTypeExample1, key2: comparisonExamples[i].dataTypeExample2};
                // console.log(`comparing: item1, item2`, {item1, item2});
                expect(compare(item1, item2)).toEqual(true);
            });
            it(`finds that two 1-level and 2-level objects with ${comparisonExamples[i].dataTypeName} values are NOT equivalent`, () => {
                const item1 = {key1: comparisonExamples[i].dataTypeExample1, key2: comparisonExamples[i].dataTypeExample2};
                const item2 = {key1: comparisonExamples[i].dataTypeExample2, key2: comparisonExamples[i].dataTypeExample1};
                // console.log(`comparing: item1, item2`, {item1, item2});
                expect(compare(item1, item2)).toEqual(false);
            });
        }
    });
});

describe('isDate', () => {
    it('determines that a new Date() is a date', () => {
        expect(isDate(new Date())).toEqual(true);
    });
    it('determines that a new Date(<date string>) is a date', () => {
        expect(isDate(new Date('2020-01-03 12:34:44'))).toEqual(true);
    });
    it('determines that Date.now() is NOT a date', () => {
        expect(isDate(Date.now())).toEqual(false);
    });
    it('determines that a new Date().toString() is NOT a date', () => {
        expect(isDate(new Date().toString())).toEqual(false);
    });
    it('determines that a number is NOT a date', () => {
        expect(isDate(34)).toEqual(false);
    });
    it('determines that a string is NOT a date', () => {
        expect(isDate('January 4, 2020')).toEqual(false);
    });
});
