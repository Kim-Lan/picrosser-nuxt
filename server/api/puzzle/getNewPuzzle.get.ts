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

  if (height == 5) {
    const solution = bitGenerate(height);

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
    }
    return {
      puzzleId,
      rowKeys,
      colKeys,
      solution
    };
  }

  const puzzle = await Puzzle.aggregate([
    {
      $match: { height: parseInt(height), width: parseInt(width) }
    },
    {
      $sample: { size: 1 }
    }
  ]).exec();
  if (!puzzle[0]) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to find puzzle'
    })
  }
  return {
    puzzleId: puzzle[0]._id,
    rowKeys: puzzle[0].rowKeys,
    colKeys: puzzle[0].colKeys,
    solution: puzzle[0].goal,
  }
})
