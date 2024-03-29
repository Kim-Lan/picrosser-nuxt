import { customAlphabet } from 'nanoid'
import { getKeys } from '~/server/utils/picross'
import { generate, bitGenerate } from '~/server/utils/picross-generate'

const nanoid = customAlphabet('0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz', 15);

const SIZES = [5, 10, 15, 20, 25];
const DIR_SIZES = [1, 0, 0, 0, 0];

export default defineEventHandler((event) => {
  const { height, width} = getQuery(event);
  if (SIZES.includes(Number(width)) && width === height) {
    console.log("loading puzzle " + height + "x" + width);
    const puzzleID = nanoid();
    console.log("id " + puzzleID);
    const solution = (width == 5) ? bitGenerate(width) : generate(height, width);
    const { rowKeys, colKeys } = getKeys(solution);
    console.log("returning puzzle");
    return {
      puzzleID,
      rowKeys,
      colKeys,
      solution
    };
  } else {
    return 'invalid dimensions';
  }
})
