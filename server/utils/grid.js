import chunk from 'lodash.chunk'
import { fillArray } from './arrayHelpers.js'

export function createGrid(height, width) {
  const arr = new Array(height * width);
  fillArray(arr, '0');
  return chunk(arr, width);
}

export function getColumn(grid, index) {
  const col = [];
  for (let i = 0; i < grid.length; i++) {
    col.push(grid[i][index]);
  }
  return col;
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

export function convert2DToIndex(rowIndex, colIndex, width) { 
  return rowIndex * width + colIndex;
}

export function copyGrid(grid) {
  const copy = [];
  for (let i = 0; i < grid.length; i++) {
      copy[i] = grid[i].slice();
  }
  return copy;
}
