import { chunk } from 'lodash/array'
import { getColumn } from '~/utils/grid';

export function getBlocks(arr) {
  const result = [];
  let current = 0;
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === '1') {
      current++;
    } else if (current > 0) {
      result.push(current);
      current = 0;
    }
  }
  if (current > 0) { result.push(current); }

  return result;
}

export function getKeys(grid) {
  const rowKeys = [];
  for (let r = 0; r < grid.length; r++) {
    rowKeys[r] = getBlocks(grid[r]);
  }

  const colKeys = [];
  for (let c = 0; c < grid[0].length; c++) {
    colKeys[c] = getBlocks(getColumn(grid, c));
  }
  return {
    rowKeys,
    colKeys
  };
}

export function goalString(grid) {
  return (grid.flat()).join('');
}

export const solutionGrid = function (goal, width) {
  return chunk(goal, width);
}
