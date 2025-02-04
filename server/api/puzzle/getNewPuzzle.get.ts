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

  if (height == 25 && width == 25) {
    const puzzle = await Puzzle.aggregate([
      {
        $match: { height: 25, width: 25 }
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
  }

  // console.log("loading puzzle " + height + "x" + width);
  let solution;
  if (height == 5 && width == 5) {
    solution = bitGenerate(width);
  // } else if (height == 25 && width == 25) {
  //   solution = generate25x25();
  } else {
    solution = generate(height, width);
  }
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

  // console.log("returning puzzle");
  // console.log("id " + puzzleId);
  // printArray(rowKeys);
  // printArray(colKeys);
  // printGrid(solution);
  return {
    puzzleId,
    rowKeys,
    colKeys,
    solution
  };
})
