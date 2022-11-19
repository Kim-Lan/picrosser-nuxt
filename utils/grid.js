const _ = require('lodash/array');

module.exports = { createGrid, getColumn, arraySum, printGrid }

function createGrid(width, height) {
  const arr = new Array(width * height);
  _.fill(arr, '0');
  return _.chunk(arr, width);
}

function getColumn(grid, index) {
  const col = [];
  for (let i = 0; i < grid.length; i++) {
    col.push(grid[i][index]);
  }
  return col;
}

function arraySum(arr) {
  const numArray = Array.from(arr, Number);
  return numArray.reduce((a, b) => a + b, 0);
}

function printGrid(arr) {
  for (let i = 0; i < arr.length; i++) {
    console.log('[' + arr[i].join(', ') + ']');
  }
}
