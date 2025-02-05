import md5 from 'blueimp-md5'
import { Puzzle } from '~/server/models/Puzzle'

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
    hashedSolution: md5(puzzle.goal),
  };
})
