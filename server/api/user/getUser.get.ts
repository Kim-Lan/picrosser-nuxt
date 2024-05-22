import { User } from '~/server/models/User';
import { Attempt } from '~/server/models/Attempt';
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

  // return {
  //   ... user.toObject(),
  //   password: undefined
  // }

  return {
    username: user.toObject().username,
    createdAt: user.toObject().createdAt,
    attempts: user.toObject().attempts,
  }
})
