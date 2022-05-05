// custom matchers for jest and ts-jest
// to use, import this file in a test:
// import '<relative path to>/jest.customMatchers.ts'

import { Types } from "mongoose";

export type MatcherReturn = {
    message: () => string,
    pass: boolean,
}

expect.extend({
    arrayOfSize(received, size): MatcherReturn {
        const pass =
            Array.isArray(received) &&
            received.length === size;

        if (pass) {
            return {
                message: () =>
                    `expected ${received} not to be an array of size ${size}`,
                pass: true,
            };
        } else {
            return {
                message: () =>
                    `expected ${received} to be an array of size ${size}`,
                pass: false,
            };
        }
    },
});

expect.extend({
    toBeArrayOfSize(received, size): MatcherReturn {
        const pass =
            Array.isArray(received) &&
            received.length === size;

        if (pass) {
            return {
                message: () =>
                    `expected ${received} not to be an array of size ${size}`,
                pass: true,
            };
        } else {
            return {
                message: () =>
                    `expected ${received} to be an array of size ${size}`,
                pass: false,
            };
        }
    },
});

expect.extend({
    dateSince(received: Date, pastDate: Date): MatcherReturn {
        const pass = received > pastDate && received <= new Date();

        if (pass) {
            return {
                message: () =>
                    `expected ${received} not to be since ${pastDate}`,
                pass: true,
            };
        } else {
            return {
                message: () =>
                    `expected ${received} to be since ${pastDate}`,
                pass: false,
            };
        }
    }
});

expect.extend({
    dateWithinSecondsOf(received: Date, targetDate: Date, secondsRange: number = 1): MatcherReturn {
        const millisecondsRange = secondsRange * 1000;
        const pass = Math.abs(received.getTime() - targetDate.getTime()) <= millisecondsRange;

        if (pass) {
            return {
                message: () =>
                    `expected ${received} not to be within ${secondsRange} seconds of ${targetDate}`,
                pass: true,
            };
        } else {
            return {
                message: () =>
                    `expected ${received} to be within ${secondsRange} seconds of ${targetDate}`,
                pass: false,
            };
        }
    }
});

expect.extend({
    toBeSince(received: Date, pastDate: Date): MatcherReturn {
        const pass = received > pastDate && received <= new Date();

        if (pass) {
            return {
                message: () =>
                    `expected ${received} not to be since ${pastDate}`,
                pass: true,
            };
        } else {
            return {
                message: () =>
                    `expected ${received} to be since ${pastDate}`,
                pass: false,
            };
        }
    }
});

expect.extend({
    memberOfEnum(received: string, targetEnum: any): MatcherReturn {
        const pass = Object.values(targetEnum).includes(received);

        if (pass) {
            return {
                message: () =>
                    `expected ${received} not to be a value on enum ${targetEnum}`,
                pass: true,
            };
        } else {
            return {
                message: () =>
                    `expected ${received} to be a value on enum ${targetEnum}`,
                pass: false,
            };
        }
    }
});

expect.extend({
    memberOfEnums(received: string, targetEnums: Array<any>): MatcherReturn {
        const pass = targetEnums.some(targetEnum => {return Object.values(targetEnum).includes(received)});

        if (pass) {
            return {
                message: () =>
                    `expected ${received} not to be a value on any enum in ${targetEnums}`,
                pass: true,
            };
        } else {
            return {
                message: () =>
                    `expected ${received} to be a value on an enum in ${targetEnums}`,
                pass: false,
            };
        }
    }
});

expect.extend({
    memberOfEnumOrNull(received: string|null, targetEnum: any): MatcherReturn {
        const pass = received === null || Object.values(targetEnum).includes(received);

        if (pass) {
            return {
                message: () =>
                    `expected ${received} not to be a value on enum ${targetEnum}`,
                pass: true,
            };
        } else {
            return {
                message: () =>
                    `expected ${received} to be a value on enum ${targetEnum}`,
                pass: false,
            };
        }
    }
});

expect.extend({
    memberOfEnumsOrNull(received: string|null, targetEnums: Array<any>): MatcherReturn {
        const pass = received === null || targetEnums.some(targetEnum => {return Object.values(targetEnum).includes(received)});

        if (pass) {
            return {
                message: () =>
                    `expected ${received} not to be null nor a value on any enum in ${targetEnums}`,
                pass: true,
            };
        } else {
            return {
                message: () =>
                    `expected ${received} to be null or a value on an enum in ${targetEnums}`,
                pass: false,
            };
        }
    }
});

expect.extend({
    arrayContainingOrEmpty(received: Array<any>, arrayContent: any): MatcherReturn {
        const pass = received.length === 0 || received.includes(arrayContent);

        if (pass) {
            return {
                message: () =>
                    `expected ${received} not to include ${arrayContent}`,
                pass: true,
            };
        } else {
            return {
                message: () =>
                    `expected ${received} to include ${arrayContent}`,
                pass: false,
            };
        }
    }
});

expect.extend({
    objectIdOrNull(received: string|null): MatcherReturn {
        const pass = received === null || expect.any(Types.ObjectId);

        if (pass) {
            return {
                message: () =>
                    `expected ${received} not to be an ObjectId nor null`,
                pass: true,
            };
        } else {
            return {
                message: () =>
                    `expected ${received} to be an ObjectId or null`,
                pass: false,
            };
        }
    }
});

expect.extend({
    null(received: any): MatcherReturn {
        const pass = received === null;

        if (pass) {
            return {
                message: () =>
                    `expected ${received} not to be null`,
                pass: true,
            };
        } else {
            return {
                message: () =>
                    `expected ${received} to be null`,
                pass: false,
            };
        }
    }
});

declare global {
    namespace jest {
        interface Matchers<R> {
            toBeArrayOfSize(size: number): R;
            toBeSince(pastDate: Date): R;
        }

        interface Expect {
            arrayOfSize(size: number): MatcherReturn;
            dateSince(pastDate: Date): MatcherReturn;
            dateWithinSecondsOf(targetDate: Date, secondsRange?: number): MatcherReturn;
            memberOfEnum(targetEnum: any): MatcherReturn;
            memberOfEnums(targetEnums: Array<any>): MatcherReturn;
            memberOfEnumsOrNull(targetEnums: Array<any>): MatcherReturn;
            memberOfEnumOrNull(targetEnum: any): MatcherReturn;
            arrayContainingOrEmpty(arrayContent: any): MatcherReturn;
            objectIdOrNull(): MatcherReturn;
            null(): MatcherReturn;
        }
    }
}
