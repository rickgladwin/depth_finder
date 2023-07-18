# Depth Finder

A simple utility to calculate the depth of arrays, key-value objects, etc. and for deep/nested object comparison.

![coverage: 100%](https://img.shields.io/badge/coverage-100%25-brightgreen) ![version: 1.0.1](https://img.shields.io/badge/version-1.0.1-blue)


## Definitions
### Array Depth

The highest level of nesting found in the array

### Object Depth

The highest level of nesting found in the object

### Other Depths

Strings, numbers, etc. are defined as zero.

## Installation
- fork this repo
- `npm install`

## Tests

### Setup
```bash
npm install -g jest
```
(if you don't have jest installed globally, you may need to run this) 

### Default
```bash
npm run test
```

### Verbose with Coverage Report
```bash
npm run test -- --verbose --coverage
```
An interactive coverage report should be generated at `<repo root>/coverage/lcov-report/index.html`

If you don't have `lcov` installed, you can install it on Mac:
```bash
brew install lcov
```
or Ubuntu/Linux:
```bash
sudo apt update
sudo apt install lcov
```

## Notes:
- The `depth_finder_mongoose` module has mongoose as a dependency,
in order to handle Mongoose/mongodb data types.
The `depth_finder` module will work without the mongoose dependency.
- There is no plan to maintain this repo at this time. If you find it useful, great :)
