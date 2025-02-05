import { getKeys, getGoalString } from '~/server/utils/picross'
import { bitGenerate, hashSolution } from '~/server/utils/picross-generate'
import { Puzzle } from '~/server/models/Puzzle'

const SIZES = [5, 10, 15, 20, 25];

export default defineEventHandler(async (event) => {
  const { height, width} = getQuery(event);

  if (!SIZES.includes(parseInt(width)) || width !== height) {
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

    const hashedSolution = hashSolution(goal);
    return {
      puzzleId,
      rowKeys,
      colKeys,
      hashedSolution
    };
  }

  const puzzle = (await Puzzle.aggregate([
    {
      $match: { height: parseInt(height), width: parseInt(width) }
    },
    {
      $sample: { size: 1 }
    }
  ]).exec())[0];
  if (!puzzle) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to find puzzle'
    })
  }

  const hashedSolution = hashSolution(puzzle.goal);

  return {
    puzzleId: puzzle._id,
    rowKeys: puzzle.rowKeys,
    colKeys: puzzle.colKeys,
    hashedSolution
  }
})
