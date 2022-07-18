"use strict";
// custom matchers for jest and ts-jest
// to use, import this file in a test:
// import '<relative path to>/jest.customMatchers.ts'
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
expect.extend({
    arrayOfSize(received, size) {
        const pass = Array.isArray(received) &&
            received.length === size;
        if (pass) {
            return {
                message: () => `expected ${received} not to be an array of size ${size}`,
                pass: true,
            };
        }
        else {
            return {
                message: () => `expected ${received} to be an array of size ${size}`,
                pass: false,
            };
        }
    },
});
expect.extend({
    toBeArrayOfSize(received, size) {
        const pass = Array.isArray(received) &&
            received.length === size;
        if (pass) {
            return {
                message: () => `expected ${received} not to be an array of size ${size}`,
                pass: true,
            };
        }
        else {
            return {
                message: () => `expected ${received} to be an array of size ${size}`,
                pass: false,
            };
        }
    },
});
expect.extend({
    dateSince(received, pastDate) {
        const pass = received > pastDate && received <= new Date();
        if (pass) {
            return {
                message: () => `expected ${received} not to be since ${pastDate}`,
                pass: true,
            };
        }
        else {
            return {
                message: () => `expected ${received} to be since ${pastDate}`,
                pass: false,
            };
        }
    }
});
expect.extend({
    dateWithinSecondsOf(received, targetDate, secondsRange = 1) {
        const millisecondsRange = secondsRange * 1000;
        const pass = Math.abs(received.getTime() - targetDate.getTime()) <= millisecondsRange;
        if (pass) {
            return {
                message: () => `expected ${received} not to be within ${secondsRange} seconds of ${targetDate}`,
                pass: true,
            };
        }
        else {
            return {
                message: () => `expected ${received} to be within ${secondsRange} seconds of ${targetDate}`,
                pass: false,
            };
        }
    }
});
expect.extend({
    toBeSince(received, pastDate) {
        const pass = received > pastDate && received <= new Date();
        if (pass) {
            return {
                message: () => `expected ${received} not to be since ${pastDate}`,
                pass: true,
            };
        }
        else {
            return {
                message: () => `expected ${received} to be since ${pastDate}`,
                pass: false,
            };
        }
    }
});
expect.extend({
    memberOfEnum(received, targetEnum) {
        const pass = Object.values(targetEnum).includes(received);
        if (pass) {
            return {
                message: () => `expected ${received} not to be a value on enum ${targetEnum}`,
                pass: true,
            };
        }
        else {
            return {
                message: () => `expected ${received} to be a value on enum ${targetEnum}`,
                pass: false,
            };
        }
    }
});
expect.extend({
    memberOfEnums(received, targetEnums) {
        const pass = targetEnums.some(targetEnum => { return Object.values(targetEnum).includes(received); });
        if (pass) {
            return {
                message: () => `expected ${received} not to be a value on any enum in ${targetEnums}`,
                pass: true,
            };
        }
        else {
            return {
                message: () => `expected ${received} to be a value on an enum in ${targetEnums}`,
                pass: false,
            };
        }
    }
});
expect.extend({
    memberOfEnumOrNull(received, targetEnum) {
        const pass = received === null || Object.values(targetEnum).includes(received);
        if (pass) {
            return {
                message: () => `expected ${received} not to be a value on enum ${targetEnum}`,
                pass: true,
            };
        }
        else {
            return {
                message: () => `expected ${received} to be a value on enum ${targetEnum}`,
                pass: false,
            };
        }
    }
});
expect.extend({
    memberOfEnumsOrNull(received, targetEnums) {
        const pass = received === null || targetEnums.some(targetEnum => { return Object.values(targetEnum).includes(received); });
        if (pass) {
            return {
                message: () => `expected ${received} not to be null nor a value on any enum in ${targetEnums}`,
                pass: true,
            };
        }
        else {
            return {
                message: () => `expected ${received} to be null or a value on an enum in ${targetEnums}`,
                pass: false,
            };
        }
    }
});
expect.extend({
    arrayContainingOrEmpty(received, arrayContent) {
        const pass = received.length === 0 || received.includes(arrayContent);
        if (pass) {
            return {
                message: () => `expected ${received} not to include ${arrayContent}`,
                pass: true,
            };
        }
        else {
            return {
                message: () => `expected ${received} to include ${arrayContent}`,
                pass: false,
            };
        }
    }
});
expect.extend({
    objectIdOrNull(received) {
        const pass = received === null || expect.any(mongoose_1.Types.ObjectId);
        if (pass) {
            return {
                message: () => `expected ${received} not to be an ObjectId nor null`,
                pass: true,
            };
        }
        else {
            return {
                message: () => `expected ${received} to be an ObjectId or null`,
                pass: false,
            };
        }
    }
});
expect.extend({
    null(received) {
        const pass = received === null;
        if (pass) {
            return {
                message: () => `expected ${received} not to be null`,
                pass: true,
            };
        }
        else {
            return {
                message: () => `expected ${received} to be null`,
                pass: false,
            };
        }
    }
});
