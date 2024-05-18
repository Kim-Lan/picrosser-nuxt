import fs from 'fs'
import path from 'path'
import chunk from 'lodash.chunk'
import { execSync } from 'child_process'
import { createGrid, convertIndexTo2D, convert2DToIndex, getColumn, printGrid } from './grid.js'
import { hasEmpty, hasSpace, getKeys, getGoalString, gridToNon } from './picross.js'
import { range, printArray } from './arrayHelpers.js'

const FILLED_VALUE = '1';

export function generate(height, width) {
  let solution;
  do {
      solution = chooseCells(height, width);
  } while (hasEmpty(solution) || !checkUnique(solution));
  return solution;
}

function chooseCells(height, width) {
  if (height <= 0 || width <= 0) return [];
  const total = height * width;

  const chosen1D = [];
  const chosen2D = createGrid(height, width);
  const indexArray = range(total);

  const maxRowBlocks = getMaxBlocks(width);
  const maxColBlocks = getMaxBlocks(height);

  // fill one cell in every row
  for (let r = 0; r < height; r++) {
    const chosenColIndex = Math.floor(Math.random() * width);
    const index = convert2DToIndex(r, chosenColIndex, width);
    indexArray.splice(indexArray.indexOf(index), 1);
    chosen1D.push(index);
    chosen2D[r][chosenColIndex] = FILLED_VALUE;
  }

  // check if each column has a chosen cell; if not, fill one
  for (let c = 0; c < width; c++) {
    const column = getColumn(chosen2D, c);
    let empty = true;
    for (let i = 0; i < column.length; i++) {
      if (column[i] === FILLED_VALUE) {
        empty = false;
      }
    }
    if (empty) {
      const chosenRowIndex = Math.floor(Math.random() * height);
      const index = convert2DToIndex(chosenRowIndex, c, width);
      indexArray.splice(indexArray.indexOf(index), 1);
      chosen1D.push(index);
      chosen2D[chosenRowIndex][c] = FILLED_VALUE;
    }
  }

  let count = 0;
  while (chosen1D.length < Math.round(total / 2) && indexArray.length > 0) {
      const chosenIndex = Math.floor(Math.random() * indexArray.length);
      const index = indexArray[chosenIndex]
      const [row, col] = convertIndexTo2D(index, height, width);

      if (hasSpace(chosen2D, row, col)) {
        if (checkMaxBlocks(chosen2D, row, col, maxRowBlocks[row], maxColBlocks[col])) {
          chosen2D[row][col] = FILLED_VALUE;
          chosen1D.push(indexArray.splice(chosenIndex, 1)[0]);
          count = 0;
        }
      } else {
        indexArray.splice(chosenIndex, 1); // remove index if there is a full row or column
      }
      count++;
      if (count > indexArray.length) {
        break;
      }
  }
  //return chosen1D.length === Math.round(total / 2) ? chosen2D : [];
  return chosen2D;
}

function getMaxBlocks(size) {
  const maxBlocks = [];
  for (let i = 0; i < size; i++) {
    maxBlocks[i] = Math.ceil(Math.random() * 6); //between 1 and 6 blocks
  }
  return maxBlocks;
}

export function bitGenerate(size) {
  if (size > 7) {
    console.log('size is too big for bitwise generation');
    return;
  }
  let dec, binString, solution1D, solution2D;
  do {
    dec = Math.floor(Math.random() * (2**(size**2) - 1) + 1);
    binString = dec.toString(2);
    solution1D = binString.padStart(size**2, '0').split('').reverse();
    solution2D = chunk(solution1D, size);
  }
  while(hasEmpty(solution2D) || hasFull(solution2D) || !checkUnique(solution2D));
  return solution2D;
}

export function checkUnique(grid) {
  const __dirname = path.resolve(path.dirname(''));
  const data = gridToNon(grid);
  const testPath = path.join(__dirname, 'picrosser.com', 'server', 'generate', 'test.non');
  const naughtyPath = path.join(__dirname, 'picrosser.com', 'server', 'modules', 'naughty');
  // const testPath = path.join('server', 'generate', 'test.non');
  // const naughtyPath = path.join('server', 'modules', 'naughty');
  fs.writeFileSync(testPath, data);
  const check1 = (execSync(naughtyPath + ' -u < ' + testPath)).toString();
  //fs.unlinkSync(testPath);
  return check1.includes('UNIQUE');
}

export function getPuzzleJSON(grid, id) {
  printGrid(grid);
  const { rowKeys, colKeys } = getKeys(grid);
  printArray(rowKeys);
  printArray(colKeys);
  const width = colKeys.length;
  const height = rowKeys.length;
  const goal = getGoalString(grid);
  return {
    id,
    width,
    height,
    rowKeys,
    colKeys,
    goal
  }
}
