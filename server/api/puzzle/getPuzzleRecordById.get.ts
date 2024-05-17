import { Puzzle } from '~/server/models/Puzzle';

export default defineEventHandler(async (event) => {
  const { height, width, id } = await getQuery(event);

  const puzzle = await Puzzle.findOne({ _id: id, width, height })
    .populate({
      path: 'attempts',
      populate: {
        path: 'user',
        select: 'username',
      },
    });
  if (!puzzle) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Puzzle not found',
    })
  }
  return {
    puzzleId: puzzle._id,
    attempts: puzzle.attempts,
  };
})
