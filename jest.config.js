// jest configuration for backend
// NOTE: as of 2021-08-23 we are using ts test files only for backend tests
//  and excluding js files.

/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  // test ts files only (not their js equivalents)
  testRegex: [
    "\\/*\\.(spec|test)\\.ts",
  ],
  testPathIgnorePatterns: [
    "/node_modules/",
    "__tests__\\/auth\\/auth\\.spec\\.ts",
  ],
  transform: {
    "^.+\\.jsx?$": "babel-jest",
  },
}
