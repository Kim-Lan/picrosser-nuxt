import fs from 'fs'
import path from 'path'
import chunk from 'lodash.chunk'
import { hasEmpty, hasFull, getGoalString, getKeys } from '../utils/picross.js'
import { checkUnique, getPuzzleJSON } from '../utils/picross-generate.js'
import { printGrid } from '../utils/grid.js'
import { customAlphabet } from 'nanoid'
const nanoid = customAlphabet('0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz', 15);

function bitwiseGenerate(size) {
  const __dirname = path.resolve(path.dirname(''));
  const indexPath = path.join(__dirname, 'server', 'generate', 'index.txt');
  const indexFile = fs.readFileSync(indexPath);
  const startIndex = parseInt(indexFile) ? parseInt(indexFile) : 1;
  for (let dec = startIndex; dec < 2**(size**2); dec++) {
    console.log(dec);
    fs.writeFileSync(indexPath, dec.toString(), {flag: 'w'});
    const binString = dec.toString(2);
    const solution1D = binString.padStart(size**2, '0').split('').reverse();
    const solution2D = chunk(solution1D, size);

    if (hasEmpty(solution2D) || hasFull(solution2D)) {
      continue;
    } else if (checkUnique(solution2D)) {
      let id, jsonPath;
      do {
        id = nanoid();
        jsonPath = path.join(__dirname, 'server', 'generate', 'JSON', `${size}x${size}`, `${id}.json`);
      }
      while(checkFileExistsSync(jsonPath))

      const jsonObject = getPuzzleJSON(solution2D, id);
      fs.writeFileSync(jsonPath, JSON.stringify(jsonObject), {flag: 'wx'});

      console.log(dec + ": unique solution, id " + id);
      break;
    }
  }
}

function checkFileExistsSync(filepath) {
  let flag = true;
  try{
    fs.accessSync(filepath, fs.constants.F_OK);
  }catch(e){
    flag = false;
  }
  return flag;
}

bitwiseGenerate(5);
