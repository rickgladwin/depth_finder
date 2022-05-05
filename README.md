# Depth Finder

A simple utility to calculate the depth of arrays, key-value objects, etc.

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
- `npm install -g jest` (if you don't have jest installed globally, you may need to run this) 
- `npm run test`

## Notes:
- The `depth_finder_mongoose` module has mongoose as a dependency,
in order to handle Mongoose/mongodb data types.
The `depth_finder` module will work without the mongoose dependency.
- There is no plan to maintain this repo at this time. If you find it useful, great :)
