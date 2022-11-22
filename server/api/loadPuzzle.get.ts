import fs from 'fs'
import path from 'path'
import { solutionGrid, getKeys } from '~/utils/picross'

const SIZES = [5, 10, 15, 20, 25];
const DIR_SIZES = [0, 0, 500016, 0, 0];

export default defineEventHandler((event) => {
  const { width, height } = getQuery(event);
  if (SIZES.includes(Number(width)) && width === height) {
    const goal = getPuzzle(width);
    const solution = solutionGrid(goal, width);
    const { rowKeys, colKeys } = getKeys(solution);
    return {
      rowKeys,
      colKeys,
      solution,
      goal
    }
    return goal;
  } else {
    return 'invalid dimensions'
  }
})

function getPuzzle(width) {
  const dir = path.resolve('server/puzzles/' + width + 'x' + width);
  console.log('searching directory ' + dir);
  const index = Math.floor(Math.random() * DIR_SIZES[(Number(width) / 5) - 1]);
  const files = fs.readdirSync(dir);
  const file = files[index];
  console.log('picked file ' + file);
  return fs.readFileSync(dir + '/' + file).toString();
}
