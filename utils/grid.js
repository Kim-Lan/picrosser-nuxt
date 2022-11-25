import { fill, chunk } from 'lodash/array';

export function createGrid(width, height) {
  console.log('creating grid, size: ' + width * height);
  const arr = new Array(width * height);
  fill(arr, '0');
  return chunk(arr, width);
}

export function getColumn(grid, index) {
  const col = [];
  for (let i = 0; i < grid.length; i++) {
    col.push(grid[i][index]);
  }
  return col;
}

export function arraySum(arr) {
  const numArray = Array.from(arr, Number);
  return numArray.reduce((a, b) => a + b, 0);
}

export function printGrid(arr) {
  for (let i = 0; i < arr.length; i++) {
    console.log('[' + arr[i].join(', ') + ']');
  }
}

export function convertIndexTo2D(index, width) {
  const rowIndex = Math.floor(index / width);
  const colIndex = index % width;
  return [rowIndex, colIndex];
}
