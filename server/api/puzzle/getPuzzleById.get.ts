import { Puzzle } from '~/server/models/Puzzle';
import { getSolutionGrid } from '~/server/utils/picross';

export default defineEventHandler(async (event) => {
  const { height, width, id } = await getQuery(event);

  const puzzle = await Puzzle.findOne({ _id: id, width, height });
  if (!puzzle) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Puzzle not found',
    })
  }
  return {
    puzzleId: puzzle._id,
    width: puzzle.width,
    height: puzzle.height,
    rowKeys: puzzle.rowKeys,
    colKeys: puzzle.colKeys,
    solution: getSolutionGrid(puzzle.goal, puzzle.width),
  };
})
