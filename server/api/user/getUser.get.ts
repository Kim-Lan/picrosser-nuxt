import { User } from '~/server/models/User';
import { Puzzle } from '~/server/models/Puzzle';

export default defineEventHandler(async (event) => {
  const { username } = await getQuery(event);

  const user = await User
    .findOne({ username: { '$regex': username, $options: 'i' } })
    .populate({
      path: 'attempts',
      select: '_id startTime totalTime',
      populate: {
        path: 'puzzle',
        select: '_id width height',
        model: Puzzle,
      }
    });

  if (!user) {
    throw createError({
      statusCode: 400,
      statusMessage: 'User not found',
    })
  }

  return {
    username: user.username,
    createdAt: user.createdAt,
    attempts: user.attempts,
    currentStats: user.currentStats,
    recordStats: user.recordStats,
  }
})
