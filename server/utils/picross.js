import { getColumn, copyGrid } from './grid.js'
import { arraySum } from './arrayHelpers.js'
import chunk from "lodash.chunk"

const FILLED_VALUE = '1';

export function getBlocks(arr) {
  const result = [];
  let current = 0;
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === FILLED_VALUE) {
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

export function getGoalString(grid) {
  return (grid.flat()).join('');
}

export function getSolutionGrid(goal, width) {
  return chunk(goal.split(''), width);
}

export function hasEmpty(grid) {
  if (grid.length === 0) { return true; }

  for (const row of grid) {
    if (arraySum(row) <= 0) { return true; }
  }
  for (let c = 0; c < grid[0].length; c++) {
    if (arraySum(getColumn(grid, c)) <= 0) { return true; }
  }
  return false;
}

export function hasFull(grid) {
  if (grid.length === 0) { return false; }
  const size = grid.length;

  for (const row of grid) {
    if (arraySum(row) >= size) { return true; }
  }
  for (let c = 0; c < size; c++) {
    if (arraySum(getColumn(grid, c)) >= size) { return true; }
  }
  return false;
}

export function hasSpace(grid, row, col) {
  const height = grid.length;
  const width = grid[0].length;

  const rowSum = arraySum(grid[row]);
  const colSum = arraySum(getColumn(grid, col));
  if (rowSum >= (height - 1)) {
      return false;
  } else if (colSum >= (width - 1)) {
      return false;
  }
  return true;
}

export function checkMaxBlocks(grid, row, col, maxRowBlocks, maxColBlocks) {
  const temp = copyGrid(grid);
  temp[row][col] = FILLED_VALUE;
  const rowBlocks = getBlocks(temp[row]);
  const colBlocks = getBlocks(getColumn(temp, col));
  if (rowBlocks.length > maxRowBlocks || colBlocks.length > maxColBlocks) {
      return false;
  }
  return true;
}

export function checkMaxColBlocks(grid, row, col, maxBlocks) {
  const temp = copyGrid(grid);
  temp[row][col] = FILLED_VALUE;
  const colBlocks = getBlocks(getColumn(temp, col));
  return colBlocks.length <= maxBlocks;
}

export function gridToNon(grid) {
  const keys = getKeys(grid);
  const rows = keys.rowKeys;
  const columns = keys.colKeys;

  const strArray = [];
  strArray.push("width " + columns.length);
  strArray.push("height " + rows.length);

  strArray.push("");
  strArray.push("rows");
  for (let i = 0; i < rows.length; i++) {
    strArray.push(rows[i].join(','));
  }

  strArray.push("");
  strArray.push("columns");
  for (let j = 0; j < columns.length; j++) {
    strArray.push(columns[j].join(','));
  }

  strArray.push("");
  strArray.push("goal \"" + getGoalString(grid) + "\"");
  strArray.push("");
  return strArray.join("\n");
}
