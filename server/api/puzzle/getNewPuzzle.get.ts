import mongoose from 'mongoose';
import { printGrid } from '~/server/utils/grid';
import { printArray } from '~/server/utils/arrayHelpers';
import { getKeys, getGoalString } from '~/server/utils/picross';
import { generate, bitGenerate } from '~/server/utils/picross-generate';
import { Puzzle } from '~/server/models/Puzzle';

const SIZES = [5, 10, 15, 20, 25];

export default defineEventHandler(async (event) => {
  const { height, width} = getQuery(event);

  if (!SIZES.includes(Number(width)) || width !== height) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid dimensions',
    })
  }

  console.log("loading puzzle " + height + "x" + width);
  const solution = (width == 5) ? bitGenerate(width) : generate(height, width);
  const { rowKeys, colKeys } = getKeys(solution);
  const goal = getGoalString(solution);

  const existingPuzzle = await Puzzle.findOne({ goal });
  let puzzleId = '';
  if (existingPuzzle) {
    puzzleId = existingPuzzle._id;
  } else {
    const newPuzzle = await Puzzle.create({
      width,
      height,
      rowKeys,
      colKeys,
      goal
    });
    puzzleId = newPuzzle._id;
    // puzzleId = new mongoose.Types.ObjectId();
  }

  console.log("returning puzzle");
  console.log("id " + puzzleId);
  printArray(rowKeys);
  printArray(colKeys);
  printGrid(solution);
  return {
    puzzleId,
    rowKeys,
    colKeys,
    solution
  };
})
