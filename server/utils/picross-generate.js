import fs from 'fs'
import path from 'path'
import _ from 'lodash'
import { execSync } from 'child_process'
import { createGrid, convertIndexTo2D, printGrid } from './grid.js'
import { hasEmpty, hasSpace } from './picross.js'
import { range } from './arrayHelpers.js'

export function generate(height, width) {
  let solution;
  do {
      solution = chooseCells(height, width);
      count++;
      console.log(count);
  } while (hasEmpty(solution) || !checkUnique(solution));
  return solution;
}

function chooseCells(height, width) {
  if (height <= 0 || width <= 0) return [];
  const total = height * width;

  const chosen1D = [];
  const chosen2D = createGrid(height, width);
  const indexArray = total !== undefined ? range(total) : [];

  while (chosen1D.length < Math.round(total / 2) && indexArray.length > 0) {
      const chosenIndex = Math.floor(Math.random() * indexArray.length);
      const index = indexArray.splice(chosenIndex, 1)[0];

      if (hasSpace(chosen2D, index)) {
          const [row, col] = convertIndexTo2D(index, height, width);
          chosen2D[row][col] = '1';
          chosen1D.push(index);
      }
  }
  //return chosen1D.length === Math.round(total / 2) ? chosen2D : [];
  return chosen2D;
}

export function bitGenerate(size) {
  let dec, binString, solution1D, solution2D;
  do {
    dec = Math.floor(Math.random() * (2**(size**2) - 1) + 1);
    console.log("dec " + dec);
    binString = dec.toString(2);
    solution1D = binString.padStart(size**2, '0').split('').reverse();
    solution2D = _.chunk(solution1D, size);
  }
  while(hasEmpty(solution2D) || hasFull(solution2D) || !checkUnique(solution2D));
  return solution2D;
}

function checkUnique(grid) {
  const __dirname = path.resolve(path.dirname(''));
  const data = gridToNon(grid);
  const filepath = path.join(__dirname, 'server', 'generate', 'test.non');
  const naughtypath = path.join(__dirname, 'server', 'modules', 'naughty');
  fs.writeFileSync(filepath, data);
  const check1 = (execSync(naughtypath + ' -u < ' + filepath)).toString();
  fs.unlinkSync(filepath);
  return check1.includes('UNIQUE');
}
