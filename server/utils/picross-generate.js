import fs from 'fs'
import path from 'path'
import chunk from 'lodash.chunk'
import { execSync } from 'child_process'
import { rando } from '@nastyox/rando.js';
import { hasEmpty, hasFull, gridToNon } from './picross.js'

export function bitGenerate(size) {
  if (size > 7) {
    console.log('size is too big for bitwise generation');
    return;
  }
  let dec, binString, solution1D, solution2D;
  do {
    dec = Math.floor(rando() * (2**(size**2) - 1) + 1);
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
  const testPath = path.join(__dirname, 'server', 'generate', 'test.non');
  const naughtyPath = path.join(__dirname, 'server', 'modules', 'naughty');
  fs.writeFileSync(testPath, data);
  const check1 = (execSync(naughtyPath + ' -u < ' + testPath)).toString();
  return check1.includes('UNIQUE');
}
